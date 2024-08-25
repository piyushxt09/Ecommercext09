import React, { useEffect, useState } from 'react'
import './SignupLogin.css'
import Navbar from './Navbar';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();
  const [user, setUser] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:4000/api/login', {
        username,
        password,
      }, { withCredentials: true });
      if (response.status === 200) {
        console.log(response.status.message)
        setSuccess('User Login successfull! Redirecting to Dashboard...')
        setTimeout(() => {
          setSuccess('')
          navigate('/dashboard')
        }, 2000)
      }
    }
    catch (error) {
      if (error.response && error.response.status === 401) {
        setError('Invalid credentials. Please try again.');
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

  return (
    <>
      <Navbar />
      <h1 className='signup-hding'>Log in</h1>
      <div className='signup-page'>
        <div className="signup-page-form">
          <form id='signup-form'>
            <div>
              {/* <label htmlFor="username">Enter your name: </label> */}
              <input type="text" placeholder='Username' name='username' value={username} onChange={(e) => setUsername(e.target.value)} required />
            </div>

            <div>
              {/* <label htmlFor="password">Enter password: </label> */}
              <input type="text" name='password' placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} />
              {success && <p style={{ color: 'var(--primary-color)', width: '350px' }}>{success}</p>}
              {error && <p style={{ color: 'var(--primary-color)', width: '220px' }}>{error}</p>}
            </div>

            <div>
              <button type="submit" onClick={handleSubmit}>Log in</button>
            </div>
          </form>
        </div>
        <div className='linktologin'>
          <h2>Welcome</h2>
          <p>Haven't sign up?</p>
          <Link to='/signup'>
            <button>Sign up</button>
          </Link>
        </div>
      </div>
    </>
  )
}
