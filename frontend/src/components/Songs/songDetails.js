import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { deleteSong, getOneSong } from '../../store/songs';
import  EditSongForm  from './EditSongform'
import {Comments} from './comments.js'
import { getComments } from '../../store/comments';
import './songs.css'


const SongDetail = () => {
  const  {id} = useParams();
  const [showEditsongForm, setShowEditSongForm] = useState(false)
  const [showComments, setShowComments] = useState(false)
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
  const artist = song.Artist
  const comments = useSelector((state) => state.comments);
  const user = useSelector((state) => state.session.user)

  useEffect(() => {
    dispatch(getOneSong(id))
    dispatch(getComments(id))
  }, [dispatch, id])

  //onClick i need to retrieve the single song data

    //load it into the audio player

      //have it persist through the pages

  return (
    <div className="song-details">
      <h1>SONG DETAILS</h1>
      <h2> {song.title} </h2>
      <h3>{song.description}</h3>

      <p>Uploaded by {artist?.username}</p>
      <img alt={song.imageUrl} src={song.imageUrl}></img>

      <div>
        {<button onClick={()=> setShowEditSongForm(true)}>Edit song</button>}
        <button onClick={(e)=> {dispatch(deleteSong(song.id), history.push('/'))} }>Delete song</button>
        <button >Play song</button>
      </div>
          {showEditsongForm ? <EditSongForm song={song}/> : null}
       <div>

        <button onClick={()=> setShowComments(true)}>View Comments</button>
        <button onClick={()=> setShowComments(false)}>Hide Comments</button>
          {showComments ? <Comments song={songs}
                                    comment={comments}
                                    id={id}/> :null}
       </div>
    </div>
  )

}

export default SongDetail
