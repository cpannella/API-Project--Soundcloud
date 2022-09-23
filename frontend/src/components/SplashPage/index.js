import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, Route, useParams } from 'react-router-dom';
import "./splashPage.css"
import SplashSongPage from './SplashSongs';

const SplashPage = () => {

  const songs = useSelector(state =>  state.songs)
  const dispatch = useDispatch()
  const sessionUser = useSelector(state => state.session.user);
  const songList = Object.values(songs)

  return (
  <div className="container-div">
      <div className="main-div">
        <h1>
          sdaasdasdasdasdE</h1>
        SLIDER HERE
      </div>
      <div>
        <h1>UPLOAD YOUR OWN SONG BUTTON HERE</h1>
        <button className='splash-upload'>Upload now</button>
      </div>
      <div>
        <h1>Hear what's trending for free in the Sonic-Cloud community </h1>
        <SplashSongPage/>
      </div>
  </div>
  )
}
export default SplashPage
