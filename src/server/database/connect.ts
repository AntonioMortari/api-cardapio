
import mongoose from 'mongoose'
import { MONGO_CONNECT } from '../../config'

const connectToDatabase = async(): Promise<void> => {

    try {
        await mongoose.connect(MONGO_CONNECT)
        console.log('connected to db')
    } catch (error) {
        console.log(error)
    }

}

connectToDatabase()