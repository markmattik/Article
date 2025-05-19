const { Sequelize } = require('sequelize');
const config = require('../config/config').development;

const sequelize = new Sequelize({
  dialect: config.dialect,
  storage: config.storage,
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Models
db.User = require('./User')(sequelize, Sequelize);
db.Article = require('./Article')(sequelize, Sequelize);
db.Comment = require('./Comment')(sequelize, Sequelize);

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});


db.User.hasMany(db.Article, { onDelete: 'CASCADE' });
db.Article.belongsTo(db.User);

db.Article.hasMany(db.Comment, { onDelete: 'CASCADE' });
db.Comment.belongsTo(db.Article);

db.User.hasMany(db.Comment, { onDelete: 'CASCADE' });
db.Comment.belongsTo(db.User);

module.exports = db;
