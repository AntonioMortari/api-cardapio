import { Food } from '../../models/Food'
import { IFood } from '../../models/Food/protocols'
import { IFoodRepository } from './protocols'


class FoodMongoRepository implements IFoodRepository{

    async getAll(): Promise<IFood[] | Error>{

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
    
    async create(dataFood: Omit<IFood,'id'>): Promise<string | Error>{

        try {
            const result = await Food.create(dataFood)

            return result._id.toString()
        } catch (error) {
            console.log(error)
            return new Error('Erro ao criar nova Food')
        }

    }

    // async update(foodId: string, newData: Partial<Omit<IFood, 'id'>>): Promise<void | Error>{

    // }

    // async delete(foodId: string): Promise<void | Error>{

    // }

}

export { FoodMongoRepository}