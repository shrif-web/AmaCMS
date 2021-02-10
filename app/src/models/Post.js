const { Sequelize } = require("sequelize/types");

module.exports = function (sequelize, DataTypes) {
    return sequelize.define('Post', 
    {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        title: Sequelize.STRING,
        imageName: Sequelize.STRING,
        content: Sequelize.TEXT,
        views: {
            type: Sequelize.INTEGER,
            defaultValue: 0
        }
    }, {
        instanceMethods: {
            
        }
    });
};