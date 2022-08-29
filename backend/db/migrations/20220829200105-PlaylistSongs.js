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
        type: Sequelize.INTEGER,
        unique: true,
      },
      songId: {
        type: Sequelize.INTEGER,
        unique: true,
        references:{
          model: 'Songs',
          key: 'songId'
        }
      },
      playlistid:{
        type: Sequelize.INTEGER,
        references:{
          model:'Playlists',
          key:'playlistId'
        }
      },
      order: {
        type: Sequelize.INTEGER
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
