import Types from "sequelize";
import sequelize from "../services/mysql.js"

const Category = sequelize.define('Category',
    {
        id: {
            type: Types.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: Types.STRING
    }, {
    instanceMethods: {
    }
})

export default Category
