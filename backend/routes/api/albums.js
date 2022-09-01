const express = require('express')
const router = express.Router()
const {User, Song, Comment, Album} = require('../../db/models')
const { requireAuth, restoreSession, restoreUser } = require('../../utils/auth');

router.post('/', requireAuth, async (req, res) =>{
  const {title, description, imageUrl} = req.body
  const newAlbum = await Album.create({
    title: title,
    description: description,
    imageUrl: imageUrl
  })
  res.json(newAlbum)
})

//get details of album from albumId
router.get('/:albumId', async (req, res) =>{
  const {albumId} = req.params
  const found = await Album.findByPk(albumId, {
    include: [{model:User,
      attributes: ['id','username','imageUrl']
    },
    {model: Song}
    ],
    }
  )
    res.json(found)
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
