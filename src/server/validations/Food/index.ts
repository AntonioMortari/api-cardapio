import * as yup from 'yup'
import { IFood } from '../../models/Food/protocols'

const bodyStoreValidator: yup.Schema<Omit<IFood,'id' | 'path_image'>> = yup.object().shape({
    title: yup.string().required().min(3).nonNullable(),
    price: yup.number().integer().required().moreThan(0).nonNullable(),
})

const bodyEditValidator: yup.Schema<Partial<Omit<IFood, 'id' | 'path_image'>>> = yup.object().shape({
    title: yup.string().min(3).nonNullable(),
    price: yup.number().integer().moreThan(0).nonNullable(),
})

export { bodyStoreValidator, bodyEditValidator}