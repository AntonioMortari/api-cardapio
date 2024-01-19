import { AppError } from '../../errors/AppError'
import { Food } from '../../models/Food'
import { IFood } from '../../models/Food/protocols'
import { IFoodRepository } from './protocols'


class FoodMongoRepository implements IFoodRepository {

    async getAll(): Promise<IFood[] | Error> {

        const result = await Food.find()

        const foods: IFood[] = result.map(food => {
            return {
                id: food._id.toString(),
                title: food.title,
                price: food.price,
                path_image: food.path_image
            }
        })

        return foods
    }

    async create(dataFood: Omit<IFood, 'id'>, filename: string): Promise<string | Error> {

        const result = await Food.create({ ...dataFood, path_image: filename })

        return result._id.toString()
    }

    async update(foodId: string, newData: Partial<Omit<IFood, 'id'>>, filename?: string): Promise<void | Error> {
        if (!await this.verifyFoodExistsById(foodId)) {
            throw new AppError(`Food de id ${foodId} não existe`, 400)
        }

        await Food.findByIdAndUpdate(foodId, {
            ...newData,
            path_image: filename && filename
        })
    }

    async delete(foodId: string): Promise<void | Error> {

        if (!await this.verifyFoodExistsById(foodId)) {
            throw new AppError(`Food de id ${foodId} não existe`, 400)
        }

        await Food.findByIdAndDelete(foodId)
    }

    async verifyFoodExistsById(foodId: string): Promise<boolean> {
        const food = await Food.findOne({ _id: foodId })

        if (food) return true

        return false
    }


}

export { FoodMongoRepository }