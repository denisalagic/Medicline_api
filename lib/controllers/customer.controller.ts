import {Request, Response} from 'express';
import {Op, UpdateOptions} from 'sequelize';
import {Customer, CustomerInterface} from '../models/customer.model';

export class CustomerController {
    public index(req: Request, res: Response) {
        let condition = [];
        const type = req.query.customer_type;
        if (typeof type !== 'undefined') {
            condition.push({customer_type: type})
        }
        condition.push({ customer_isActive: 0 });

        Customer.findAll<Customer>({
            where: {
                [Op.and]: condition,
            }
        })
            .then((customers: Array<Customer>) => res.json({success: true, data: customers}))
            .catch((err: Error) => res.status(500).json(err))
    }

    public create(req: Request, res: Response) {
        const params: CustomerInterface = req.body

        Customer.create<Customer>(params)
            .then((customer: Customer) => res.status(201).json(customer))
            .catch((err: Error) => res.status(500).json(err))
    }

    public async update(req: Request, res: Response) {
        const customerId: number = Number(req.params.id);
        const params: CustomerInterface = req.body
        const options: UpdateOptions = {
            where: {customer_id: customerId},
            limit: 1
        }

        Customer.update(params, options)
            .then(() => res.status(202).json({success: true}))
            .catch((err: Error) => res.status(500).json(err))
    }
}
