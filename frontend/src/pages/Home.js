import React, { useEffect, useState } from 'react'
import "./../styles/home.css"
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  axios.defaults.withCredentials = true;

  useEffect(() => {
    axios.get('http://localhost:3001/user').then(res => {
      if(res.status === 200){
        setUsername(res.data.username);
      }
    }).catch(err => {
        navigate('/login');
    });

  }, [])

  const handleLogout = () => {
    axios.get('http://localhost:3001/auth/logout').then(res => {
      navigate('/login')
    }).catch(err => {
      console.log(err);
    });
  };

  return (
    <div className="form-container">
      <div className="form-box">
        <h2>{username}</h2>
        <h2>YOU ARE AUTHENTICATED</h2>
        
          <button className="btn" onClick={handleLogout}>
            LOGOUT 
          </button>
              
      </div>
    </div>
  )
}

export default Home