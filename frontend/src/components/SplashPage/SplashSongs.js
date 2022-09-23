import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, Route, useParams } from 'react-router-dom';
import { getSongs } from '../../store/songs';


import Player from '../AudioPlayer'
import { useAudio } from '../../context/audioPlayer';


 const SplashSongPage = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const songs = useSelector(state =>  state.songs)
  const sessionUser = useSelector(state => state.session.user);
  const songList = Object.values(songs)
  const comments = useSelector((state) => state.comments);
  const user = useSelector((state) => state.session.user)
  const { url, setUrl} = useAudio()

  useEffect(() => {
    dispatch(getSongs())
  }, [dispatch])


  return (
    <div >
      <div>
      <div className='SplashSongPage-container'>
        <ul>
          {songList.map((song) =>{
            return (
              <div key={song.id} className="song-container">


                <h4></h4>
                  <img alt={song.imageUrl} src={song.imageUrl}></img>
                  <div className="button-div">
                  <h3>{song.title}</h3>
                  <button onClick={()=> setUrl(song.url)}>Play song</button>
                </div>
              </div>
            )
          })}
        </ul>
        </div>
      </div>
    </div>
  )
}

export default SplashSongPage
