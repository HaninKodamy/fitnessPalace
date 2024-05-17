import React, { useState } from "react";
import Logo from "../../assets/logo2-removebg-preview.png";
import "./ProgramsHeader.css";
import { Link as RouterLink } from "react-router-dom";
import Bars from "../../assets/bars.png";
const ProgramsHeader = () => {
    const mobile = window.innerWidth <= 768 ? true : false;
    const [menuOpened, setMenuOpened] = useState(false);

    return (
        <div className="header">
            <img src={Logo} alt="logo" className="logo" />
            {menuOpened === false && mobile === true ? (
                <div style={{ backgroundColor: "var(--appColor)", padding: "0.5rem", borderRadius: "5px"}} onClick={()=>setMenuOpened(true)}>
                    <img src={Bars} alt="" style={{ width: "1.5rem", height: "1.5rem" }}/>
                </div>
            ) : (
                <ul className="header-menu">
                    <li><RouterLink className="nav-link" to="/" onClick={()=>setMenuOpened(false)}>Home</RouterLink></li>
                    <li><RouterLink className="nav-link" to="/services" onClick={()=>setMenuOpened(false)}>Services</RouterLink></li>
                </ul>
            )}
        </div>
    )
}

export default ProgramsHeader