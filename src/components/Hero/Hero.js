import React, { useState, useEffect } from "react";
import "./Hero.css";
import { Header } from "../Header/Header";
import hero_image from "../../assets/hero_image.png";
import hero_image_back from "../../assets/hero_image_back.png";
import Heart from "../../assets/heart.png";
import Calories from "../../assets/calories.png";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import userIcon from "../../assets/profile.png";

export const Hero = () => {
  const transition = { duration: 3, type: "spring" };
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    navigate("/login");
  };

  const handleProfileClick = () => {
    setShowDropdown(!showDropdown);
  };

  const handleShowProfile = () => {
    navigate("/userProfile");
    setShowDropdown(false);
  };

  return (
    <div className="hero" id="home">
      <div className="blur hero-blur"></div>
      <div className="left-h">
        <Header />

        <div className="the-best-ad">
          <motion.div
            initial={{ left: "238px" }}
            whileInView={{ left: "8px" }}
            transition={{ ...transition, type: "tween" }}
          ></motion.div>
          <span>THE BEST FITNESS GYM IN THE TOWN</span>
        </div>

        <div className="hero-text">
          <div>
            <span className="stroke-text">Shape </span>
            <span>Your</span>
          </div>
          <div>
            <span>Ideal body</span>
          </div>
          <div>
            <span>
              In here we will help you to shape and build your ideal body and
              live up your life to fullest.
            </span>
          </div>
        </div>

        <div className="hero-buttons">
          {!isAuthenticated && (
            <Link to="/login" className="btn">
              Get Started
            </Link>
          )}
        </div>
      </div>
      <div className="right-h">
        {isAuthenticated ? (
          <div className="dropdown-container">
            <button className="profile-btn" onClick={handleProfileClick}>
              <img src={userIcon} alt="Profile" />
            </button>
            {showDropdown && (
              <div className="dropdown-content">
                <button onClick={handleShowProfile}>Show Profile</button>
                <button onClick={handleLogout}>Logout</button>
              </div>
            )}
          </div>
        ) : (
          <button className="btn">
            <Link to="/login" style={{ textDecoration: "none" }}>
              Join Now
            </Link>
          </button>
        )}

        <div className="heart-rate">
          <img src={Heart} alt="" />
          <span>Heart Rate</span>
          <span>116 bpm</span>
        </div>

        <img src={hero_image} alt="" className="hero-image" />
        <img src={hero_image_back} alt="" className="hero-image-back" />
        <div className="calories">
          <img src={Calories} alt="" />
          <div>
            <span>Calories burned</span>
            <span>220 kcal</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;