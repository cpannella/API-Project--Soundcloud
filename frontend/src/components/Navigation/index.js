import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
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

        <NavLink to="/login" className="login-button" style={{color: '#ccc', padding: '50px'}}>Log In</NavLink>
        <NavLink to="/signup" className='login-' style={{color: '#fff', backgroundColor: '#f50'}}>Sign Up</NavLink>

      </div>

    );
  }

  return (
    <div className='nav-bar'>
          <NavLink exact to="/" style={{color: '#ccc', background: "#111111" }}>Home</NavLink>
          <input className='search-bar' type="search" placeholder='Search'></input>
          <button>Upload Song</button>
          {isLoaded && sessionLinks}
    </div>
  );
}

export default Navigation;
