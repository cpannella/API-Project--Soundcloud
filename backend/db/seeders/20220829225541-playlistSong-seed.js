'use strict';

const {Playlist, Song, PlaylistSong} = require("../models");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

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
    options.tableName = "PlaylistSongs"
    await queryInterface.bulkInsert(options, inserts)

  },

  async down (queryInterface, Sequelize) {
    options.tableName = "PlaylistSongs"
    /**
     * Add commands to revert seed here.
     *
     * Example:
     *await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete(options)
  }
};
