import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import './comments.css'
import { getComments, deleteComment } from '../../store/comments';
import CreateCommentForm from './createCommentForm';



export const Comments = ({comment}) => {
  const {id} = useParams()
  const dispatch = useDispatch()
  const comments = useSelector(state => state.comments)
  const details = Object.values(comments)
  const filtered = details.filter(comment => comment.songId == id )

  const user = useSelector((state) => state.session.user)


  useEffect(() => {
    dispatch(getComments(id))
  }, [dispatch])

return comments && (

  <div className="comment-container">

    <CreateCommentForm/>
    {filtered.map((comment, i) =>{
      

      return (
        <div className="single-comment-container">
            <div>
              <p className="comment-data-top">{comment.User.username}</p>
              <p className="comment-data">{comment.body}</p>
            </div>
             {user.id === comment.userId &&
             <button className="delete-Comment"onClick={()=> {dispatch(deleteComment(comment.id))}}>Delete</button>
            }
        </div>
      )
    })}
  </div>
)

}
