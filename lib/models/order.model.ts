import {Model, DataTypes} from 'sequelize';
import {database} from '../config/database';
import {Product} from './product.model';

export class Order extends Model {
    order_id : number;
    order_user: number;
    order_date: Date;
    order_type: string;
    order_clientType: string;
    order_client: string;
    order_clientLocation: string;
    order_aid: string;
    order_replacement: string;
    order_deliveryType: number;
    order_applicationDate: Date;
    order_doctor: string;
    order_patient: string;
    order_address: string;
    order_recipeDate: Date;
    order_recommendation: string;
    order_remark: string;
    order_invoiced: JSON;
    order_issued: JSON;
    order_delivered: JSON;
    order_partial: number;
    order_documentation: number;
    order_repetitive: string;
    order_printed: number;
    order_isActive: number;
}

export interface OrderProductInterface {
    order_user: number;
    order_date: Date;
    order_type: string;
    order_clientType: string;
    order_client: string;
    order_clientLocation: string;
    order_aid: string;
    order_replacement: string;
    order_deliveryType: number;
    order_applicationDate: Date;
    order_doctor: string;
    order_patient: string;
    order_address: string;
    order_recipeDate: Date;
    order_recommendation: string;
    order_remark: string;
    order_invoiced: JSON;
    order_issued: JSON;
    order_delivered: JSON;
    order_partial: number;
    order_documentation: number;
    order_repetitive: string;
    order_printed: number;
    order_isActive: number;
}

Order.init(
    {
        order_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        order_user: {
            type: new DataTypes.INTEGER,
            allowNull: false,
        },
        order_date: {
            type: new DataTypes.DATE,
            allowNull: false,
        },
        order_type: {
            type: new DataTypes.STRING(20),
            allowNull: false,
        },
        order_clientType: {
            type: new DataTypes.STRING(20),
            allowNull: false,
        },
        order_client: {
            type: new DataTypes.STRING(100),
            allowNull: false,
        },
        order_clientLocation: {
            type: new DataTypes.STRING(100),
            allowNull: false,
        },
        order_aid: {
            type: new DataTypes.STRING(100),
            allowNull: false,
        },
        order_replacement: {
            type: new DataTypes.STRING(100),
            allowNull: false,
        },
        order_deliveryType: {
            type: new DataTypes.INTEGER,
            allowNull: false,
        },
        order_applicationDate: {
            type: new DataTypes.DATE,
            allowNull: false,
        },
        order_doctor: {
            type: new DataTypes.STRING(100),
            allowNull: false,
        },
        order_patient: {
            type: new DataTypes.STRING(100),
            allowNull: false,
        },
        order_address: {
            type: new DataTypes.STRING(100),
            allowNull: false,
        },
        order_recipeDate: {
            type: new DataTypes.DATE,
            allowNull: false,
        },
        order_recommendation: {
            type: new DataTypes.STRING(100),
            allowNull: false,
        },
        order_remark: {
            type: new DataTypes.STRING(100),
            allowNull: false,
        },
        order_invoiced: {
            type: new DataTypes.TEXT,
            allowNull: false,
        },
        order_issued: {
            type: new DataTypes.TEXT,
            allowNull: false,
        },
        order_delivered: {
            type: new DataTypes.TEXT(),
            allowNull: false,
        },
        order_partial: {
            type: new DataTypes.INTEGER,
            allowNull: false,
        },
        order_documentation: {
            type: new DataTypes.INTEGER,
            allowNull: false,
        },
        order_repetitive: {
            type: new DataTypes.STRING(100),
            allowNull: false,
        },
        order_printed: {
            type: new DataTypes.INTEGER,
            allowNull: false,
        },
        order_isActive: {
            type: new DataTypes.INTEGER,
            allowNull: false,
        },
    },
    {
        timestamps: false,
        tableName: 'orders',
        sequelize: database,
    }
);

