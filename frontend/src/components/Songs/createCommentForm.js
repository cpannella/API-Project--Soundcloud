import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useParams } from 'react-router-dom'
import  {createComment, getComments}  from '../../store/comments';
import './createComment.css'


const CreateCommentForm = ({songs}) => {
  const {id} = useParams()
  const history = useHistory()
  const dispatch = useDispatch()
  const comments = useSelector(state =>  state.comments)
  const sessionUser = useSelector(state => state.session.user)
  const [showForm, setShowForm] = useState(true)
  const [body, setBody] = useState('')
  const [validationErrors, setValidationErrors] = useState([])
  const [hasSubmitted, setHasSubmitted] = useState(false)



  useEffect(()=>{
    const errors = []
    if(!body.length) errors.push('Field can not be empty')
    setValidationErrors(errors)
  }, [body])


  useEffect(()=>{
    dispatch(getComments(id))
  }, [dispatch])

  const songId = parseInt(id)
  const onSubmit = async (e) => {
    e.preventDefault()
    const payload = {
      songId,
      body
    }
    setHasSubmitted(true)
    if(validationErrors.length) return alert('can not submit')
  let createdComment = await dispatch(createComment(payload, songId))
    if(createdComment) {
    history.push(`/songs/${id}`)
    }
   setBody('')
  }

  return (
    <div className="new-comment-form">
      <form onSubmit={onSubmit}>
        <div>
        {hasSubmitted && validationErrors.length > 0 && (
        <div>
          The following errors were found:
          <ul>
            {validationErrors.map(error => (
              <li key={error}>{error}</li>
            ))}
          </ul>
        </div>
      )}
          <label htmlFor='title'>What do you think of this song?:</label>
          <input
            id='title'
            type='textarea'
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
