import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { createSong } from '../../store/songs';
import './createSong.css'


const CreateSongForm = ({song}) => {
  const history = useHistory()
  const dispatch = useDispatch()

  const songs = useSelector(state =>  state.songs)
  const sessionUser = useSelector(state => state.session.user)

  //form inputs
  const [showForm, setShowForm] = useState(true) //only showform if user is logged in
  const [title, setTitle] = useState(''); //title
  const [description, setDescription] = useState(''); //description
  const [imageUrl, setImageUrl] = useState(''); //imageUrl
  const [url, setUrl] = useState('') //AudioUrl
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [validationErrors, setValidationErrors] = useState([]);

  useEffect(()=> {
    const errors = [];
    if(!title.length) errors.push('Song must have title')
    if((imageUrl && imageUrl.includes('.jpg')) || (imageUrl && imageUrl.includes('png'))) {
     } else {
      errors.push("Must be valid image type")
     }
    if(!description.length) errors.push("Don't be lame, say something about the song you're uploading")
    setValidationErrors(errors)
  }, [title, imageUrl])


  const onSubmit = async (e) => {
    e.preventDefault()
    const payload = {
      title,
      description,
      imageUrl,
      url
    }
    setHasSubmitted(true)
    if(validationErrors.length) return alert('Can not Submit')

    let createdSong = await dispatch(createSong(payload))
      if(createdSong) {
        history.push(`/songs/${createdSong.id}`)
        // hideForm()
    }
  }

  return (
    <div className="new-song-form">
      <h2>Upload a song</h2>
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
        <form onSubmit={onSubmit}>
          <div>
            <label htmlFor='title'>Title:</label>
            <input
              id='title'
              type='text'
              onChange={e => setTitle(e.target.value)}
              value={title}
            />
          </div>
          <div>
            <label htmlFor='description'>Description:</label>
            <input
              id='description'
              type='text'
              onChange={e => setDescription(e.target.value)}
              value={description}
            />
          </div>
          <div>
            <label htmlFor='imageUrl'>imageUrl:</label>
            <input
              id='imageUrl'
              type='text'
              onChange={e => setImageUrl(e.target.value)}
              value={imageUrl}
            />
          </div>
          <div>
            <label htmlFor='audio'>audio:</label>
            <input
              id='audio'
              type='text'
              onChange={e => setUrl(e.target.value)}
              value={url}
            />
          </div>

          <button>Submit</button> <button onClick={()=> history.push('/')}>Cancel</button>
        </form>
      </div>
    </div>
  );
}

export default CreateSongForm
