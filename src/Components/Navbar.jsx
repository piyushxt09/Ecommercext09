import React from 'react'
import './Navbar.css';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav>
      {/* <i className="fa-solid fa-bars"></i> */}
      <h2>Product.lio</h2>
      <ul>
        <li>
          <Link to='/'>
            <a href="">Home</a>
          </Link>
        </li>
        <li>
          <Link to='/products'>
            <a href="">Products</a>
          </Link>
        </li>
        <li><a href="">Services</a></li>
        <li><a href="">Contact us</a></li>
      </ul>
      <div className='LoginBtn'>
        <Link to='/login'>
          <button>Log in </button>
        </Link>
        <Link to='/signup'>
          <button className='SignupBtn'>Sign up </button>
        </Link>
      </div>
    </nav>
  )
}

export default Navbar;