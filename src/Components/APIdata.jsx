import React, { useEffect, useState } from 'react';
import './APIdata.css'
import Navbar from './Navbar';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function DataApi({ data }) {
    const navigate = useNavigate();
    const handleAddtoCart = async (e) => {
        e.preventDefault();
        const Authentication = localStorage.getItem('Authentication');
        if (Authentication) {
            if (Authentication === 'logout') {
                navigate('/login');
                localStorage.setItem('Authentication', 'login');
            }

        }
        else {
            navigate('/login');
        }
    };

    return (
        <div className='ProductsHome'>
            <Navbar />
            {data ? (
                <div className='Products'>
                    {data.map((item) => (
                        <div className='Product-items' key={item.id}>
                            <img src={item.image} className='images' />
                            <div className='Product-info'>
                                <h2>{item.title}</h2>
                                <h1>{item.category}</h1>
                                <p> Price: &#8377; {item.price}</p>
                                <div>
                                    <h5>Rating: {item.rating.rate} &#9734;</h5>
                                    <button onClick={handleAddtoCart}>Add to cart</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="loading">
                </div>
            )}
        </div>
    );
}
