import { NextFunction, Request, Response } from 'express'
import { validator } from '../../middlewares/Validator'
import { bodyValidator } from '../../validations/Food'


const storeValidationMiddleware = validator({
    body: bodyValidator
})

abstract class FoodValidator{

    storeValidation(req: Request, res: Response, next: NextFunction){
        storeValidationMiddleware(req,res,next)
    }


}

export { FoodValidator}