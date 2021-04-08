import {Request, Response} from 'express';
import {UpdateOptions, DestroyOptions} from 'sequelize'
import {Recommendation, RecommendationInterface} from '../models/recommendation.model';

export class RecommendationController {

    public index(req: Request, res: Response) {
        Recommendation.findAll<Recommendation>({
            where: {
                recommendations_isActive: 0
            }
        })
            .then((recommendation: Array<Recommendation>) => res.json({success: true, data: recommendation}))
            .catch((err: Error) => res.status(500).json(err))
    }

    public async create(req: Request, res: Response) {
        const params: RecommendationInterface = req.body
        console.log(params);

        Recommendation.create<Recommendation>(params)
            .then((recommendation: Recommendation) => res.status(201).json(recommendation))
            .catch((err: Error) => res.status(500).json(err))
    }

    public async update(req: Request, res: Response) {
        const recommendationsId: number = Number(req.params.id);
        const params: RecommendationInterface = req.body

        const options: UpdateOptions = {
            where: {recommendations_id: recommendationsId},
            limit: 1
        }

        Recommendation.update(params, options)
            .then(() => res.status(202).json({success: true}))
            .catch((err: Error) => res.status(500).json(err))
    }

    public delete(req: Request, res: Response) {
        const recommendationsId: number = Number(req.params.id);
        const options: DestroyOptions = {
            where: {recommendations_id: recommendationsId},
            limit: 1
        }

        Recommendation.destroy(options)
            .then(() => res.status(204).json({success: true}))
            .catch((err: Error) => res.status(500).json(err))
    }
}
