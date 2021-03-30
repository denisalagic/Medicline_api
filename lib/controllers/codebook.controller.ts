import {Request, Response} from 'express';
import {Codebook} from '../models/codebook.model';
import {Op} from "sequelize";

export class CodebookController {
    public index(req: Request, res: Response) {
        let condition = [];
        const code = req.query.codebook_code;
        if (typeof code !== 'undefined') {
            condition.push({codebook_code: code})
        }
        condition.push({ codebook_isActive: 0 });
        Codebook.findAll<Codebook>({
            where: {
                [Op.and]: condition,
            }
        })
            .then((codebooks: Array<Codebook>) => res.json({success: true, data: codebooks}))
            .catch((err: Error) => res.status(500).json(err))
    }
}
