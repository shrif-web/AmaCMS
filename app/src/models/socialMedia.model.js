import Types from "sequelize";
import sequelize from "../services/mysql.js"

const SocialMedia = sequelize.define('SocialMedia',
    {
        id: {
            type: Types.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: Types.STRING,
        link: Types.STRING,
        class: Types.STRING, 
        color: Types.STRING
    }, {
        instanceMethods: {}
    }
);

export default SocialMedia
