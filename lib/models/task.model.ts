import {Model, DataTypes} from 'sequelize';
import {database} from '../config/database';

export class Task extends Model {
    task_id: number;
    task_createdBy: number;
    task_assignedTo: number;
    task_createdDate: Date;
    task_solvedDate: Date;
    task_description: string;
    task_solution: string;
    task_readByCreator: number;
    task_readByAssignee: number;
}

export interface TaskInterface {
    task_createdBy: number;
    task_assignedTo: number;
    task_createdDate: Date;
    task_solvedDate: Date;
    task_description: string;
    task_solution: string;
    task_readByCreator: number;
    task_readByAssignee: number;
}

Task.init(
    {
        task_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        task_createdBy: {
            type: new DataTypes.INTEGER,
            allowNull: false
        },
        task_assignedTo: {
            type: new DataTypes.INTEGER,
            allowNull: false,
        },
        task_createdDate: {
            type: new DataTypes.DATE(),
            allowNull: true
        },
        task_solvedDate: {
            type: new DataTypes.DATE(),
            allowNull: false,
        },
        task_description: {
            type: new DataTypes.STRING(800),
            allowNull: false,
        },
        task_solution: {
            type: new DataTypes.STRING(800),
            allowNull: false,
        },
        task_readByCreator: {
            type: new DataTypes.INTEGER,
            allowNull: false,
        },
        task_readByAssignee: {
            type: new DataTypes.INTEGER,
            allowNull: false,
        },
    },
    {
        timestamps: false,
        tableName: 'tasks',
        sequelize: database,
    }
);
