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
        <div className="home-buttons">
          <button className="upload-button"onClick={()=> history.push('/upload')}>Upload</button>
          <div className="test-div">
          <ProfileButton user={sessionUser} />
          </div>
      </div>
      </>
      );
  }


  return (
    <div className='nav-bar'>
          <div className="nav-container">
            {/* <div className="spacers"></div> */}
            <img onClick={()=> history.push('/')}className="app-icon"src={icon}></img>
            {/* <div className="spacers"></div> */}
            {/* <div className="spacers"></div> */}

            {isLoaded && sessionLinks}
            {/* <div className="spacers"></div> */}
         </div>
    </div>
  );
}

export default Navigation;
