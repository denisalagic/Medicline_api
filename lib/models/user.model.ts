import {Model, DataTypes} from 'sequelize';
import {database} from '../config/database';

const PROTECTED_ATTRIBUTES = ['user_password', 'user_pin'];

export class User extends Model {
    toJSON () {
        // hide protected fields
        let attributes = Object.assign({}, this.get())
        for (let a of PROTECTED_ATTRIBUTES) {
            delete attributes[a]
        }
        return attributes
    }

    user_id: number;
    user_username: string;
    user_password: string;
    user_fullName: string;
    user_pin: string;
    user_enabled: number;
    user_team: number;
    user_teamRole: number;
    user_isAdmin: number;
    user_isActive: number;
}

export interface UserInterface {
    user_username: string;
    user_password: string;
    user_fullName: string;
    user_pin: string;
    user_enabled: number;
    user_team: number;
    user_teamRole: number;
    user_isAdmin: number;
    user_isActive: number;
}

User.init(
    {
        user_id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true
        },
        user_username: {
            type: new DataTypes.STRING(40),
            unique: true,
            allowNull: false,
        },
        user_password: {
            type: new DataTypes.STRING(100),
            allowNull: false,
        },
        user_fullName: {
            type: new DataTypes.STRING(40),
            allowNull: false
        },
        user_pin: {
            type: new DataTypes.STRING(80),
            allowNull: true,
            unique: true,
        },
        user_token: {
            type: new DataTypes.STRING(50),
            allowNull: true
        },
        user_team: {
            type: new DataTypes.TINYINT(),
            allowNull: false
        },
        user_teamRole: {
            type: new DataTypes.TINYINT(),
            allowNull: false
        },
        user_isAdmin: {
            type: new DataTypes.TINYINT(),
            allowNull: false
        },
        user_isActive: {
            type: new DataTypes.TINYINT(),
            allowNull: false
        },
    },
    {
        timestamps: false,
        tableName: 'users',
        sequelize: database,
        defaultScope: {
            attributes: {exclude: ['user_isActive']},
        },
        scopes: {
            onlyUsers: {
                attributes: { exclude: ['user_username', 'user_token', 'user_isAdmin' , 'user_isActive'] },
            }
        }
    }
);








