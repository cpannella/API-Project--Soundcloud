import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useParams } from 'react-router-dom'
import  {createComment}  from '../../store/comments';
import './songs.css'


const CreateCommentForm = ({songs}) => {
  const {id} = useParams()
  const history = useHistory()
  const dispatch = useDispatch()
  const comments = useSelector(state =>  state.comments)
  const sessionUser = useSelector(state => state.session.user)
  const [showForm, setShowForm] = useState(true)
  const [body, setBody] = useState('')


  const songId = parseInt(id)
  const onSubmit = async (e) => {
    e.preventDefault()
    const payload = {
      songId,
      body
    }

  let createdComment = await dispatch(createComment(payload, songId))//error is happening with this call,
    if(createdComment) {
    history.push(`/songs/${createdComment.id}`)
    }
   setBody('')
  }

  return (
    <div className="new-comment-form">

      <form onSubmit={onSubmit}>
        <div>
          <label htmlFor='title'>What do you think of this song?:</label>
          <input
            id='title'
            type='text'
            placeholder="Tell us how you feel here!"
            onChange={e => setBody(e.target.value)}
            value={body}
          />
        </div>
        <button>Submit</button>
      </form>
    </div>
  );
}

export default CreateCommentForm
