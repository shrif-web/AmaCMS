import Sequelize from "sequelize"

const sequelize = new Sequelize(
    process.env.DB_DATABASE,
    process.env.DB_USERNAME,
    process.env.DB_PASSWORD,
    {
        host: 'db',
        dialect: 'mysql'
    }
);

try {
    await sequelize.authenticate();
    console.log('Connection to mysql has been established successfully.');
} catch (error) {
    console.error('Unable to connect to the database:', error);
}

export default sequelize
