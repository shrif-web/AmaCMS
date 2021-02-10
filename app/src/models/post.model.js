import Types from "sequelize";
import sequelize from "../services/mysql.js"

const Post = sequelize.define('Post',
    {
        id: {
            type: Types.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        title: Types.STRING,
        imageName: Types.STRING,
        content: Types.TEXT,
        views: {
            type: Types.INTEGER,
            defaultValue: 0
        }
    }, {
    instanceMethods: {
    }
});

export default Post
