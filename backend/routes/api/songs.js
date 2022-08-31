const express = require('express')
const router = express.Router()
const {User, Song, Comment, Album} = require('../../db/models')
const { requireAuth, restoreSession, restoreUser } = require('../../utils/auth');
//Create a new song
router.post('/', requireAuth, async (req, res) =>{
   const userId = req.user.id

   const {title, description, url, imageUrl, albumId} = req.body
   const newSong = await Song.create({
    title:title,
    description: description,
    url: url,
    imageUrl:url,
    albumId: null
   })
   res.json(newSong)
})
//GET by current user
router.get('/current', requireAuth, async (req, res) =>{
    console.log(req.params)
    const userId = req.user.id
    const songs = await Song.findAll({
      where: {userId}
    })
    res.json(songs)
})

//GET all details of Song from ID
router.get('/:songId', async (req,res) =>{
  console.log(req.params)
  const {songId} = req.params

  console.log(songId)
  const songs = await Song.findByPk(songId, {
    include: [{model:User,
      attributes: ['id','username','imageUrl']
    },
    {model: Album,
      attributes: ['id','title','imageUrl']}
    ],
  })
  if(!songs){
      res.status(404)
      return res.json({
        message: "Song couldn't be found",
        statusCode: 404
      })
    }
  return res.json(songs)
})
//GET All songs
  router.get('/', async (req, res) =>{
    const songs = await Song.findAll()
    res.json({Songs:songs})
  })


module.exports = router;
