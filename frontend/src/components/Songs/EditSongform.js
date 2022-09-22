import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useHistory, useParams } from 'react-router-dom';
import { editSong } from '../../store/songs';

import './songs.css'

const EditSongForm = ({song}) => {
  const {id} = useParams()
  const history = useHistory()
  const dispatch = useDispatch()

  const songs = useSelector(state =>  state.songs)
  const sessionUser = useSelector(state => state.session.user)

  //form inputs
  const [showEditsongForm, setShowEditSongForm] = useState(false)
  const [title, setTitle] = useState(''); //title
  const [description, setDescription] = useState(''); //description
  const [imageUrl, setImageUrl] = useState(''); //imageUrl
  const [url, setUrl] = useState('') //AudioUrl
  const [validationErrors, setValidationErrors] = useState([])
  const [hasSubmitted, setHasSubmitted] = useState(false);

  useEffect(()=> {
    const errors = [];
    if(!title.length) errors.push('Song must have title')
    if((imageUrl.includes('.jpg')) || (imageUrl.includes('png'))) {
     } else {
      errors.push("Must be valid image type")
     }
    setValidationErrors(errors)
  }, [title, imageUrl])




  const onSubmit = async (e) => {
    e.preventDefault()
    setShowEditSongForm(false)
    const payload = {
      id,
      title,
      description,
      imageUrl,
      url
    }
    setHasSubmitted(true)
    if(validationErrors.length) return alert('Fix form errors!')

    let updateSong = await dispatch(editSong(payload))
      if(updateSong) {
       history.push(`/songs/${updateSong.id}`)
    }
  }

  return (
    <div className="new-song-form">
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
      <h2>Edit a song</h2>
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
        <button >Submit</button>
      </form>
    </div>
  );
}

export default EditSongForm
