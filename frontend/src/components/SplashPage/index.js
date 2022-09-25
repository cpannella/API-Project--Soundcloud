import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, Route, useParams } from 'react-router-dom';
import LoginFormModal from '../LoginFormModal';
import SignUpFormModal from '../SignUpFormPage';
import banner from "./concert.jpg"
import "./splashPage.css"
import SplashSongPage from './SplashSongs';

const SplashPage = () => {

  const songs = useSelector(state =>  state.songs)
  const dispatch = useDispatch()
  const sessionUser = useSelector(state => state.session.user);
  const songList = Object.values(songs)

  return (
  <div className="container-div">
    <div className="modal-button-div">
      <LoginFormModal/>
    </div>
    <div className="signup-modal-div">
      <SignUpFormModal/>
    </div>

      <div className="banner-text-div">
        <h1 className="banner-text">Discover new music at Sonic Cloud</h1>
      </div>
      <div className="main-div">
        <img src={banner} style={{height: 400, width: 1014}} ></img>
        {/* <p className="banner-text">Discover what's popping before it  </p> */}
      </div>
      <div className="button-div">

       
        <h1 className="trending-text">Hear what's trending for free in the Sonic-Cloud community </h1>
      </div>
      <div className="component-container">
        <SplashSongPage/>
      </div>
  </div>
  )
}
export default SplashPage
