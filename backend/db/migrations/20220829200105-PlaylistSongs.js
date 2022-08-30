'use strict';

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
      },
      songId: {
        type: Sequelize.INTEGER,
        references:{
          model: 'Songs',
        }
      },
      playlistId:{
        type: Sequelize.INTEGER,
        references:{
          model:'Playlists',
        }
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
    })
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.dropTable('PlaylistSongs')
  }
};
