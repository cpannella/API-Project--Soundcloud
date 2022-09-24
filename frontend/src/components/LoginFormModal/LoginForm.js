import React, { useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import './LoginForm.css';


function LoginForm() {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const [credential, setCredential] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([]);



  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.login({ credential, password }))
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      });
  }

  return (
    <form className="login-form"onSubmit={handleSubmit}>
      <ul className="error-field">
        {errors.map((error, idx) => <li key={idx}>{error}</li>)}
      </ul>
      <div>
      <h1 className="login-banner">Log in</h1>
      </div>
      <label>

        <input
          placeholder="Your email or username here"
          className="username-field"
          type="text"
          value={credential}
          onChange={(e) => setCredential(e.target.value)}
          required
        />
      </label>
      <label>

        <input
          className="password-field"
          placeholder="Your password here"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </label>
      <button className="login-submit-button" type="submit">Log In</button>
      <button className="demo-user-button" type="submit" onClick={()=> dispatch(sessionActions.login({ credential: 'demo@user.io', password: "password" }))
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      })}>DEMO USER</button>
    </form>
  );
}

export default LoginForm;
