import { Sequelize } from "sequelize"

export default new Sequelize(
    process.env.DB_DATABASE,
    process.env.DB_USERNAME,
    process.env.DB_PASSWORD,
    {
        host: 'db',
        dialect: 'mysql'
    }
);
