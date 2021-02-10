import Types from "sequelize";
import sequelize from "../services/mysql.js"

const ADMIN = 'admin'
const NORMAL = 'normal'

const userRoles = [ADMIN, NORMAL];

const User = sequelize.define('User',
    {
        id: {
            type: Types.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        firstName: Types.STRING,
        lastName: Types.STRING,
        email: {
            type: Types.STRING,
            validate: {
                isEmail: {
                    msg: 'Invalid email format'
                }
            },
            allowNull: false,
            unique: true
        },
        role: {
            type: Types.ENUM,
            values: userRoles,
            allowNull: false,
            validate: {
                isIn: {
                    args: [userRoles],
                    msg: "Role should be one of " + userRoles.join(", ")
                }
            }
        },
        passwordHash: {
            type: Types.STRING,
            allowNull: false
        }
    }, {
    instanceMethods: {
        getFullname: () => [this.firstname, this.lastname].join(' ')
    },
});

User.roles = {
    ADMIN: ADMIN,
    NORMAL: NORMAL
}

export default User
