const { response } = require('express');
const express = require('express')
const router = express.Router()
const {User, Song, Comment, Album, sequelize, Playlist} = require('../../db/models')
const { requireAuth, restoreSession, restoreUser } = require('../../utils/auth');



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
