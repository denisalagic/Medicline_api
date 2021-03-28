import {Model, DataTypes} from 'sequelize';
import {database} from '../config/database';

export class Visit extends Model {
    visit_id: number;
    visit_user: number;
    visit_clientType: string;
    visit_client: string;
    visit_location: string;
    visit_date: Date;
    visit_type: string;
    visit_description: string;
}

export interface VisitInterface {
    visit_user: number;
    visit_clientType: string;
    visit_client: string;
    visit_location: string;
    visit_date: Date;
    visit_type: string;
    visit_description: string;
}

Visit.init(
    {
        visit_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        visit_user: {
            type: new DataTypes.INTEGER,
            allowNull: false
        },
        visit_client: {
            type: new DataTypes.STRING(100),
            allowNull: false,
        },
        visit_location: {
            type: new DataTypes.STRING(800),
            allowNull: true
        },
        visit_date: {
            type: new DataTypes.DATE(),
            allowNull: false,
        },
        visit_type: {
            type: new DataTypes.STRING(10),
            allowNull: false,
        },
        visit_description: {
            type: new DataTypes.STRING(800),
            allowNull: false,
        },
    },
    {
        timestamps: false,
        tableName: 'visits',
        sequelize: database,
    }
);
