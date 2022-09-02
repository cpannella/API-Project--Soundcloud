const { response } = require('express');
const express = require('express')
const router = express.Router()
const {Playlist, User, Song, Comment, Album, sequelize} = require('../../db/models')
const { requireAuth, restoreSession, restoreUser } = require('../../utils/auth');


router.post('/', requireAuth, async (req, res)=>{
  const {name, imageUrl} = req.body
  const userId = req.user.userId
  const playlist = await Playlist.create({
    userId,
    name,
    imageUrl
  })

  res.status(201)
  res.json(playlist)
})





module.exports = router;
