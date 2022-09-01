const express = require('express')
const router = express.Router()
const {User, Song, Comment, Album} = require('../../db/models');
const album = require('../../db/models/album');
const { requireAuth, restoreSession, restoreUser } = require('../../utils/auth');

router.post('/', requireAuth, async (req, res, next) =>{

  const {title, description, imageUrl} = req.body
  if(!title){
    res.status(400)
    throw new Error({
    "message": "Validation Error",
    "statusCode": 400,
    "errors": {
    "title": "Album title is required"
  }
    })
  }
  const userId = req.user.id
  const newAlbum = await Album.create({
      userId,
      title,
      description,
      imageUrl
  })
  res.json(newAlbum)
})

router.get('/current', requireAuth, async (req, res) =>{

  const userId = req.user.id
  const albums = await Album.findAll({
    where: {userId}
  })
  res.json({Albums:albums})
})

router.put('/:albumId', async (req, res) =>{

})

router.get('/:albumId', async (req, res) =>{
  const {albumId} = req.params
  const found = await Album.findByPk(albumId, {
    include: [{model: User, as: 'Artist', attributes: ['id','username','imageUrl']},
     {model: Song}
    ]
   }
  )
  if(!found){
    res.status(404)
    return res.json({
      message: "album couldn't be found",
      statusCode: 404
    })
  }
  res.json(found)
})

//get albums from current user


router.get('/', async (req, res) =>{
  const albums = await Album.findAll()
  res.json({Albums: albums})
})


module.exports = router
