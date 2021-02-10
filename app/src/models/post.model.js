import Types from "sequelize";
import elastic from "../services/elastic.js";
import sequelize from "../services/mysql.js"

const Post = sequelize.define('Post',
    {
        id: {
            type: Types.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        title: Types.STRING,
        imageUrl: Types.STRING,
        content: Types.TEXT,
        views: {
            type: Types.INTEGER,
            defaultValue: 0
        }
    }, {
    instanceMethods: {
    }
});

Post.afterCreate(async (post, options) => {
    await elastic.create({
        id: String(post.id),
        index: 'posts',
        body: {
            title: post.title,
            imageUrl: post.imageUrl,
            content: post.content
        }
    })
})

Post.afterUpdate(async (post, options) => {
    await elastic.update({
        id: String(post.id),
        index: 'posts',
        body: {
            title: post.title,
            imageUrl: post.imageUrl,
            content: post.content
        }
    })
})

Post.afterDestroy(async (post, options) => {
    await elastic.delete({
        id: String(post.id),
        index: 'posts',
    })
})

export default Post
