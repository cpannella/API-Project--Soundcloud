'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Album extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Album.hasMany(models.Song, {foreignKey:'albumId', onDelete: 'CASCADE'})
      Album.belongsTo(models.User, {as: 'Artist', foreignKey: 'userId'})
      // define association here
    }
  }
  Album.init({
    id: {
    type:DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
    },
    userId: DataTypes.INTEGER,
    title: {
      type: DataTypes.STRING,
      allowNull:false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false
    },
    imageUrl: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Album',
  });
  return Album;
};
