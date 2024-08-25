import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

export default function Dashboard({ data }) {
  const [cartValue, setCartValue] = useState(0);
  const [itemIds, setItemIds] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [Total, setTotal] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const savedCartValue = localStorage.getItem('cartValue');
    const savedCartItems = localStorage.getItem('cartItems');
    const savedPrice = localStorage.getItem('totalCost');

    if (savedCartValue) {
      setCartValue(parseInt(savedCartValue, 10)); // Parsing the cart value to integer
    }
    if (savedPrice) {
      setTotal(parseFloat(savedPrice)); // Parsing the cart value to float
    }
    if (savedCartItems) {
      try {
        setCartItems(JSON.parse(savedCartItems)); // Parsing the cart items from JSON string
      } catch (error) {
        console.error('Error parsing saved cart items:', error);
      }
    }
  }, []);

  function CartAdd(itemId) {
    const item = data.find((item) => item.id === itemId);
    if (item) {
      const updatedCartItems = [...cartItems, item];
      setCartItems(updatedCartItems);
      setCartValue(cartValue + 1);
      const updatedTotalCost = Total + item.price;
      setTotal(updatedTotalCost);

      // Save the updated cart state to localStorage
      localStorage.setItem('cartValue', cartValue + 1);
      localStorage.setItem('totalCost', updatedTotalCost.toFixed(2));
      localStorage.setItem('cartItems', JSON.stringify(updatedCartItems)); // Correctly stringify the cart items
      alert('Item added to the cart!');
    }
  }

  const handleLogout = async () => {
    try {
      const response = await axios.post('/api/logout', {}, { withCredentials: true });
      if (response.status === 200) {
        // Clear any client-side data or token if needed
        window.location.replace('/login');
        localStorage.setItem('Authentication', 'logout');
        // navigate('/login'); // Redirect to login page
      } else {
        console.error('Logout failed');
      }
    } catch (error) {
      console.error('An error occurred during logout:', error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/dashboard', { withCredentials: true });
      } catch (error) {
        if (error.response && error.response.status === 401) {
          // If unauthorized, redirect to login
          navigate('/login');
        } else {
          console.error('Error fetching dashboard data:', error);
        }
      }
    };

    fetchData();
  }, [navigate]);


  return (
    <div>
      <div className='Dashboard'>
        <nav>
          <h2>Product.lio</h2>
          <ul>
            <li><Link to='/dashboard'><a href="#">Home</a></Link></li>
            <li><a href="#">Services</a></li>
            <li><a href="#">Contact Us</a></li>
          </ul>
          <div className='Cart'>
            <Link to='/cart' style={{ textDecoration: 'none' }}>
              <h4 className='cartCount'>{cartValue}</h4>
            </Link>
            <Link to='/cart'>
              <i className="fa-solid fa-cart-shopping"></i>
            </Link>
            <button onClick={handleLogout}>Log out</button>
          </div>
        </nav>
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
                    <button onClick={() => CartAdd(item.id)}>Add to cart</button>
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
    </div >
  )
}
