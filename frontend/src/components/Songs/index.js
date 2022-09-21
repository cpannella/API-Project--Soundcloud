import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, Route, useParams } from 'react-router-dom';
import { getSongs } from '../../store/songs';
import './songs.css'
import CreateSongForm from './createSongForm';
import EditSongForm from './EditSongform';
import SongDetail from './songDetails';



const SongPage = () => {
  const { id } = useParams()
  const dispatch = useDispatch()

  const songs = useSelector(state =>  state.songs)
  const sessionUser = useSelector(state => state.session.user);
  const songList = Object.values(songs)


  useEffect(() => {
    dispatch(getSongs())
  }, [dispatch, id])



  return (
    <div >
      <CreateSongForm/>
      <div>
      <ul>
        {songList.map((song) =>{
          return (
            <div  key={song.id} className="song-container">
                <h2>{song.title}</h2>
              <NavLink key={song.id} to={`/songs/${song.id}`}>View Song Details Here</NavLink>

                

              <h4>Uploaded by {song.userId}</h4>
              <img alt={song.imageUrl}></img>
              <div className="button-div">


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
