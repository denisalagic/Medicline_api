import {Model, DataTypes} from 'sequelize';
import {database} from '../config/database';
import {Product} from './product.model';

export class OrderProduct extends Model {
    orderProduct_id: number;
    orderProduct_order: number;
    orderProduct_product: number;
    orderProduct_quantity: number;
    orderProduct_partial: number;
    orderProduct_type: number;
}

export interface OrderProductInterface {
    orderProduct_order: number;
    orderProduct_product: number;
    orderProduct_quantity: number;
    orderProduct_partial: number;
    orderProduct_type: number;
}

OrderProduct.init(
    {
        orderProduct_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        orderProduct_order: {
            type: new DataTypes.INTEGER,
            allowNull: false,
        },
        orderProduct_product: {
            type: new DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Product,
                key: 'product_id'
            }
        },
        orderProduct_quantity: {
            type: new DataTypes.INTEGER,
            allowNull: true
        },
        orderProduct_partial: {
            type: new DataTypes.INTEGER,
            allowNull: false,
        },
        orderProduct_type: {
            type: new DataTypes.INTEGER,
            allowNull: true
        },
    },
    {
        timestamps: false,
        tableName: 'ordersproducts',
        sequelize: database,
    }
);
OrderProduct.hasMany(Product, { foreignKey: 'product_id'});
