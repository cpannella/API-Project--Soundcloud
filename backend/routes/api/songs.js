const { response } = require('express');
const express = require('express')
const router = express.Router()
const {User, Song, Comment, Album} = require('../../db/models')
const { requireAuth, restoreSession, restoreUser } = require('../../utils/auth');


//Create a new song
router.post('/', requireAuth, async (req, res) =>{
   const userId = req.user.id
   const {title, description, url, imageUrl, albumId} = req.body

   const newSong = await Song.create({
    title,
    description,
    url,
    imageUrl,
    albumId,
    userId
   })
   res.status(201)
   res.json(newSong)
})
//update a song by Id
router.put('/:songId', async (req, res) =>{
  const {songId} = req.params
  const {title, description, url, imageUrl, albumId} = req.body

  const edit = await Song.findByPk(songId,
    )
    if(!edit) {
      res.status(404)
      res.json({ "message": "Song couldn't be found",
      "statusCode": 404})
    }
    if(!albumId){
      edit.albumId = null
    }
    edit.title = title,
    edit.description = description,
    edit.imageUrl = imageUrl,
    edit.url = url,
    await edit.save()
    res.json(edit)
})

router.delete('/:songId', requireAuth, async (req, res) =>{

  const {songId} = req.params
  console.log(songId)
  const delet = await Song.findByPk(songId)
  delet.destroy()
  res.status(200)
  res.json({
    message: "Successfully deleted",
    statusCode: 200
  })
})
//create a comment for a song
router.post('/:songId/comments', async (req,res) =>{
  const userId = req.user.id
  const {songId} = req.params
  const {body} = req.body
  let find = await Song.findByPk(songId)
  if(!find){
    res.status(404)
    res.json({
      "message": "Comment couldn't be found",
      "statusCode": 404
    })
  }
  let newComment = await Comment.create({
    userId,
    body,
    songId
  })

  res.json(newComment)
})


router.get('/:songId/comments', async (req, res) => {
  const {songId} = req.params

  const commentScope = await Comment.scope([{method: ['songComment', songId]}]).findOne()


  if (!commentScope) {
    res.status(404);
    return res.json({
      message: "Song couldn't be found",
      statusCode: 404
    })
  }

  res.json({"Comments": [commentScope]})
});




//GET songs by current user
router.get('/current', requireAuth, async (req, res) =>{

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
    include: [{model:User, as: "Artist",
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
