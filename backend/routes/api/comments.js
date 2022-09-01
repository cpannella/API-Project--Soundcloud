const { response } = require('express');
const express = require('express')
const router = express.Router()
const {User, Song, Comment, Album} = require('../../db/models')
const { requireAuth, restoreSession, restoreUser } = require('../../utils/auth');

router.put('/:commentId', requireAuth, async (req, res)=>{
  const {commentId} = req.params
  let {body} = req.body
  const comment = await Comment.findByPk(commentId)
  if(!comment){
    res.status(404)
    res.json({
      "message": "Comment couldn't be found",
      "statusCode": 404
    })
  }
  comment.body = body
  await comment.save()
  res.json(comment)

})

router.delete('/:commentId', requireAuth, restoreUser, async (req, res) =>{
  const {commentId} = req.params
  const delet = await Comment.findByPk(commentId)

  await delet.destroy()

  res.status(200)
  res.json({
    "message": "Successfully deleted",
    "statusCode": 200
  })


})


module.exports = router;
