import {Sequelize, Model, DataTypes, BuildOptions} from "sequelize";
import {database} from "../config/database";

export class User extends Model {
    public user_id!: number;
    public user_username!: string;
    public user_password!: string;
    public user_fullName: string;
    public user_pin: number;
    public user_token: string;
    public user_enabled!: number;
    public user_team!: number;
    public user_teamRole!: number;
    public user_isAdmin!: number;
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
            allowNull: false
        },
        user_password: {
            type: new DataTypes.STRING(40),
            allowNull: false
        },
        user_fullName: {
            type: new DataTypes.STRING(40),
            allowNull: false
        },
        user_pin: {
            type: new DataTypes.INTEGER,
            allowNull: true
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
        user_enabled: {
            type: new DataTypes.TINYINT(),
            allowNull: false
        },
    },
    {
        timestamps: false,
        tableName: "users",
        sequelize: database,
        defaultScope: {
            attributes: {exclude: ['user_password', 'user_pin', 'user_token', 'user_enabled']},
        },
    }
);
