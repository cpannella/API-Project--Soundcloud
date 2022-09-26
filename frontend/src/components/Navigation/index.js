import React from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import './Navigation.css';
import SignUpFormModal from '../SignUpFormPage';
import icon from './icon.PNG'


function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);
  const history = useHistory()
  let sessionLinks;
  if(!sessionUser){
    history.push('/')
  }
  if (!sessionUser?.username) {
    return null
  } else {
    sessionLinks = (
      <>
      <button className="upload-button"onClick={()=> history.push('/upload')}>Upload</button>
      <ProfileButton user={sessionUser} />
      </>
      );
  }


  return (
    <div className='nav-bar'>

          <img onClick={()=> history.push('/')}className="app-icon"src={icon}></img>
          <input className='search-bar' type="search" placeholder='Search' ></input>
          {isLoaded && sessionLinks}
    </div>
  );
}

export default Navigation;
