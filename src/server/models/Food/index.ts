import mongoose from 'mongoose'
import {IFood} from './protocols'

const foodSchema = new mongoose.Schema<Omit<IFood,'id'>>({
    title:{
        type: String,
        required:true,
        min: 3
    },
    price: {
        type: Number,
        required: true
    },

    path_image:{
        type: String,
        required: true
    }
}) 

const Food = mongoose.model<Omit<IFood, 'id'>>('Food', foodSchema)

export { Food}