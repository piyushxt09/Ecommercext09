import React, { useEffect, useState } from 'react';
import './APIdata.css'
import Navbar from './Navbar';

export default function DataApi() {
    const url = 'https://fakestoreapi.com/products';
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': 'b8cfebec47mshe02a585e3673dc5p13693fjsn2b0b88f410b5',
            'x-rapidapi-host': 'real-time-amazon-data.p.rapidapi.com'
        }
    };

    const [data, setData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(url, options);
                const result = await response.json();
                setData(result);
                console.log(result)
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
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
                                    <button>Add to cart</button>
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
