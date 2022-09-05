const { response } = require('express');
const express = require('express')
const router = express.Router()
const {User, Song, Comment, Album, sequelize, Playlist, PlaylistSong} = require('../../db/models')
const { requireAuth, restoreSession, restoreUser } = require('../../utils/auth');


router.put('/:playlistId', requireAuth, async (req, res) =>{
  const userId = req.user.id
  const {name, imageUrl} = req.body
  const {playlistId} = req.params
  if(name === ''){
    res.status(400)
    res.json({
      "message": "Validation Error",
      "statusCode": 400,
      "errors": {
        "name": "Playlist name is required"
      }
    })
  }
  let edit = await Playlist.findByPk(playlistId)
  if(!edit){
    res.status(400)
    res.json({
      "message": "Playlist couldn't be found",
      "statusCode": 404
    })
  } else {
  edit.name = name
  edit.imageUrl = imageUrl
  }
  await edit.save()
  res.json(edit)
})



router.post('/:playlistId/songs', requireAuth, async (req,res)=>{
  const {playlistId} = req.params
  const {songId} = req.body
  const {userId} = req.user.id
  if(!await Playlist.findByPk(playlistId)){
    res.status(404)
    res.json({
  "message": "Playlist couldn't be found",
  "statusCode": 404

  })
}
  const playlistAdd = await PlaylistSong.create({songId, playlistId})
  const addition = await PlaylistSong.findOne({
    where: {
      songId: songId,
      playlistId: playlistId
    },
    attributes : ['id','songId','playlistId']
    })

  res.json(addition)
})

router.get('/:playlistId', async (req,res) =>{
  let {playlistId} = req.params
  let found = await Playlist.findByPk(playlistId, {
    include: [{model: Song}]
  })

  res.json(found)
})



router.post('/', requireAuth, async (req, res) =>{
  const {name, imageUrl} = req.body
  const userId = req.user.id
  const playlist = await Playlist.create({
    name,
    imageUrl,
    userId
  })
  res.status(201)
  res.json(playlist)
})








module.exports = router
