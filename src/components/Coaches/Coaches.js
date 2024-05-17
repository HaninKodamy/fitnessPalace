import React, { useState, useEffect } from 'react';
import leftArrow from "../../assets/leftArrow.png";
import rightArrow from "../../assets/rightArrow.png";
import { motion } from "framer-motion";
import "./Coaches.css"

const Coaches = () => {
    const [coaches, setCoaches] = useState([]);
    const [selected, setSelected] = useState(0);
    const transition = { type: "spring", duration: 1 };
    const [tLength, setTLength] = useState(0);
    useEffect(() => {
        fetch('http://localhost:8000/Backend/getCoaches.php')
            .then(response => response.json())
            .then(data =>{
                setCoaches(data);
                setTLength(data.length);
            } )
            .catch(error => console.error('Error fetching data:', error));
    }, []);


  return (
    <div className="coaches">
      <div className="left-t">
      <div className="blur hero-blur"></div>
        <span>Coaches</span>
        <span className="stroke-text">Get To Know Our</span>
        {tLength > 0 && (
          <>
        <motion.span
          key={selected}
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 100 }}
          transition={transition}
        >
          {coaches[selected].coach_experience}
        </motion.span>
        <span>
          {" "}
          <span style={{ color: "var(--orange)" }}>
          {coaches[selected].coach_name}
          </span>
          - {coaches[selected].coach_email}
        </span>
        </>
        )}
      </div>
      <div className="right-t">
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          transition={{ ...transition, duration: 2 }}
          whileInView={{ opacity: 1, x: 0 }}
        ></motion.div>
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          transition={{ ...transition, duration: 2 }}
          whileInView={{ opacity: 1, x: 0 }}
        ></motion.div>
        {tLength > 0 && (
        <motion.img
          key={selected}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={transition}
          src={`data:image/jpeg;base64,${coaches[selected].coach_image}`}
          alt={coaches[selected].coach_name}
        />
        )} 
        <div className="arrows">
          <img
            src={leftArrow}
            alt=""
            onClick={() => {
              selected === 0
                ? setSelected(tLength - 1)
                : setSelected((prev) => prev - 1);
            }}
          />
          <img
            src={rightArrow}
            alt=""
            onClick={() => {
              selected === tLength - 1
                ? setSelected(0)
                : setSelected((prev) => prev + 1);
            }}
          />
        </div>
      </div>
    </div>
  )
}

export default Coaches