'use strict';

const {Playlist, Song, PlaylistSong} = require("../models");








const inserts = [
{
  songId: 1,
  playlistId: 1,
  order: 1
},
{
  songId: 2,
  playlistId: 1,
  order: 2
},
{
  songId: 3,
  playlistId: 1,
  order: 3
},
{
  songId: 4,
  playlistId: 2,
  order: 1
},
{
  songId: 5,
  playlistId: 2,
  order: 2,
},
{
  songId: 3,
  playlistId: 1,
  order: 3
}
]

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('PlaylistSongs', inserts)

  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     *await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('PlaylistSongs,')
  }
};
