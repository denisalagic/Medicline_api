import {Model, DataTypes} from 'sequelize';
import {database} from '../config/database';

export class CustomerLocation extends Model {
    customerslocations_id: number;
    customerslocations_address: string;
    customerslocations_city: string;
    customerslocations_customer: number;
    customerslocations_isActive: number;
}

export interface CustomerLocationInterface {
    customer_name: string;
    customerslocations_address: string;
    customerslocations_city: string;
    customerslocations_customer: number;
    customerslocations_isActive: number;
}

CustomerLocation.init(
    {
        customerslocations_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        customerslocations_address: {
            type: new DataTypes.STRING(100),
            allowNull: false
        },
        customerslocations_city: {
            type: new DataTypes.STRING(100),
            allowNull: false
        },
        customerslocations_customer: {
            type: new DataTypes.INTEGER,
            allowNull: false,
        },
        customerslocations_isActive: {
            type: new DataTypes.INTEGER,
            allowNull: true
        },
    },
    {
        timestamps: false,
        tableName: 'customerslocations',
        sequelize: database,
        defaultScope: {
            attributes: {exclude: ['customerslocations_isActive']},
        },
    }
);
