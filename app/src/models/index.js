import Category from "./category.model.js"
import Post from "./post.model.js"
import Package from "./package.model.js"
import Tag from "./tag.model.js"
import sequelize from "../services/mysql.js"

Category.belongsTo(Category, {
    onDelete: 'CASCADE',
})
Post.belongsTo(Category, {
    onDelete: 'CASCADE',
})
Package.belongsTo(Category, {
    onDelete: 'CASCADE',
})
Post.belongsToMany(Tag, {
    through: 'PostTag',
    onDelete: 'CASCADE',
})
Tag.belongsToMany(Post, {
    through: 'PostTag',
    onDelete: 'CASCADE',
})

export default sequelize
