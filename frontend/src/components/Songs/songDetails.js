import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getOneSong } from '../../store/songs';
import  EditSongForm  from './EditSongform'
import './songs.css'


const SongDetail = () => {
  const  {id} = useParams();
  const [showEditsongForm, setShowEditSongForm] = useState(false)
  const dispatch = useDispatch()
  const songs = useSelector(state =>  state.songs)
  const sessionUser = useSelector(state => state.session.user);
  const songList = Object.values(songs)


  useEffect(() => {
    dispatch(getOneSong(id))
  }, [dispatch, id])

  const filtered = songList.filter(song => song.id === +id)
  const song = filtered[0]
  console.log('THIS IS THE FILTERED CALL', filtered)
  return (
    <div className="song-details">
      <h1>SONG DETAILS</h1>
      <h2> {song.title} </h2>
      <h3>{song.description}</h3>


      <p>Album</p>
      <img alt={song.imageUrl}></img>
      {
    <button onClick={()=> setShowEditSongForm(true)}>Edit song</button>
     }
  {showEditsongForm ? <EditSongForm/> : null}
    </div>
  )

}

export default SongDetail
