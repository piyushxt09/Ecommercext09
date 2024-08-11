import React from 'react'
import './Home.css'
import Navbar from './Navbar';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <>
    <Navbar />
      <div className='HomePage'>
        <div className='Headings'>
          <h1>Buy amazing products</h1>
          <p>Shop Now! to save upto - 30%😁</p>
          <Link to='/products'>
          <button>Buy Now!</button>
          </Link>
        </div>
      </div>
    </>
  )
}
