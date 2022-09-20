import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { createSong } from '../../store/songs';
import './songs.css'


const CreateSongForm = ({song}) => {
  const history = useHistory()
  const dispatch = useDispatch()
  // console.log('does this render?')
  const songs = useSelector(state =>  state.songs)
  const sessionUser = useSelector(state => state.session.user)

  //form inputs
  const [showForm, setShowForm] = useState(true) //only showform if user is logged in
  const [title, setTitle] = useState(''); //title
  const [description, setDescription] = useState(''); //description
  const [imageUrl, setImageUrl] = useState(''); //imageUrl
  const [url, setUrl] = useState('') //AudioUrl
  const [albumId, setAlbumId] = useState(null)


  const onSubmit = async (e) => {
    e.preventDefault()
    const payload = {
      title,
      description,
      imageUrl,
      url,
      albumId
    }

    let createdSong = await dispatch(createSong(payload))
      if(createdSong) {
        history.push(`/songs/${createdSong.id}`)
        // hideForm()
    }
  }

  return (
    <div className="new-song-form">
      <h2>Upload a song</h2>
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
        <div>
          <label htmlFor='audio'>album:</label>
          <input
            id='audio'
            type='text'
            onChange={e => setAlbumId(e.target.value)}
            value={albumId}
          />
        </div>
        <button>Submit</button>
      </form>
    </div>
  );
}

export default CreateSongForm
