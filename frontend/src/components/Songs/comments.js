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
    const filtered = details.filter(comment => comment.id === +id )


useEffect(() => {
  dispatch(getComments(id))
}, [dispatch, song])

return  (
  <div className="comment-container">
    <h3>Comments go here</h3>
    <button>View Comments</button>
    {details.map(comment =>{
      return (
        <div className="single-comment-container">
          <ul>
             <li>{comment.body}</li>
          </ul>
        </div>
      )
    } )}
  </div>
)

}
