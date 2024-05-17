import React from "react";
import { programsData } from "../../data/programsData";
import RightArrow from "../../assets/rightArrow.png";
import { Link } from "react-router-dom";
import "./Programs.css";

const Programs = () => {
  return (
    <div className="Programs" id="programs">
      <div className="programs-header">
        <span className="stroke-text">Explore our</span>
        <span>Classes</span>
        <span className="stroke-text">To shape you</span>
      </div>

      <div className="program-categories">
        {programsData.map((program) => (
          <div className="category">
            {program.image}
            <span>{program.heading}</span>
            <span>{program.details}</span>
            <div className="join-now">
              <Link to="/services/classes" style={{ textDecoration: 'none' }}>
                <span>Explore</span>
                <img src={RightArrow} alt="" style={{ paddingLeft: '20px',width:"1.2rem"}} />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Programs;
