import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <ProfileButton user={sessionUser} />
    );
  } else {
    sessionLinks = (
      <div className='session-links'>
      <>
        <NavLink to="/login" className="login-button">Log In</NavLink>
        <NavLink to="/signup" className='signup' >Sign Up</NavLink>
      </>
      </div>
    );
  }

  return (
    <div className='nav-bar'>

          <NavLink exact to="/" style={{color: '#ccc', background: "#111111" }}>Home</NavLink>
          <input className='search-bar' type="search" placeholder='Search'></input>
          {isLoaded && sessionLinks}



    </div>
  );
}

export default Navigation;
