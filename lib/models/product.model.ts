import {Model, DataTypes} from 'sequelize';
import {database} from '../config/database';

export class Product extends Model {
    product_id: number;
    product_name: string;
    product_group: string;
    product_supplier: string;
    product_code: string;
    product_price: number;
    product_vat: number;
    product_isActive: number;
}

export interface ProductInterface {
    product_name: string;
    product_group: string;
    product_supplier: string;
    product_code: string;
    product_price: number;
    product_vat: number;
    product_isActive: number;
}

Product.init(
    {
        product_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        product_name: {
            type: new DataTypes.STRING(100),
            allowNull: false
        },
        product_group: {
            type: new DataTypes.STRING(100),
            allowNull: false,
        },
        product_supplier: {
            type: new DataTypes.STRING(100),
            allowNull: true
        },
        product_code: {
            type: new DataTypes.STRING(100),
            allowNull: true,
        },
        product_price: {
            type: new DataTypes.DOUBLE(8,2),
            allowNull: false,
        },
        product_vat: {
            type: new DataTypes.DOUBLE(8,2),
            allowNull: false,
        },
        product_isActive: {
            type: new DataTypes.INTEGER,
            allowNull: true,
        },
    },
    {
        timestamps: false,
        tableName: 'products',
        sequelize: database,
    }
);
