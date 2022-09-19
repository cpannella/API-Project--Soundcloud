import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { editSong } from '../../store/songs';

import './songs.css'

const EditSongForm = ({song}) => {
  const history = useHistory()
  const dispatch = useDispatch()
  console.log('does this render?')
  const songs = useSelector(state =>  state.songs)
  const sessionUser = useSelector(state => state.session.user)

  //form inputs
  const [showForm, setShowForm] = useState(true) //only showform if user is logged in
  const [title, setTitle] = useState(''); //title
  const [description, setDescription] = useState(''); //description
  const [imageUrl, setImageUrl] = useState(''); //imageUrl
  const [url, setUrl] = useState('') //AudioUrl


  const onSubmit = async (e) => {
    e.preventDefault()
    const payload = {
      ...song,
      title,
      description,
      imageUrl,
      url
    }
    console.log(payload)

    let updateSong = await dispatch(editSong(payload))
      if(updateSong) {
        history.push(`/songs/${updateSong.id}`)
        // hideForm()
    }
  }

  return (
    <div className="new-song-form">
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
        <button>Submit</button>
      </form>
    </div>
  );
}

export default EditSongForm