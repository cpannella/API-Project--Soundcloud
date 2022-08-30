const express = require('express')
const router = express.Router()
const {User, Song, Comment} = require('../../db/models')


router.get('/', async (req,res) =>{
  const songs = await Song.findAll({

  })

  return res.json(songs)
})


module.exports = router;
