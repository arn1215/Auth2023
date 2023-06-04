// frontend/src/components/SignupFormPage/index.js
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import * as sessionActions from "../../store/session";

function SignupFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);

  // if (sessionUser) return <Redirect to="/" />; todo

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors([]);

      return await dispatch(sessionActions.signup({ username, password }))
        .catch(async (res) => {
          const data = await res.json();
          if (data && data.errors) setErrors(data.errors);
        });
    }
    return setErrors(['Confirm Password field must be the same as the Password field']);
  };

  return (
    <div className="form fade-in">
      <h2 className='login-text'>Sign Up</h2>
      <ul>
        {errors.map((error, idx) => <li key={idx}>{error}</li>)}
      </ul>

      <label>
        Username
      </label>
      <input
        className="form-element"
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />

      <label>
        Password
      </label>
      <input
        className="form-element"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <label>
        Confirm Password
      </label>
      <input
        className="form-element"
        type="password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        required
      />
      <button type="submit" className="form-element" onClick={handleSubmit} >Sign Up</button>
    </div >

  );
}

export default SignupFormPage;