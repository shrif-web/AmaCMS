import Category from "./Category.js"
import Post from "./Post.js"
import Tag from "./Tag.js"
import sequelize from "../services/mysql.js"

Category.belongsTo(Category)
Post.belongsTo(Category)
Post.belongsToMany(Tag, {
    through: 'PostTag'
})
Tag.belongsToMany(Post, {
    through: 'PostTag'
})

await sequelize.sync()

export default sequelize
