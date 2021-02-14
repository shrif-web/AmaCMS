import Types from "sequelize";
import sequelize from "../services/mysql.js"

const Package = sequelize.define('Package',
    {
        id: {
            type: Types.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        title: Types.STRING,
        imageUrl: Types.STRING,
        description: Types.TEXT,
        view: {
            type: Types.INTEGER,
            defaultValue: 0
        },
        fileUrl: Types.STRING,
        price: Types.INTEGER,
        sellCount: {
            type: Types.INTEGER,
            defaultValue: 0
        },
        likes: {
            type: Types.INTEGER,
            defaultValue: 0
        }
    })

export default Package
