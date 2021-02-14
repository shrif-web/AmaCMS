
import Types from "sequelize";
import sequelize from "../services/mysql.js"

const PENDING = 'pending'
const ACCEPTED = 'accepted'
const REJECTED = 'rejected'

const commentRoles = [PENDING, ACCEPTED, REJECTED];

const Comment = sequelize.define('Comment',
    {
        id: {
            type: Types.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        content: Types.TEXT,
        status: {
            type: Types.ENUM,
            values: commentRoles,
            allowNull: false,
            validate: {
                isIn: {
                    args: [commentRoles],
                    msg: "Role should be one of " + commentRoles.join(", ")
                }
            }
        },
        likes: {
            type: Types.INTEGER,
            defaultValue: 0
        },
        dislikes: {
            type: Types.INTEGER,
            defaultValue: 0
        }
    }
);

Comment.statuses = {
    PENDING: PENDING,
    ACCEPTED: ACCEPTED,
    REJECTED: REJECTED,
}

Comment.statusesArr = commentRoles;

export default Comment