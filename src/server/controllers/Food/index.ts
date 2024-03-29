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

        return res.status(StatusCodes.OK).json(result)

    }

    async store(req: Request, res: Response) {
        if (!req.file) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                errros: {
                    default: 'A imagem é obrigatória'
                }
            })
        }

        const result = await this.repository.create(req.body, req.file.filename)

        return res.status(StatusCodes.CREATED).json(result)

    }

    async edit(req: Request, res: Response) {
        if (!req.params.id) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                errros: {
                    default: 'O id é obrigatório'
                }
            })
        }

        await this.repository.update(req.params.id, req.body, req.file?.filename)

        res.status(StatusCodes.NO_CONTENT).send()
    }

    async destroy(req: Request, res: Response) {
        if (!req.params.id) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                errros: {
                    default: 'O id é obrigatório'
                }
            })
        }

        await this.repository.delete(req.params.id)

        res.status(StatusCodes.NO_CONTENT).send()

    }


}

export { FoodController }