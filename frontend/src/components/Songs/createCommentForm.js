import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import  createComment  from '../../store/songs';
import './songs.css'


const CreateCommentForm = ({songs}) => {
  const history = useHistory()
  const dispatch = useDispatch()
  const comments = useSelector(state =>  state.comments)
  const sessionUser = useSelector(state => state.session.user)

  const [showForm, setShowForm] = useState(true) //only showform if user is logged in
  const [body, setBody] = useState('')




  const onSubmit = async (e) => {
    console.log('submit data start')
    e.preventDefault()
    const payload = {
      body
    }
    console.log('flerpidy derp tracing data')
                                  //this dispatch is causing my song reducer to run.
    let createdComment = await dispatch(createComment(payload))//error is happening with this call,


    console.log('this is the created comment', createdComment)
      if(createdComment) {
        history.push(`/songs/${createdComment.id}`)
        // hideForm()
    }
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
