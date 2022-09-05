const { response } = require('express');
const express = require('express')
const router = express.Router()
const {User, Song, Comment, Album, sequelize, Playlist} = require('../../db/models')
const { requireAuth, restoreSession, restoreUser } = require('../../utils/auth');

router.get('/:userId/playlists', requireAuth, async (req, res) => {
  const userId = req.user.user
  const playlists = await Playlist.findAll({
    where: {
      userId : userId
    }
  })
  res.json(playlists)
})


module.exports = router
