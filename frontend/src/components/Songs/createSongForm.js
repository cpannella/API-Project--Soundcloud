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

    if(url.includes('mp3')) {
    } else {
      errors.push('Must be an mp3 file')
    }
    setValidationErrors(errors)
  }, [title, imageUrl, url])


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
    <div className="new-song-form-div">
      <img ></img>
        <div className="upload-form-container">
      <div >
          <form className="new-song-form"onSubmit={onSubmit}>
        {hasSubmitted && validationErrors.length > 0 && (
          <div className="error-container">
            <p className="error-banner">The following errors were found:</p>
            <ul>
              {validationErrors.map(error => (
                <li key={error}>{error}</li>
                ))}
            </ul>
          </div>
        )}
          <h2 className="create-song-banner">Upload a song</h2>
            <div>
              <label htmlFor='title'></label>
              <input
                className="upload-input"
                id='title'
                placeholder="Put your song name here"
                type='text'
                onChange={e => setTitle(e.target.value)}
                value={title}
              />
            </div>
            <div>
              <label htmlFor='description'></label>
              <input
                className="upload-description"
                placeholder="Say something cool about your song"
                id='description'
                type='text'
                onChange={e => setDescription(e.target.value)}
                value={description}
              />
            </div>
            <div>
              <label htmlFor='imageUrl'></label>
              <input
                placeholder="Drop your image link here"
                className="upload-imageUrl"
                id='imageUrl'
                type='text'
                onChange={e => setImageUrl(e.target.value)}
                value={imageUrl}
              />
            </div>
            <div>
              <label htmlFor='audio'></label>
              <input
                className="upload-url"
                placeholder="Drop your audio link here"
                id='audio'
                type='text'
                onChange={e => setUrl(e.target.value)}
                value={url}
              />
            </div>

            <button className="upload-submit">Submit</button> <button className="upload-cancel"onClick={()=> history.push('/')}>Cancel</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreateSongForm
