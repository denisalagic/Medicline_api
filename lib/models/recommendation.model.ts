import {Model, DataTypes} from 'sequelize';
import {database} from '../config/database';

export class Recommendation extends Model {
    recommendations_id : number;
    recommendations_name: number;
    recommendations_discount: string;
    recommendations_isActive : string;
}

export interface RecommendationInterface {
    recommendations_name: number;
    recommendations_discount: string;
    recommendations_isActive : string;
}

Recommendation.init(
    {
        recommendations_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        recommendations_name: {
            type: new DataTypes.STRING(100),
            allowNull: false
        },
        recommendations_discount: {
            type: new DataTypes.INTEGER,
            allowNull: true,
        },
        recommendations_isActive: {
            type: new DataTypes.INTEGER,
            allowNull: true
        },
    },
    {
        timestamps: false,
        tableName: 'recommendations',
        sequelize: database,
    }
);
