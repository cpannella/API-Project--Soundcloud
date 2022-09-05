const { response } = require('express');
const express = require('express')
const router = express.Router()
const {User, Song, Comment, Album, sequelize, Playlist} = require('../../db/models')
const { requireAuth, restoreSession, restoreUser } = require('../../utils/auth');

router.get('/:userId/playlists', requireAuth, async (req, res) => {
  const userId = req.user.id
  if(!await User.findByPk(userId)){
    res.status(404)
    res.json({
      "message": "Artist couldn't be found",
      "statusCode": 404
    })
  }
  const playlists = await Playlist.findAll({
    where: {
      userId : userId
    }
  })
  res.json({Playlists:playlists})
})

router.post('/:playlistId/songs', requireAuth, async (req,res)=>{
  const {playlistId} = req.params
  const {songId} = req.body
  const {userId} = req.user.id

  const playlistAdd = await PlaylistSong.create({songId, playlistId})
  const addition = await PlaylistSong.findOne({
    where: {
      songId: songId,
      playlistId: playlistId
    },
    attributes : ['id','songId','playlistId']
  })
  res.json(addition)
})
module.exports = router
