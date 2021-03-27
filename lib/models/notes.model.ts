import {Model, DataTypes} from 'sequelize';
import {database} from '../config/database';

export class Notes extends Model {
    note_id: number;
    note_user: number;
    note_topic: string;
    note_message: string;
}

export interface NotesInterface {
    note_user: number;
    note_topic: string;
    note_message: string;
}

Notes.init(
    {
        note_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        note_user: {
            type: new DataTypes.INTEGER,
            allowNull: false
        },
        note_topic: {
            type: new DataTypes.STRING(100),
            allowNull: false,
        },
        note_message: {
            type: new DataTypes.STRING(800),
            allowNull: true
        },
    },
    {
        timestamps: false,
        tableName: 'notes',
        sequelize: database,
    }
);
