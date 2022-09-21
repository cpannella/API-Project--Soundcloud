import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import './comments.css'
import { getComments } from '../../store/comments';


export const Comments = ({song, songId}) => {
  const {id} = useParams()

  const dispatch = useDispatch()
    const comments = useSelector(state => state.comments)
    const details = Object.values(comments)
    console.log('these are the details ')

useEffect(() => {
  // console.log('is data starting here1?')
  dispatch(getComments(id))
}, [dispatch, song])

return  (
  <div>
    <h3>Comments go here</h3>
  </div>
)

}
