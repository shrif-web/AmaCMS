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

const htmlToTextOptions = {
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
    const plainContent = htmlToText(post.content, htmlToTextOptions)
    await elastic.create({
        id: String(post.id),
        index: 'posts',
        body: {
            title: post.title,
            imageUrl: post.imageUrl,
            content: plainContent,
            views: post.views,
            createdAt: post.createdAt,
        }
    })
})

Post.afterUpdate(async (post, options) => {
    const plainContent = htmlToText(post.content, htmlToTextOptions)
    await elastic.update({
        id: String(post.id),
        index: 'posts',
        body: {
            doc: {
                title: post.title,
                imageUrl: post.imageUrl,
                content: plainContent,
                views: post.views,
                createdAt: post.createdAt,    
            }
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
