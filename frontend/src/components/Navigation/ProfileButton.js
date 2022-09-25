import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";

import * as sessionActions from '../../store/session';

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const sessionUser = useSelector(state => state.session.user);
  const history = useHistory()
  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    if(!sessionUser) {
      history.push('/')
    }
  };

  return (
    <>
      <div className="profile-button">
      <button onClick={openMenu}>
      <i className="fa-regular-fa user-music"></i>
      </button>
      </div>
      <div className="dropDown-menu">
      {showMenu && (
        <ul className="profile-dropdown">
          <li className="dropdownText">{user.username}</li>
          <hr className="break"></hr>
          <li className="dropdownText">{user.email}</li>
          <hr className="break"></hr>

            <button className="logoutButton"onClick={logout}>Log Out</button>

        </ul>
      )}
      </div>
    </>
  );
}

export default ProfileButton;
