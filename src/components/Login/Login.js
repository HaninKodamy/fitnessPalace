import React, { useEffect, useState } from "react";
import Image from "../../assets/3bf67eea1898d0647e51834a73ca71c2.jpg";
import "./Login.css";
import { FaEye } from "react-icons/fa6";
import { FaEyeSlash } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
    
        fetch('http://localhost:8000/Backend/login.php', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
        })
        .then(response => response.json())
        .then(data => {
          console.log(data)
          if(data.success) {
            console.log("response.json()", data.message)
            console.log("response.json()", data.planes)
            localStorage.setItem('token', data.token)
            localStorage.setItem('plans', JSON.stringify(data.planes))
            navigate('/');
          } else {
            setError('Invalid login credentials!');          
        }
        })
        .catch(error => {
          console.error('Error:', error);
        });
      };

  return (
    <div className="login-main">
      <Link to="/" smooth={true} className="back-arrow">
        <FaArrowLeft />
      </Link>
      <div className="login-left">
        <img src={Image} alt="" />
      </div>
      <div className="login-right">
        <div className="login-right-container">
          <div className="login-center">
            <h2>Welcome back!</h2>
            <p className="small-p">Please enter your details</p>
            <form onSubmit={handleLogin}>
              <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)}/>
              {error && <div className="error-message">{error}</div>}
              <div className="pass-input-div">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                />
                {showPassword ? (
                  <FaEyeSlash
                    onClick={() => {
                      setShowPassword(!showPassword);
                    }}
                  />
                ) : (
                  <FaEye
                    onClick={() => {
                      setShowPassword(!showPassword);
                    }}
                  />
                )}
              </div>

              <div className="login-center-buttons">
                <button type="submit">Log In</button>
              </div>
            </form>
          </div>

          <p className="login-bottom-p">
            Don't have an account?{" "}
            <Link to="/signup" className="button" href="">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
