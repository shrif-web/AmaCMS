import Types from "sequelize";
import sequelize from "../services/mysql.js"

const Tag = sequelize.define('Tag',
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
});

export default Tag
