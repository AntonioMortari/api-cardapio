import { NextFunction, Request, Response } from 'express'
import { validator } from '../../middlewares/Validator'
import { bodyEditValidator, bodyStoreValidator } from '../../validations/Food'


const storeValidationMiddleware = validator({
    body: bodyStoreValidator
})

const editValidationMiddleware = validator({
    body: bodyEditValidator
})

abstract class FoodValidator{

    storeValidation(req: Request, res: Response, next: NextFunction){
        storeValidationMiddleware(req,res,next)
    }

    editValidation(req: Request, res: Response, next: NextFunction){
        editValidationMiddleware(req,res,next)
    }
    


}

export { FoodValidator}