// frontend/src/components/LoginFormPage/index.js
import React, { useEffect, useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';


import './LoginForm.css';
import SignupFormPage from '../SignUpFormPage';


function LoginFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const [credential, setCredential] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([]);
  const [signup, setSignup] = useState(false)

  if (sessionUser?.username) return (
    <Redirect to="/rooms/1" />
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.login({ credential, password }))
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      });
  }


  if (signup) {
    return (

      <SignupFormPage />

    );
  } else {
    return (
      <div className='form'>
        <ul>
          {errors?.map((error, idx) => <li key={idx}>{error}</li>)}
        </ul>
        <label>
          Username
        </label>
        <input
          type="text"
          value={credential}
          onChange={(e) => setCredential(e.target.value)}
          className='form-element'
        />
        <label>
          Password
        </label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className='form-element'
        />
        <button type="submit" className='form-element' onClick={handleSubmit}>Log In</button>
        <button className='form-element' style={{ border: 'none', background: 'none' }} onClick={() => setSignup(true)}>or sign up</button>
      </div>
    );
  }
};

export default LoginFormPage;