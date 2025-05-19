module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define('Comment', {
    text: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  });

  Comment.associate = (models) => {
    Comment.belongsTo(models.Article, { foreignKey: 'ArticleId' });
    Comment.belongsTo(models.User, { foreignKey: 'UserId' });
  };

  return Comment;
};
