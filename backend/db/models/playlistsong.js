'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PlaylistSong extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // PlaylistSong.belongsTo(models.Playlist, {foreignKey: 'playlistId'})
      // PlaylistSong.belongsTo(models.Song, {foreignKey: 'songId'})
      // PliaylistSong.belongsToam(models.Song, {thro})
      // define association here
    }
  }
  PlaylistSong.init({
    id: {
      type:DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    songId: DataTypes.INTEGER,
    playlistId: DataTypes.INTEGER,
    order: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'PlaylistSong',
  });
  return PlaylistSong;
};
