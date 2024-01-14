import { RequestHandler } from 'express'
import { StatusCodes } from 'http-status-codes'
import { Schema, ValidationError } from 'yup'

type key = 'body' | 'query' | 'params' | 'headers'
type TValidator = (schemas: Partial<Record<key, Schema<unknown>>>) => RequestHandler
type TAllErrors = Record<string, Record<string, string>>

const validator: TValidator = (schemas) => {
    return (req,res,next) => {
        const allErrors: TAllErrors = {}

        Object.entries(schemas).forEach(([key, schema]) => {
            
            try {
                schema.validateSync(req.body, { abortEarly: false})
            } catch (error) {
                const yupError = error as ValidationError

                const errors: Record<string, string> = {}

                yupError.inner.forEach(error => {
                    if(!error.path) return
                    
                    errors[error.path] = error.message
                })

                allErrors[key] = errors
            }
        })

        if(Object.entries(allErrors).length > 0){
            res.status(StatusCodes.BAD_REQUEST).json(allErrors)
        }else{
            next()
        }

    }
}

export { validator }