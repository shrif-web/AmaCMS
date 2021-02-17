import Types from "sequelize";
import sequelize from "../services/mysql.js"
import { htmlToText } from 'html-to-text'

const Package = sequelize.define('Package',
    {
        id: {
            type: Types.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        title: Types.STRING,
        imageUrl: Types.STRING,
        coverUrl: Types.STRING,
        description: Types.TEXT,
        view: {
            type: Types.INTEGER,
            defaultValue: 0
        },
        fileUrl: Types.STRING,
        price: Types.INTEGER,
        sellCount: {
            type: Types.INTEGER,
            defaultValue: 0
        },
        likes: {
            type: Types.INTEGER,
            defaultValue: 0
        }
    }
)

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

Package.prototype.getRawContent = function() {
    return htmlToText(this.description, option)
}

export default Package
