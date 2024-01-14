import { IFood } from '../../models/Food/protocols'


export interface IFoodRepository{
    getAll: () => Promise<IFood[] | Error>
    create: (dataFood: Omit<IFood, 'id'>, filename: string) => Promise<string | Error>
    update: (foodId: string, newData: Partial<Omit<IFood,'id'>>, filename?: string) => Promise<void | Error>
    verifyFoodExistsById: (foodId: string) => Promise<boolean>
    delete: (foodId: string) => Promise<void | Error>
}