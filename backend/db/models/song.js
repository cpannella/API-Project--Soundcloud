'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Song extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Song.belongsTo(models.Album, {foreignKey: 'albumId'})
      Song.belongsTo(models.User, {foreignKey: 'userId'})
      Song.hasMany(models.PlaylistSong, {foreignKey: 'songId'})
      Song.hasMany(models.Comment, {foreginKey: 'songId'})
      // define association here
    }
  }
  Song.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    albumId: {
      type:DataTypes.INTEGER,
      allowNull: true,
    },
    userId: DataTypes.INTEGER,
    title: {
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
        len: [1, 20]
      }
    },
    description: {
      type:DataTypes.STRING,
      validate:{
        len: [1, 250]
      }
    },
    url: DataTypes.STRING,
    imageUrl: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Song',
  });
  return Song;
};
