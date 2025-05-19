module.exports = (sequelize, DataTypes) => {
  const Article = sequelize.define('Article', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  });

  Article.associate = (models) => {
    Article.hasMany(models.Comment, { foreignKey: 'ArticleId' });
    Article.belongsTo(models.User, { foreignKey: 'UserId' });
  };

  return Article;
};
