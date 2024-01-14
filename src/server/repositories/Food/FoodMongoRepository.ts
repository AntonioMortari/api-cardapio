import { Food } from '../../models/Food'
import { IFood } from '../../models/Food/protocols'
import { IFoodRepository } from './protocols'


class FoodMongoRepository implements IFoodRepository {

    async getAll(): Promise<IFood[] | Error> {

        try {
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

        } catch (error) {
            console.log(error)
            return new Error('Erro ao buscar todas as Foods')
        }

    }

    async create(dataFood: Omit<IFood, 'id'>, filename: string): Promise<string | Error> {

        try {
            const result = await Food.create({ ...dataFood, path_image: filename })

            return result._id.toString()
        } catch (error) {
            console.log(error)
            return new Error('Erro ao criar nova Food')
        }

    }

    async update(foodId: string, newData: Partial<Omit<IFood, 'id'>>, filename?: string): Promise<void | Error> {
        if (!await this.verifyFoodExistsById(foodId)) {
            return new Error(`Food de id ${foodId} não existe`)
        }

        try {
            await Food.findByIdAndUpdate(foodId, {
                ...newData,
                path_image: filename && filename
            })
        } catch (error) {
            console.log(error)
            return new Error(`Erro ao atualizar Food de id ${foodId}`)
        }
    }
    
    async delete(foodId: string): Promise<void | Error>{

        if (!await this.verifyFoodExistsById(foodId)) {
            return new Error(`Food de id ${foodId} não existe`)
        }

        try {
            await Food.findByIdAndDelete(foodId)
        } catch (error) {
            console.log(error)
            return new Error(`Erro ao deletar Food de id ${foodId}`)
        }

    }

    async verifyFoodExistsById(foodId: string): Promise<boolean> {
        try {
            const food = await Food.findOne({ _id: foodId })

            if (food) return true

            return false
        } catch (error) {
            console.log(error)
            return false
        }
    }


}

export { FoodMongoRepository }