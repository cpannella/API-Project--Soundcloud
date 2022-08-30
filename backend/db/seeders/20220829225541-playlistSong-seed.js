'use strict';

const {Playlist, Song, PlaylistSong} = require("../models");





const playlistSongs= [

  {
    name: 'Pink Floyd Favs',
      song: {
        name: 'Money'
      }
  },
  {
    name: 'Metal playlist',
      song: {
        name: 'The Pot'
      }
  },
  {
    name: 'Metal playlist',
      song: {
        name: 'Jambi'
      }
  },
]





module.exports = {
  async up (queryInterface, Sequelize) {

    for (let playlistData of playlistSongs) {
      const { name, song } = playlistData
      const foundPlaylistName = await Playlist.findOne({
        where: {name}
      });
      const foundSong = await Song.findOne({
        where: {title: song.name}
      })

      await PlaylistSong.create({
        playlistId: foundPlaylistName.id,
        songId : foundSong.id
      })
     }
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
