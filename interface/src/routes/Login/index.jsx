import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { ToastContainer, toast } from 'react-toastify';

import axios from "axios"
import style from './style.module.css';

import { UserDataContext } from "../../stores/UserDataStore";


export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);  

  const [userData, setUserData] = useContext(UserDataContext)

  const navigate = useNavigate();

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const fetchData = async (newUserData,username) => {
    try {
      const response = await fetch('http://localhost:4000/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username }), 
      });
      const data = await response.json();
      const  role_id = data.role_id;
      newUserData.setRole(role_id);
    } catch (error) {
      console.error(error);
    }
  };

    

  const handleFormSubmit = (e) => {
    e.preventDefault()
    if (!username || !password) {
      toast.error('Please enter both username and password');
      return;
    }



    axios.post("http://localhost:4000/login", { username, password })
      .then(response => {
        const newUserData = userData.copy()
        newUserData.setToken(response.data?.token)
        if (username) {
          fetchData(newUserData ,username)
          console.log(newUserData)
        }
        console.log(newUserData)
        setUserData(newUserData)
        setLoginError(false)
        navigate("/home")
      })
      .catch((err) => {
        console.error('An error occurred during login:', err);
        setLoginError(true)
        if (err.response && err.response.status === 400) {
          const errorMessage = err.response.data;
          toast.error(errorMessage);
        } else {
          toast.error("An error occurred while submitting the login details. Please try again.");
        }
      });
  }

  return (
    <div className={style.containerLogin}>
      <div className={style.card}>
        <h1 className={style.title}>Login to your account</h1>
        <form className={style.form} onSubmit={handleFormSubmit}>
          <div className={style.formGroup}>
            <label className={style.label}>
              Username
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={handleUsernameChange}
              className={style.input}
              placeholder="Enter your username"
            />
          </div>
          <div className={style.formGroup}>
            <div className='idk'>
            <label  className={style.label}>
              Password
            </label>
            <div className={style.passwordInputContainer}>
              <button
                type="button"
                className={`${style.passwordToggleButton} ${style.button}`} 
                onClick={handleTogglePasswordVisibility}
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>

            </div>
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                value={password}
                onChange={handlePasswordChange}
                className={style.input}
                placeholder="Enter your password"
                autoComplete="new-password" 
              />
          </div>
          <div className={style.formGroup}>
            <div className='test-container'>
              <button type="submit" className={style.button}>
                Login
              </button>
            </div>
          </div>
        </form>
      </div>
      <ToastContainer position="bottom-right" />
    </div>
  );
}
