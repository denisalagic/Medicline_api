import {Request, Response} from 'express';
import {Op, UpdateOptions} from 'sequelize';
import {CustomerLocation, CustomerLocationInterface} from '../models/customer_locations.model';

export class CustomerLocationController {
    public index(req: Request, res: Response) {
        CustomerLocation.findAll<CustomerLocation>({
            where: {
                [Op.and]: [{customersLocations_isActive: 0 }],
            }
        })
            .then((customersLocations: Array<CustomerLocation>) => res.json({success: true, data: customersLocations}))
            .catch((err: Error) => res.status(500).json(err))
    }

    public create(req: Request, res: Response) {
        const params: CustomerLocationInterface = req.body

        CustomerLocation.create<CustomerLocation>(params)
            .then((customersLocations: CustomerLocation) => res.status(201).json(customersLocations))
            .catch((err: Error) => res.status(500).json(err))
    }

    public async update(req: Request, res: Response) {
        const customerLocationsId: number = Number(req.params.id);
        const params: CustomerLocationInterface = req.body
        const options: UpdateOptions = {
            where: {customersLocations_id: customerLocationsId},
            limit: 1
        }

        CustomerLocation.update(params, options)
            .then(() => res.status(202).json({success: true}))
            .catch((err: Error) => res.status(500).json(err))
    }
}
