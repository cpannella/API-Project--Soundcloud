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
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [validationErrors, setValidationErrors] = useState([]);

  useEffect(()=>{
    const errors = []
    if(!body.length) errors.push('Comment can not be blank')
    setValidationErrors(errors)
  },[body])

  const onSubmit = async (e) => {
    e.preventDefault()
    const payload = {
      id,
      body
    }

  setHasSubmitted(true)
  if(validationErrors.length) return alert('Can not Submit')

  let createdComment = await dispatch(createComment(payload, id))
    if(createdComment) {
    history.push(`/songs/${id}`)
  }
    setBody('')
}

  return (
    <div className="new-comment-form">
      <form onSubmit={onSubmit}>
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
