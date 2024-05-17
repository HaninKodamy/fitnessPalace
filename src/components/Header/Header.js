import React, { useState } from "react";
import Logo from "../../assets/logo2-removebg-preview.png";
import "./Header.css";
import { Link as ScrollLink } from "react-scroll";
import { Link as RouterLink } from "react-router-dom";
import Bars from "../../assets/bars.png";

export const Header = () => {
  const mobile = window.innerWidth <= 768 ? true : false;
  const [menuOpened, setMenuOpened] = useState(false);

  return (
    <div className="header">
      <img src={Logo} alt="logo" className="logo" />
      {menuOpened === false && mobile === true ? (
        <div style={{ backgroundColor: "var(--appColor)", padding: "0.5rem", borderRadius: "5px"}}
        onClick={()=>setMenuOpened(true)}>
          <img src={Bars} alt="" style={{ width: "1.5rem", height: "1.5rem" }}/>
        </div>
      ) : (
        <ul className="header-menu">
          <li><ScrollLink className="nav-link" onClick={()=>setMenuOpened(false)} to='home' span={true} smooth={true}>Home</ScrollLink></li>
          <li><RouterLink className="nav-link" to="/services" onClick={()=>setMenuOpened(false)}>Services</RouterLink></li>
          <li><ScrollLink className="nav-link" onClick={()=>setMenuOpened(false)} to='reasons' span={true} smooth={true}>Why Us</ScrollLink></li>
          <li><ScrollLink className="nav-link" onClick={() => setMenuOpened(false)} to="plans" spy={true} smooth={true}>Plans</ScrollLink></li>
          <li><ScrollLink className="nav-link" onClick={()=>setMenuOpened(false)} to='testimonials' span={true} smooth={true}>Testimonials</ScrollLink></li>
        </ul>
      )}
    </div>
  );
};
