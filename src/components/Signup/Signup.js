import React, { useState } from 'react';
import signupImage from '../../assets/5a9698643b56a2d36be9b17b6bde7e73.jpg';
import './Signup.css';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [errorUsername, setErrorUsername] = useState('');
  const [errorEmail, setErrorEmail] = useState('');
  const [errorPassword, setErrorPassword] = useState('');
  const [errorConfirmPassword, setErrorConfirmPassword] = useState('');
  const [errorBirthdate, setErrorBirthdate] = useState('');

  const navigate = useNavigate();

  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const isValidPassword = (password) => {
    return password.length >= 8;
  };

  const handleSignup = (e) => {
    e.preventDefault();
    setErrorUsername('');
    setErrorEmail('');
    setErrorPassword('');
    setErrorConfirmPassword('');
    setErrorBirthdate('');

    let hasErrors = false;

    if (!username) {
      setErrorUsername('Please fill in your username.');
      hasErrors = true;
    }
    if (!email) {
      setErrorEmail('Please fill in your email.');
      hasErrors = true;
    } else if (!isValidEmail(email)) {
      setErrorEmail('Please enter a valid email.');
      hasErrors = true;
    }
    if (!password) {
      setErrorPassword('Please fill in your password.');
      hasErrors = true;
    } else if (!isValidPassword(password)) {
      setErrorPassword('Password must be at least 8 characters.');
      hasErrors = true;
    }
    if (!confirmPassword) {
      setErrorConfirmPassword('Please confirm your password.');
      hasErrors = true;
    } else if (password !== confirmPassword) {
      setErrorConfirmPassword('Passwords do not match.');
      hasErrors = true;
    }
    if (!birthdate) {
      setErrorBirthdate('Please enter your birthdate.');
      hasErrors = true;
    }

    if (hasErrors) return;

    fetch('http://localhost:8000/Backend/addUsers.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, email, password, birthdate }),
    })
    .then(response => response.json())
    .then(data => {
      navigate('/login');
    })
    .catch(error => console.error('Error:', error));
  };

  return (
    <div className="login-main">
      <div className="login-left">
        <img src={signupImage} alt="Signup" />
      </div>
      <div className="login-right">
        <div className="login-right-container">
          <div className="login-center">
            <h2>SIGN UP</h2>
            <p className='small-p'>You will not regret</p>
            <form onSubmit={handleSignup}>
              <input type="text" placeholder="User Name" onChange={(e) => setUsername(e.target.value)} />
              {errorUsername && <p className="error-message">{errorUsername}</p>}
              
              <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
              {errorEmail && <p className="error-message">{errorEmail}</p>}
              
              <div className="pass-input-div">
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                />
                {showPassword ? (
                  <FaEyeSlash onClick={() => setShowPassword(!showPassword)} />
                ) : (
                  <FaEye onClick={() => setShowPassword(!showPassword)} />
                )}
              </div>
              {errorPassword && <p className="error-message">{errorPassword}</p>}
              
              <div className="pass-input-div">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder="Confirm Password"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                {showConfirmPassword ? (
                  <FaEyeSlash onClick={() => setShowConfirmPassword(!showConfirmPassword)} />
                ) : (
                  <FaEye onClick={() => setShowConfirmPassword(!showConfirmPassword)} />
                )}
              </div>
              {errorConfirmPassword && <p className="error-message">{errorConfirmPassword}</p>}

              <input
                type="date"
                placeholder="Birthdate"
                className="birthdate-input"
                onChange={(e) => setBirthdate(e.target.value)}
              />
              {errorBirthdate && <p className="error-message">{errorBirthdate}</p>}

              <div className="login-center-buttons">
                <button type="submit">Sign Up</button>
              </div>
            </form>
          </div>
          <p className="login-bottom-p">
            Already have an account?{' '}
            <Link to="/login" className="button">
              Log In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
