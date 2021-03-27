import {Model, DataTypes} from 'sequelize';
import {database} from '../config/database';

export class Customer extends Model {
    customer_id: number;
    customer_name: string;
    customer_type: number;
    customer_isActive: number;
}

export interface CustomerInterface {
    customer_name: string;
    customer_type: number;
    customer_isActive: number;
}

Customer.init(
    {
        customer_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        customer_name: {
            type: new DataTypes.STRING(100),
            allowNull: false
        },
        customer_type: {
            type: new DataTypes.INTEGER,
            allowNull: false,
        },
        customer_isActive: {
            type: new DataTypes.INTEGER,
            allowNull: true
        },
    },
    {
        timestamps: false,
        tableName: 'customers',
        sequelize: database,
        defaultScope: {
            attributes: {exclude: ['customer_isActive']},
        },
    }
);
