import { Sequelize } from "sequelize";

export const database = new Sequelize({
    dialect: "mysql",
    host: "localhost",
    username: "medic",
    password: "C0mdeved",
    database: "medicline",
    //logging: false
});
