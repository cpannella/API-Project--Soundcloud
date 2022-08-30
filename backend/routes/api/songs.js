const express = require('express')
const router = express.Router()
const {User, Song, Comment, Album} = require('../../db/models')
const album = require('../../db/models/album')



router.get('/')

// router.get('/current', requireAuth, async (req, res) =>{
//   const songs = await Song.findAll({
//     where: {
//       userId : req.params.id
//     }
//   })
// })

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


module.exports = router;
