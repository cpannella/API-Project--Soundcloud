import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import './comments.css'
import { getComments, deleteComment } from '../../store/comments';
import CreateCommentForm from './createCommentForm';



export const Comments = ({songs}) => {
  const {id} = useParams()
  const dispatch = useDispatch()
    const comments = useSelector(state => state.comments)
    const details = Object.values(comments)
    const filtered = details.filter(comment => comment.songId === +id )
    console.log('filtered------------', filtered)
    console.log('this is the details object', details)

  useEffect(() => {
    dispatch(getComments(id))
  }, [dispatch, id])

   return  (
  <div className="comment-container">
    <h3>Comment section</h3>
    <CreateCommentForm/>
    {details.map(comment =>{
      return (
        <div className="single-comment-container">
          <ul>
             <li>{comment.body}</li>
             <button onClick={()=> {dispatch(deleteComment(comment.id))}}>Delete comment</button>
          </ul>
        </div>
      )
    })}
  </div>
)

}
