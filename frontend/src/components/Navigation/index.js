import React from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import './Navigation.css';
import SignUpFormModal from '../SignUpFormPage';


function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);
  const history = useHistory()
  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <>
      <button onClick={()=> history.push('/upload')}>Upload Song</button>
      <ProfileButton user={sessionUser} />
      </>
    );
  } else {
      sessionLinks = (
      <>
        <LoginFormModal/>
        <SignUpFormModal/>

      </>
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
