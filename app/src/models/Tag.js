module.exports = function (sequelize, DataTypes) {
    return sequelize.define('Tag', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: Sequelize.STRING
    }, {
        instanceMethods: {
            
        }
    });
};