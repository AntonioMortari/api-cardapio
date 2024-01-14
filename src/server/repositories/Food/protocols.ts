import { IFood } from '../../models/Food/protocols'


export interface IFoodRepository{
    getAll: () => Promise<IFood[] | Error>
    create: (dataFood: Omit<IFood, 'id'>) => Promise<string | Error>
    // update: (foodId: string, newData: Partial<Omit<IFood,'id'>>) => Promise<void | Error>
    // delete: (foodId: string) => Promise<void | Error>
}