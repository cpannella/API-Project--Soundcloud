import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, Route, useParams } from 'react-router-dom';
import { getSongs } from '../../store/songs';
import './songs.css'
import CreateSongForm from './createSongForm';
import EditSongForm from './EditSongform';



const SongPage = () => {
  const { songId } = useParams()
  const dispatch = useDispatch()

  const songs = useSelector(state =>  state.songs)
  const sessionUser = useSelector(state => state.session.user);

  const songList = Object.values(songs)
  console.log('workable state', songList)

  //destructure each object while iterating?
    //

  useEffect(() => {
    dispatch(getSongs())
  }, [dispatch])



  return (
    <div >
      <CreateSongForm/>
      <EditSongForm/>
      <div>
      <ul>
        {songList.map((song) =>{
          return (
            <div  key={song.id} className="song-container">
                <h2>{song.title}</h2>

                <h3 className="song-description">{song.description}</h3>

              <h4>Uploaded by {song.userId}</h4>
              <img alt={song.imageUrl}></img>
              <div className="button-div">
              <button>Leave a comment</button>
              <button>Edit Song</button>
              </div>
            </div>
          )
        })}
      </ul>
      </div>


    </div>
  )
}

export default SongPage
