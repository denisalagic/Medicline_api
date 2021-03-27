import {Request, Response} from 'express';
import {Codebook} from '../models/codebook.model';
import {Op} from "sequelize";

export class CodebookController {
    public index(req: Request, res: Response) {
        const code = req.query.codebook_code;
        Codebook.findAll<Codebook>({
            where: {
                [Op.and]: [{ codebook_isActive: 0 }, { codebook_code: code }],
            }
        })
            .then((codebooks: Array<Codebook>) => res.json({success: true, data: codebooks}))
            .catch((err: Error) => res.status(500).json(err))
    }
}
