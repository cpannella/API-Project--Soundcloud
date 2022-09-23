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
  // console.log('ALL COMMENTS-------------', comments)
  const details = Object.values(comments)
  const filtered = details.filter(comment => comment.songId == id )
  // console.log("this is the filtered data---------------",filtered)
  const user = useSelector((state) => state.session.user)


  useEffect(() => {
    dispatch(getComments(id))
  }, [dispatch])

return comments && (

  <div className="comment-container">
    <h3>Comment section</h3>
    <CreateCommentForm/>

    {filtered.map((comment, i) =>{


      console.log('this is the comment being mapped', comment.User)

      return (
        <div className="single-comment-container">
            <div>
              <p>{comment.User.username}</p>
              <p>{comment.body}</p>
            </div>
             {user.id === comment.userId &&
             <button onClick={()=> {dispatch(deleteComment(comment.id))}}>Delete comment</button>
            }
        </div>
      )
    })}
  </div>
)

}
