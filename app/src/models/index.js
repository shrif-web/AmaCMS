
import Category from "./category.model.js"
import Post from "./post.model.js"
import Package from "./package.model.js"
import Tag from "./tag.model.js"
import Comment from "./comment.model.js"
import User from "./user.model.js"
import UserLikePost from "./userLikePost.model.js"
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

Comment.belongsTo(User, {
    onDelete: 'CASCADE',
})

User.hasMany(Comment)

Comment.belongsTo(Post, {
    onDelete: 'CASCADE',
})

Post.hasMany(Comment)

Comment.belongsTo(Comment)
Comment.hasMany(Comment)

Post.belongsTo(User)
User.hasMany(Post)

User.belongsToMany(Post, {as: 'favoritePosts', through: UserLikePost})
Post.belongsToMany(User, {as: 'usersFavorite', through: UserLikePost})

export default sequelize