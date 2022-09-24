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
  console.log("this is the songList-------------------",songList)

  useEffect(() => {
    dispatch(getSongs())
  }, [dispatch])


  return (
    <div >
      <div>
      <div className='SplashSongPage-container'>

          {songList.map((song) =>{
            return (
              <div key={song.id} className="splash-song-container">


                <h4></h4>
                  <img onClick={()=>{setUrl(song.url)}}alt={song.imageUrl} src={song.imageUrl}></img>
                  <div className="song-button-div">
                  <p className="title-box">{song.title}</p>
                  <p className="artist-splash">{song.Artist.username}</p>
                  {/* <button onClick={()=> setUrl(song.url)}>Play song</button> */}
                </div>
              </div>
            )
          })}

        </div>
      </div>
    </div>
  )
}

export default SplashSongPage
