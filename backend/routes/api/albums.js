const express = require('express')
const router = express.Router()
const {User, Song, Comment, Album} = require('../../db/models')
const { requireAuth, restoreSession, restoreUser } = require('../../utils/auth');

router.post('/', requireAuth, async (req, res) =>{
  const userId = req.user.id
  const newAlbum = await Album.create({
      userId: userId,
      title: "Time",
      description: "An album about time.",
      imageUrl: "image url"
  })

  res.json(newAlbum)
})

router.get('/', async (req, res) =>{
  const albums = await Album.findAll()
  res.json({Albums: albums})
})


module.exports = router
