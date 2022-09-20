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

  console.log(songs, 'SONGS on the song index')
  const songList = Object.values(songs)
  console.log('THIS IS THE SONGLIST OBJECT', songList)
  // console.log('workable state', songList)
  //destructure each object while iterating?
    //

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
              <NavLink key={song.id} to={`/songs/${song.id}`}>{song.title}</NavLink>
                <h2>{song.title}</h2>

                <h3 className="song-description">{song.description}</h3>

              <h4>Uploaded by {song.userId}</h4>
              <img alt={song.imageUrl}></img>
              <div className="button-div">
              <button>Leave a comment</button>

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
