import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { deleteSong, getOneSong } from '../../store/songs';
import  EditSongForm  from './EditSongform'
import {Comments} from './comments.js'
import './songs.css'


const SongDetail = () => {
  const  {id} = useParams();
  const [showEditsongForm, setShowEditSongForm] = useState(false)
  const dispatch = useDispatch()
  const songs = useSelector(state =>  state.songs)
  const sessionUser = useSelector(state => state.session.user);
  const songList = Object.values(songs)
  const history = useHistory()

  if(!sessionUser){
    history.push('/')
  }

  const filtered = songList.filter(song => song.id === +id)
  const song = filtered[0]
  console.log('this is the song object--------------', song)
  // const artist = song.Artist

  useEffect(() => {
    dispatch(getOneSong(id))
  }, [dispatch, id])

  // console.log('THIS IS THE FILTERED CALL', filtered)
  // console.log('this is the song.id--------------------', song.id)
  return (
    <div className="song-details">
      <h1>SONG DETAILS</h1>
      <h2> {song.title} </h2>
      <h3>{song.description}</h3>

      <p>Uploaded by</p>
      <img alt={song.imageUrl}></img>

      <div>
        {<button onClick={()=> setShowEditSongForm(true)}>Edit song</button>}
        <button onClick={(e)=> {dispatch(deleteSong(song.id), history.push('/'))} }>Delete song</button>
      </div>
          {showEditsongForm ? <EditSongForm/> : null}
       <div>
        <button>View Comments</button>
        <Comments song={songs}/>
       </div>
    </div>
  )

}

export default SongDetail
