'use strict';

let options = {};
options.tableName = "PlaylistSongs"

if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}



module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.createTable('PlaylistSongs', {
      id: {
        primaryKey: true,
        type: Sequelize.INTEGER,
        unique: true,
        autoIncrement: true
      },
      songId: {
        type: Sequelize.INTEGER,
        references:{
          model: "Songs",
        },
        onDelete: 'CASCADE'
      },
      playlistId:{
        type: Sequelize.INTEGER,
        references:{
          model:'Playlists',
        },
        onDelete: 'CASCADE'
      },
      order: {
        type: Sequelize.INTEGER,
        autoIncrement: true
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    }, options)
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.dropTable('PlaylistSongs', options)
  }
};
