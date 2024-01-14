import * as yup from 'yup'
import { IFood } from '../../models/Food/protocols'

const bodyValidator: yup.Schema<Omit<IFood,'id' | 'path_image'>> = yup.object().shape({
    title: yup.string().required().min(3).nonNullable(),
    price: yup.number().integer().required().moreThan(0).nonNullable(),
    // path_image: yup.string().required().nonNullable()
})

export { bodyValidator}