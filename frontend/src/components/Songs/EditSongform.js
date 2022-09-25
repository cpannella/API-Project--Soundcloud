import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useHistory, useParams } from 'react-router-dom';
import { editSong } from '../../store/songs';

import './editSong.css'

const EditSongForm = () => {
  console.log('anything')
  const {id} = useParams()
  console.log('this is the id', id)
  const history = useHistory()
  const dispatch = useDispatch()

  const songs = useSelector(state =>  state.songs)
  console.log('these are the songs', songs)
  const sessionUser = useSelector(state => state.session.user)
  const songsArr = Object.values(songs)
  console.log('this is hte songs array', songsArr)
  const song = songsArr.filter(song => song.id == +id)
  console.log('this is the filtered call', song)
  const target = song[0]
  console.log('this is the target------------', target)

  const [showEditSongForm, setShowEditSongForm] = useState(false)
  const [title, setTitle] = useState(target.title); //title
  const [description, setDescription] = useState(target.description); //description
  const [imageUrl, setImageUrl] = useState(target.imageUrl); //imageUrl
  const [url, setUrl] = useState(target.url) //AudioUrl
  const [validationErrors, setValidationErrors] = useState([])
  const [hasSubmitted, setHasSubmitted] = useState(false);

  useEffect(()=> {
    const errors = [];
    if(!title.length) errors.push('Song must have title')
    if((imageUrl.includes('.jpg')) || (imageUrl.includes('png'))) {
     } else {
      errors.push("Must be valid image type .jpg or .png")
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
       history.push(`/songs/${target.id}`)
    }
  }

  return (
    <div className="edit-song-form-container">
      <div>

      <form className="edit-song-form" onSubmit={onSubmit}>
      {hasSubmitted && validationErrors.length > 0 && (
        <div className="edit-error-messages">
          The following errors were found:
          <ul>
            {validationErrors.map(error => (
              <li key={error}>{error}</li>
            ))}
          </ul>
        </div>
      )}
      <h2>Edit a song</h2>
        <div>
          <label htmlFor='title'>Edit your title</label>
          <input
            className="edit-fields"
            id='title'
            type='text'
            onChange={e => setTitle(e.target.value)}
            value={title}
          />
        </div>
        <div>
          <label htmlFor='description'>Edit description</label>
          <input
            className="edit-fields"
            id='description'
            type='text'
            onChange={e => setDescription(e.target.value)}
            value={description}
          />
        </div>
        <div>
          <label htmlFor='imageUrl'>Edit image</label>
          <input
            className="edit-fields"
            id='imageUrl'
            type='text'
            onChange={e => setImageUrl(e.target.value)}
            value={imageUrl}
          />
        </div>
        <div>
          <label htmlFor='audio'>Edit song</label>
          <input
            className="edit-fields"
            id='audio'
            type='text'
            onChange={e => setUrl(e.target.value)}
            value={url}
          />
        </div>
        <button className="edit-submit " type="submit">Submit</button>
        <button className= "edit-cancel" onClick={()=>{history.push(`/songs/${target.id}`)}}>Cancel</button>
      </form>
      </div>
    </div>
  );
}

export default EditSongForm
