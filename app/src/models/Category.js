module.exports = function (sequelize, DataTypes) {
    return sequelize.define('Category', {
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