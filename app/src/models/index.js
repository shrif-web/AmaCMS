import sequelize from "../mysql";

const Sequelize = require("sequelize");


//--------- Loading Models ---------//
const models = [
    'User',
    'Category',
    'Tag',
    'Post',
];
models.forEach(function(model) {
    module.exports[model] = sequelize.import(__dirname + '/' + model);
});


//--------- Relationships ---------//
(function(m) {
    m.Category.belongsTo(m.Category);
    m.Post.belongsTo(m.Category);
    m.Post.belongsToMany(m.Tag, {through: 'PostTag'});
    m.Tag.belongsToMany(m.Post, {through: 'PostTag'});
})(module.exports);

module.exports.sequelize = sequelize;

