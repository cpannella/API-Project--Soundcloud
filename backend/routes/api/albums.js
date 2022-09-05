const express = require('express')
const router = express.Router()
const {User, Song, Comment, Album} = require('../../db/models');
const album = require('../../db/models/album');
const { requireAuth, restoreSession, restoreUser } = require('../../utils/auth');


router.delete('/:albumId', requireAuth, async (req,res)=>{
  const {albumId} = req.params
  let delet = await Album.findByPk(albumId)
  if(!delet){
    res.status(404)
    res.json({
      "message": "Album couldn't be found",
      "statusCode": 404
    })
  } else {
    await delet.destroy()
    res.json({
      "message": "Successfully deleted",
      "statusCode": 200
    })
  }
})

router.post('/', requireAuth, async (req, res, next) =>{
  const {title, description, imageUrl, albumId} = req.body
  const userId = req.user.id
  if(!await Album.findByPk(albumId)){
    res.status(404)
    res.json({
      "message": "Album couldn't be found",
      "statusCode": 404
    })
  }
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
//edit by id
router.put('/:albumId', requireAuth, async (req, res) =>{
  const userId = req.user.id
  const {albumId} = req.params
  const {title, description, imageUrl} = req.body
  const edited = await Album.findByPk(albumId)
  if(!edited){
    res.status(404)
    res.json({
        "message": "Album couldn't be found",
        "statusCode": 404
    })
  }
  edited.title = title
  edited.description = description
  edited.imageUrl = imageUrl
  await edited.save()
  res.json(edited)
})
//get by album id
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
