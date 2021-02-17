import Types from "sequelize";
import sequelize from "../services/mysql.js"

const PostViewLog = sequelize.define('PostViewLog', {
    PostId: {
        type: Types.INTEGER,
        primaryKey: true
    },
    date: {
        type: Types.DATEONLY,
        primaryKey: true,
    },
    views: {
        type: Types.INTEGER,
        defaultValue: 0
    }
})

export default PostViewLog
