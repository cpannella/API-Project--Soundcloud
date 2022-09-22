'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Comment.belongsTo(models.Song, {foreignKey:'songId'})
      Comment.belongsTo(models.User, {foreignKey: 'userId'})
      
    }
  }
  Comment.init({
    id: {
      type:DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    songId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    body: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Comment',
    scopes: {
      songComment(songId) {
        const { User } = require('../models')
        return {
          where: {
            songId: songId,
          },
          include: {
          model: User,
          attributes: ['id', 'username']
          }
        }
      }
    }
  });
  return Comment;
};
