import {Request, Response} from 'express';
import {UpdateOptions, DestroyOptions} from 'sequelize'
import {Product, ProductInterface} from '../models/product.model';

export class ProductController {

    public index(req: Request, res: Response) {
        Product.findAll<Product>({
            where: {
                product_isActive: 0
            }
        })
            .then((products: Array<Product>) => res.json({success: true, data: products}))
            .catch((err: Error) => res.status(500).json(err))
    }

    public async create(req: Request, res: Response) {
        const params: ProductInterface = req.body

        Product.create<Product>(params)
            .then((products: Product) => res.status(201).json(products))
            .catch((err: Error) => res.status(500).json(err))
    }

    public async update(req: Request, res: Response) {
        const productId: number = Number(req.params.id);
        const params: ProductInterface = req.body

        const options: UpdateOptions = {
            where: {product_id: productId},
            limit: 1
        }

        Product.update(params, options)
            .then(() => res.status(202).json({success: true}))
            .catch((err: Error) => res.status(500).json(err))
    }

    public delete(req: Request, res: Response) {
        const productId: number = Number(req.params.id);
        const options: DestroyOptions = {
            where: {product_id: productId},
            limit: 1
        }

        Product.destroy(options)
            .then(() => res.status(204).json({success: true}))
            .catch((err: Error) => res.status(500).json(err))
    }
}
