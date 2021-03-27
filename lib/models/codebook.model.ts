import {Model, DataTypes} from 'sequelize';
import {database} from '../config/database';

export class Codebook extends Model {
    codebook_code: string;
    codebook_name: string;
    codebook_value: number;
    codebook_data: string;
    codebook_isActive: number;
}

export interface CodebookInterface {
    codebook_code: string;
    codebook_name: string;
    codebook_value: number;
    codebook_data: string;
    codebook_isActive: number;
}

Codebook.init(
    {
        codebook_code: {
            type: DataTypes.STRING(20),
            allowNull: false,
            primaryKey: true,
        },
        codebook_name: {
            type: new DataTypes.STRING(100),
            allowNull: false
        },
        codebook_value: {
            type: new DataTypes.INTEGER,
            allowNull: false,
        },
        codebook_data: {
            type: new DataTypes.STRING(100),
            allowNull: true
        },
        codebook_isActive: {
            type: new DataTypes.INTEGER,
            allowNull: false
        },
    },
    {
        timestamps: false,
        tableName: 'codebook',
        sequelize: database,
        defaultScope: {
            attributes: {exclude: ['codebook_isActive']},
        },
    }
);
