const { response } = require('express');
const express = require('express')
const router = express.Router()
const {User, Song, Comment, Album, sequelize, Playlist} = require('../../db/models')
const { requireAuth, restoreSession, restoreUser } = require('../../utils/auth');

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


router.post('/', requireAuth, async (req, res) =>{
  const {name, imageUrl} = req.body
  const userId = req.user.id
  const playlist = await Playlist.create({
    name,
    imageUrl,
    userId
  })
  res.status(201)
  res.json(playlist)
})








module.exports = router
