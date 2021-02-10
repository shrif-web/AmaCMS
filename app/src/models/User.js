userRoles = ['admin', 'normal'];

module.exports = function (sequelize, DataTypes) {
    return sequelize.define('User', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        firstName: Sequelize.STRING,
        lastName: Sequelize.STRING,
        email: {
            type: Sequelize.STRING,
            validate: {
                isEmail: {
                    msg: 'Invalid email format'
                }
            }
        },
        role: {
            type: Sequelize.ENUM,
            values: userRoles,
            allowNull: false,
            validate: {
                isIn: {
                    args: userRoles,
                    msg: "Role should be one of " + userRoles.join(", ")
                }
            }
        }
    }, {
        instanceMethods: {
            getFullname: function () {
                return [this.firstname, this.lastname].join(' ');
            }
        }
    });
};