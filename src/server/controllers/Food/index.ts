import { Request, Response } from 'express'
import { IFoodRepository } from '../../repositories/Food/protocols'
import { StatusCodes } from 'http-status-codes'
import { FoodValidator } from './FoodValidator'


class FoodController extends FoodValidator {

    private repository: IFoodRepository

    constructor(repository: IFoodRepository) {
        super()
        this.repository = repository
    }

    async index(req: Request, res: Response) {

        const result = await this.repository.getAll()

        if (result instanceof Error) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                errros: {
                    default: result.message
                }
            })
        }

        return res.status(StatusCodes.OK).json(result)

    }

    async store(req: Request, res: Response) {
        if (!req.file) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                errros: {
                    default: 'A imagem é obrigatória'
                }
            })
        }

        const result = await this.repository.create(req.body, req.file.filename)

        if (result instanceof Error) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                errros: {
                    default: result.message
                }
            })
        }

        return res.status(StatusCodes.CREATED).json(result)

    }


}

export { FoodController }