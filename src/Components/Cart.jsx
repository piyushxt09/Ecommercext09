// Cart.js
import React, { useEffect, useState } from 'react';
import './Cart.css'
export default function Cart() {
    const cartItems = localStorage.getItem('cartItems');
    const items = JSON.parse(cartItems);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        const TotalCost = localStorage.getItem('totalCost');
        if (TotalCost) {
            setTotal(parseFloat(TotalCost));
        }
    }, [])


    return (
        <div>
            <div className="head">
                <h1>Your Cart</h1>
                <div>
                    <p><b>Total Cost: </b> &#8377; {total}</p>
                    <button>Buy Now</button>
                </div>
            </div>
            {items ? (
                <div className='Carts'>
                    {items.map((item) => (
                        <div key={item.id} className='CartItems'>
                            <img src={item.image} alt={item.title} width="100" />
                            <div>
                                <h2>{item.title}</h2>
                                <p>Price: &#8377; {item.price}</p>
                                <h4><b> description:</b> {item.description}</h4>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p>Your cart is empty.</p>
            )}
        </div>
    )
}
