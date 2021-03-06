import {Request, Response} from 'express';
import {Op, UpdateOptions} from 'sequelize';
import {Order, OrderInterface} from '../models/order.model';
import * as moment from 'moment'
import {User} from '../models/user.model';

export class OrderController {

    public async index(req: Request, res: Response) {
        const userId = Number(res.locals.jwtPayload.user_id);
        const userTeam = Number(res.locals.jwtPayload.user_team);
        const userRole = Number(res.locals.jwtPayload.user_teamRole);
        let dateFrom: string = String(req.params.dateFrom);
        let dateTo: string = String(req.params.dateTo);
        let conditions = {};
        let andCondition = [];
        let orCondition = [];
        if ((userTeam != 0 && userRole == 1) || (userTeam == 0 && userRole == 1)) {
            andCondition.push({'order_user': userId});
        } else if (userTeam != 0 && userRole == 0) {
            await User.findAll<User>({
                where: {
                    [Op.and]: [{user_isActive: 0},{user_team: userTeam}],
                }
            })
                .then((users: Array<User>) => users.forEach((e) => orCondition.push({'order_user': e.user_id})));

        }
        if (dateFrom!= 'undefined' && dateTo != 'undefined') {
            dateFrom = moment(dateFrom).format("YYYY-MM-DD");
            dateFrom = moment(dateTo).format("YYYY-MM-DD");
            andCondition.push({[Op.and]: [{[Op.gt]: dateFrom}, {[Op.lt]: dateTo}, {order_invoiced: {[Op.not]: null}},
                    {order_issued: {[Op.not]: null}}, {order_delivered:{[Op.not]: null}}, {order_partial: 0}, {order_documentation: 0}]});
        } else {
            let date = moment().subtract(5, "days").format("YYYY-MM-DD");
            let dateAndCondition = {[Op.and]: [{order_invoiced: {[Op.not]: null}}, {order_issued: {[Op.not]: null}},
                    {order_delivered:{[Op.not]: null}}, {order_date: {[Op.gt]: date}}]};
            let dateOrCondition = {[Op.or]: [{order_invoiced: {[Op.eq]: null}}, {order_issued:{[Op.eq]: null}},
                    {order_delivered: {[Op.eq]: null}}, {order_partial: 1}, {order_documentation: 1}]};
            orCondition.push({[Op.or]: [dateAndCondition, dateOrCondition]});
        }
        if (andCondition.length > 0) Object.assign(conditions, {[Op.and]: andCondition});
        if (orCondition.length > 0) Object.assign(conditions, {[Op.or]: orCondition});
        Order.findAll<Order>({
            where: conditions,
        })
            .then((orders: Array<Order>) => res.json({success: true, data: orders}))
            .catch((err: Error) => res.status(500).json(err))
    }

    public async create(req: Request, res: Response) {
        const params: OrderInterface = req.body
        params.order_user = Number(res.locals.jwtPayload.user_id);

        Order.create<Order>(params)
            .then((order: Order) => res.status(201).json(order))
            .catch((err: Error) => res.status(500).json(err))
    }

    public async update(req: Request, res: Response) {
        const orderProductId: number = Number(req.params.id);
        const params: OrderInterface = req.body;

        const options: UpdateOptions = {
            where: {orderProduct_id: orderProductId},
            limit: 1
        }

        Order.update(params, options)
            .then(() => res.status(202).json({success: true}))
            .catch((err: Error) => res.status(500).json(err))
    }
}
