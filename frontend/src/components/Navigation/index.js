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
      <>
        <LoginFormModal />
        <NavLink to="/signup">Sign Up</NavLink>
      </>
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
