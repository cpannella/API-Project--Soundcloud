const { response } = require('express');
const express = require('express')
const router = express.Router()
const {User, Song, Comment, Album, sequelize} = require('../../db/models')
const { requireAuth, restoreSession, restoreUser } = require('../../utils/auth');


//Create a new song
router.post('/', requireAuth, async (req, res) =>{
   const userId = req.user.id
   const {title, description, url, imageUrl, albumId} = req.body

   if(albumId && albumId !== null){
   const find = await Album.findByPk(albumId)
    if(!find) {
      res.status(404)
      res.json({
        "message": "Album couldn't be found",
        "statusCode": 404
      })
    }
  }

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

  const edit = await Song.findByPk(songId, {
    include: [{model:User, as: 'Artist',
      attributes: ['id','username','imageUrl']
    }]})
    if(!edit) {
      res.status(404)
      res.json({
      "message": "Song couldn't be found",
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
///----delete--song
router.delete('/:songId', requireAuth, async (req, res) =>{
  const {songId} = req.params

  const delet = await Song.findByPk(songId)
  if(!delet){
    res.status(404)
    res.json({
      "message": "Song couldn't be found",
      "statusCode": 404
    })
  }
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
  res.status(201)
  res.json(newComment)
})

//get comments of song by id
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
    res.json({Songs:songs})
})

//GET all details of Song from ID
router.get('/:songId', async (req,res) =>{

  const {songId} = req.params


  const songs = await Song.findByPk(songId, {
    include: [{model:User, as: 'Artist',
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

    let errorResult = {errors: [], count: 0, pageCount: 0};
    let {page, size, createdAt, title} = req.query

    if (!size) size = 20
    if (!page) page = 1

    size = parseInt(size)
    page = parseInt(page)

    const pagination = {}

    if (Number.isInteger(page) && Number.isInteger(size) && page >= 1 && size >= 1) {
      pagination.limit = size;
      pagination.offset = size * (page - 1)
    } else if (size < 0 || page < 0 || page > 10 || !createdAt) {
    errorResult.errors.push({
      "message": "Validation Error",
      "statusCode": 400,
      "errors": {
        "page": "Page must be greater than or equal to 0",
        "size": "Size must be greater than or equal to 0",
        "createdAt": "CreatedAt is invalid"
      }
    })
  }
  if (errorResult.errors.length) {
    errorResult.count = await Song.count()
    res.status(400);
    res.json(errorResult)
    return;
  }
  let result = {};

result.songs = await Song.findAll({

  include:
  [{
      model: User, as: 'Artist',
      attributes: ['id', 'username', 'imageUrl']
  }],

  attributes: ['id','userId', 'albumId', 'title','description',
    'url',
    'createdAt',
    'updatedAt',
    'imageUrl'
  ],

      ...pagination
    });

    result.page = page || 1
    result.size = size

    res.json({
      "Songs": result.songs,
      "page": result.page,
      "size": result.size
    })
  })


module.exports = router;
