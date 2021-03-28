import {Request, Response} from 'express';
import {UpdateOptions, DestroyOptions} from 'sequelize'
import {OrderProduct, OrderProductInterface} from '../models/order_product.model';
import {Product} from '../models/product.model';

export class OrderProductController {

    public index(req: Request, res: Response) {
        const orderId: number = Number(req.params.id);
        OrderProduct.findAll<OrderProduct>({
            where: {
                orderProduct_order: orderId
            },
            include: {
                model: Product,
                attributes:['product_name', 'product_price' , 'product_vat']
            }})
            .then((products: Array<any>) => res.json({success: true, data: products}))
            .catch((err: Error) => res.status(500).json(err))
    }

    public async create(req: Request, res: Response) {
        const params: OrderProductInterface = req.body

        OrderProduct.create<OrderProduct>(params)
            .then((products: OrderProduct) => res.status(201).json(products))
            .catch((err: Error) => res.status(500).json(err))
    }

    public async update(req: Request, res: Response) {
        const orderProductId: number = Number(req.params.id);
        const params: OrderProductInterface = req.body

        const options: UpdateOptions = {
            where: {orderProduct_id: orderProductId},
            limit: 1
        }

        OrderProduct.update(params, options)
            .then(() => res.status(202).json({success: true}))
            .catch((err: Error) => res.status(500).json(err))
    }

    public delete(req: Request, res: Response) {
        const orderProductId: number = Number(req.params.id);
        const options: DestroyOptions = {
            where: {orderProduct_id: orderProductId},
            limit: 1
        }

        OrderProduct.destroy(options)
            .then(() => res.status(204).json({success: true}))
            .catch((err: Error) => res.status(500).json(err))
    }
}
