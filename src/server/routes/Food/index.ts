import {Router} from 'express'

const router = Router()

// controller
import {FoodController} from '../../controllers/Food'
import {FoodMongoRepository} from '../../repositories/Food/FoodMongoRepository'

const foodMongoRepository = new FoodMongoRepository()
const foodController = new FoodController(foodMongoRepository)

router.get('/', async(req,res) => {
    await foodController.index(req,res)
})

router.post('/', async(req,res) => {
    await foodController.store(req,res)
})

export {router as foodRoutes}