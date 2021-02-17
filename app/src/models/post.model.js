import Types from "sequelize";
import elastic from "../services/elastic.js"
import sequelize from "../services/mysql.js"
import { htmlToText } from 'html-to-text'

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
        },
        likes:{
            type: Types.INTEGER,
            defaultValue: 0
        },
    }, {
    instanceMethods: {
    }
});

const option = {
    tags: {
        a: {
            options: {
                ignoreHref: true
            }
        },
        img: {
            format: 'skip'
        }
    }
}

Post.prototype.getRawContent = function() {
    return htmlToText(this.content, option)
}

Post.afterCreate(async (post, options) => {
    await elastic.createPost(post)
})

Post.afterUpdate(async (post, options) => {
    await elastic.updatePost(post)
})

Post.afterDestroy(async (post, options) => {
    await elastic.deletePost(post)
})

export default Post
