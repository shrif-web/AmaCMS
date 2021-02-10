import Category from "./category.model.js"
import Post from "./post.model.js"
import Tag from "./tag.model.js"
import sequelize from "../services/mysql.js"

Category.belongsTo(Category)
Post.belongsTo(Category)
Post.belongsToMany(Tag, {
    through: 'PostTag'
})
Tag.belongsToMany(Post, {
    through: 'PostTag'
})

export default sequelize
