import React, { useEffect, useState } from 'react'
import './SignupLogin.css'
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function Signup() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password === password2) {
      try {
        const response = await axios.post('http://localhost:4000/api/signup', {
          username,
          password,
        });
        if (response.status === 201) {
          setSuccess('User registered successfully! Redirecting to login...')
          setTimeout(() => {
            setSuccess('')
            navigate('/login')
          }, 2000)
        }
      }
      catch (error) {
        if (error.response && error.response.status === 409) {
          setError('Username already exists. Please try a different one.');
          setTimeout(() => {
            setError('')
          }, 2000)
        } else {
          setError('An error occurred. Please try again later.');
          setTimeout(() => {
            setError('')
          }, 2000)
        }
      }
    }
    else {
      setError('password does not matched');
      setTimeout(() => {
        setError('')
      }, 2000)
    }

  }

  return (
    <>
      <Navbar />
      <h1 className='signup-hding'>Sign up </h1>
      <div className='signup-page'>
        <div className="signup-page-form">
          <form id='signup-form'>
            <div>
              {/* <label htmlFor="username">Enter your name: </label> */}
              <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required />
            </div>

            <div>
              {/* <label htmlFor="password">Create password: </label> */}
              <input type="text" name='password' placeholder='Create password' value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>

            <div>
              {/* <label htmlFor="password2">Confirm password: </label> */}
              <input type="text" name='password2' placeholder='Re-type password' value={password2} onChange={(e) => setPassword2(e.target.value)} required />
              {success && <p style={{ color: 'var(--primary-color)', width: '350px'}}>{success}</p>}
              {error && <p style={{ color: 'var(--primary-color)', width: '220px' }}>{error}</p>}
            </div>

            <div>
              <button type="submit" onClick={handleSubmit}>Create account</button>
            </div>
          </form>
        </div>
        <div className='linktologin'>
          <h2>Welcome</h2>
          <p>Already Have Account?</p>
          <Link to='/login'>
            <button>Log in</button>
          </Link>
        </div>
      </div>
    </>
  )
}
