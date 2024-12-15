import React, { useState, } from "react";
import "./../styles/loginRegister.css";
import axios from "axios";
import {useNavigate} from "react-router-dom";

const LoginRegister = () => {
  const navigate = useNavigate()
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState(null);
  const [loginValues, setLoginValues] = useState({
    username: "",
    password: "",
    email: ""
  });

  const toggleForm = () => setIsLogin(!isLogin);
  const clearLoginValues = () => {
    setLoginValues({
      username: "",
      password: "",
      email: ""
    });
  }
  axios.defaults.withCredentials = true;
  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform login/signup logic here
    if(isLogin){
      axios.post("http://localhost:3001/auth/login", loginValues)
      .then(res => {
        setError(null);
        clearLoginValues();
        navigate('/')
      })
      .catch(err => {
        setError(err.response.data.error);
        clearLoginValues();
      });
    }else{
      axios.post("http://localhost:3001/auth/register", loginValues)
      .then(res => {
        setError(null);
        clearLoginValues();
        toggleForm();
      })
      .catch(err => {
        setError(err.response.data.error);
        clearLoginValues();
      })
    }
  };

  return (
    <div className="form-container">
      <div className="form-box">
        <h2>{isLogin ? "Login" : "Register"}</h2>
        <form onSubmit={handleSubmit}>
          {isLogin ? (
            <>
              <div className="input-group">
                <input type="text" placeholder="Username" value={loginValues.username}
                  onChange={e => setLoginValues({...loginValues, username: e.target.value})} required />
              </div>
              <div className="input-group">
                <input type="password" placeholder="Password" value={loginValues.password}
                  onChange={e => setLoginValues({...loginValues, password: e.target.value})} required />
              </div>
              <h2 style={{color: "red"}}>{error}</h2>

              <div className="options">
                <a href="#">Forgot password?</a>
              </div>
            </>
          ) : (
            <>
              <div className="input-group">
                <input type="text" placeholder="Username" value={loginValues.username}
                  onChange={e => setLoginValues({...loginValues, username: e.target.value})} required />
              </div>
              <div className="input-group">
                <input type="email" placeholder="Email" value={loginValues.email}
                  onChange={e => setLoginValues({...loginValues, email: e.target.value})} required />
              </div>
              <div className="input-group">
                <input type="password" placeholder="Password" value={loginValues.password}
                onChange={e => setLoginValues({...loginValues, password: e.target.value})} required />
              </div>
              <h2 style={{color: "red"}}>{error}</h2>
            </>
          )}

          <button type="submit" className="btn">
            {isLogin ? "LOGIN" : "SIGN UP"}
          </button>
        </form>

        <div className="social-login">
          <p>Or Sign {isLogin ? "in" : "up"} Using</p>
          <div className="social-icons">
            <button className="social-btn facebook">F</button>
            <button className="social-btn twitter">T</button>
            <button className="social-btn google">G</button>
          </div>
        </div>

        <p className="toggle-form">
          Or {isLogin ? "Sign Up" : "Login"} Using
          <button onClick={toggleForm} className="link">
            {isLogin ? "SIGN UP" : "LOGIN"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default LoginRegister;
