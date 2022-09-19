import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, Route, useParams } from 'react-router-dom';
import { getSongs } from '../../store/songs';
import './songs.css'



const SongPage = () => {
  const { songId } = useParams()
  const dispatch = useDispatch()

  const songs = useSelector(state =>  state.songs)

  const songList = Object.values(songs)
  console.log('workable state', songList)

  //destructure each object while iterating?
    //

  useEffect(() => {
    dispatch(getSongs())
  }, [dispatch])



  return (
    <div >
      <h1 className="header-placeholder">Songs Component</h1>
      <div>
      <ul>
        {songList.map((song) =>{
          return (
            <div className="song-container">
                <h2>{song.title}</h2>

                <h3 className="song-description">{song.description}</h3>

              <h4>Uploaded by {song.userId}</h4>
              <img src={song.imageUrl}></img>
            </div>
          )
        })}
      </ul>
      </div>
      <p>Songs go here</p>

    </div>
  )
}

export default SongPage
