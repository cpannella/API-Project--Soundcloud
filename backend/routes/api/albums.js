const express = require('express')
const router = express.Router()
const {User, Song, Comment, Album} = require('../../db/models')
const { requireAuth, restoreSession, restoreUser } = require('../../utils/auth');

router.post('/', requireAuth, async (req, res) =>{
  const {title, description, imageUrl} = req.body
  const userId = req.user.id
  const newAlbum = await Album.build({
      userId,
      title,
      description,
      imageUrl
  })
  res.json(newAlbum)
})

router.get('/current', requireAuth, async (req, res) =>{
  console.log(req.params)
  const userId = req.user.id
  const albums = await Album.findAll({
    where: {userId}
  })
  res.json(albums)
})


router.get('/', async (req, res) =>{
  const albums = await Album.findAll()
  res.json({Albums: albums})
})


module.exports = router
