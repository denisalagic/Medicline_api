import {Request, Response} from 'express';
import {UpdateOptions, DestroyOptions} from 'sequelize'
import {Visit, VisitInterface} from '../models/visit.model';

export class VisitController {

    public index(req: Request, res: Response) {
        const userId: number = Number(req.params.id);
        Visit.findAll<Visit>({
            where: {
                visit_user: userId
            }
        })
            .then((visit: Array<Visit>) => res.json({success: true, data: visit}))
            .catch((err: Error) => res.status(500).json(err))
    }

    public async create(req: Request, res: Response) {
        const params: VisitInterface = req.body

        Visit.create<Visit>(params)
            .then((visit: Visit) => res.status(201).json(visit))
            .catch((err: Error) => res.status(500).json(err))
    }

    public async update(req: Request, res: Response) {
        const visitId: number = Number(req.params.id);
        const params: VisitInterface = req.body

        const options: UpdateOptions = {
            where: {visit_id: visitId},
            limit: 1
        }

        Visit.update(params, options)
            .then(() => res.status(202).json({success: true}))
            .catch((err: Error) => res.status(500).json(err))
    }

    public delete(req: Request, res: Response) {
        const visitId: number = Number(req.params.id);
        const options: DestroyOptions = {
            where: {visit_id: visitId},
            limit: 1
        }

        Visit.destroy(options)
            .then(() => res.status(204).json({success: true}))
            .catch((err: Error) => res.status(500).json(err))
    }
}
