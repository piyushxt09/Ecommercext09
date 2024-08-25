import React, { useEffect, useState } from 'react';
import './App.css';
import Home from './Components/Home';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Signup from './Components/Signup';
import Login from './Components/Login';
import APIdata from './Components/APIdata';
import Dashboard from './Components/Dashboard';
import Cart from './Components/Cart';

const App = () => {
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
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);


  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/products" element={<APIdata data={data} />} />
        <Route path="/dashboard" element={<Dashboard  data={data} />} />
        <Route path="/cart" element={<Cart/>} />
      </Routes>
    </Router>
  );
};


export default App;
