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




router.get('/:userId/songs', async (req , res) =>{
  const {userId} = req.params
  if(!await User.findByPk(userId)){
    res.status(404)
    res.json({
      "message": "Artist couldn't be found",
      "statusCode": 404
    })
  }
  const songs = await Song.findAll({
    where:{
      userId : userId
    }
  })
  res.json({Songs:songs})
})


router.get('/:userId', async (req, res) =>{
  const {userId} = req.params
  const artist = await User.findByPk(userId)

  res.json(artist)
})



module.exports = router
