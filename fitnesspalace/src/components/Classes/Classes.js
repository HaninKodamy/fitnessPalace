import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import tabsfirsticon from "../../assets/tabs-first-icon.png";
import class1 from "../../assets/training-image-01.jpg";
import class2 from "../../assets/360_F_345138963_4CDqQE19cTFqd8wJAoC02PAqO7YLtBxo.jpg";
import class3 from "../../assets/training-image-03.jpg";
import class4 from "../../assets/training-image-04.jpg";
import "./Classes.css";

const Classes = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("tabs-1");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState("Pro Plan");
  const [selectedClass, setSelectedClass] = useState("");
  const [registeredPlans, setRegisteredPlans] = useState([]);

  useEffect(() => {
    const plansFromLocalStorage = JSON.parse(localStorage.getItem("plans"));
    console.log(plansFromLocalStorage)
    if (plansFromLocalStorage) {
      setRegisteredPlans(plansFromLocalStorage);
    }
  }, []);

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
  };

  const openModal = (className) => {
    if(localStorage.getItem('token')){
    setSelectedClass(className);
    setIsModalOpen(true);}
    else{
      navigate('/login')
    }
  };

  const handlePlanChange = (event) => {
    setSelectedPlan(event.target.value);
  };

  const handleSubmit = () => {
    let cost = 0;
    if (selectedPlan === "Pro Plan") {
      cost = 45;
    } else if (selectedPlan === "Basic Plan") {
      cost = 25;
    } else if (selectedPlan === "Premium Plan") {
      cost = 30;
    }

    const newRegisteredPlan = {
      planName: selectedPlan,
      className: selectedClass,
      expiry_date: new Date().toISOString(), 
    };
    setRegisteredPlans([...registeredPlans, newRegisteredPlan]);

    localStorage.setItem("plans", JSON.stringify([...registeredPlans, newRegisteredPlan]));

    navigate("/payment", {
      state: {
        className: selectedClass,
        planName: selectedPlan,
        costAmount: cost,
      },
    });
    setIsModalOpen(false);
  };

  const renderModal = () => {
    if (!isModalOpen) return null;

    return (
      <div className="modal">
        <div className="modal-content">
          <h2 className="modal-heading">Choose the Plan you want</h2>
          <select
            className="select-plan"
            value={selectedPlan}
            onChange={handlePlanChange}
          >
            {["Pro Plan", "Basic Plan", "Premium Plan"].map((plan) => (
              <option key={plan} value={plan} disabled={isPlanRegistered(plan)}>
                {plan}
              </option>
            ))}
          </select>
          <div className="modal-buttons">
            <button className="btn btn-submit" onClick={handleSubmit}>
              Submit
            </button>
            <button
              className="btn btn-cancel"
              onClick={() => setIsModalOpen(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  };

  const isPlanRegistered = (planName) => {
    return registeredPlans.some(
      (plan) => plan.className === selectedClass && plan.planName === planName
    );
  };

  return (
    <section className="section" id="our-classes">
      <div
        className="programs-header"
        style={{ paddingTop: "200px", paddingBottom: "25px" }}
      >
        <span className="stroke-text">Explore our</span>
        <span>Classes</span>
      </div>
      <div className="container">
        <div className="row" id="tabs">
          <div className="col-lg-4">
            <ul>
              <li>
                <a href="#tabs-1" onClick={() => handleTabChange("tabs-1")}>
                  <img src={tabsfirsticon} alt="" />
                  Strength Training
                </a>
              </li>
              <li>
                <a href="#tabs-2" onClick={() => handleTabChange("tabs-2")}>
                  <img src={tabsfirsticon} alt="" />
                  Cardio Training
                </a>
              </li>
              <li>
                <a href="#tabs-3" onClick={() => handleTabChange("tabs-3")}>
                  <img src={tabsfirsticon} alt="" />
                  Fat Burning
                </a>
              </li>
              <li>
                <a href="#tabs-4" onClick={() => handleTabChange("tabs-4")}>
                  <img src={tabsfirsticon} alt="" />
                  Aerobics Class
                </a>
              </li>
            </ul>
          </div>
          <div className="col-lg-8">
            <section className="tabs-content">
              <article
                id="tabs-1"
                style={{ display: activeTab === "tabs-1" ? "block" : "none" }}
              >
                <img src={class1} alt="Strength Training" />
                <h4>Strength Training</h4>
                <p>
                  This class focuses on building muscle mass and increasing
                  strength through resistance exercises such as squats,
                  deadlifts, and bench presses, aiming to improve overall body
                  composition and functional strength.
                </p>
                <span>Coach: David Johnson</span>
                <div className="main-button">
                  <button
                    className="btn"
                    onClick={() => openModal("Strength Training")}
                  >
                    Join Now
                  </button>
                </div>
              </article>
              <article
                id="tabs-2"
                style={{ display: activeTab === "tabs-2" ? "block" : "none" }}
              >
                <img src={class2} alt="Second Training" />
                <h4>Cardio Training</h4>
                <p>
                  Cardio Training is designed to elevate heart rate and improve
                  cardiovascular endurance through activities like running,
                  cycling, and jumping jacks, enhancing heart health and stamina
                  while burning calories efficiently.
                </p>
                <span>Coach: Serena Thompson</span>
                <div className="main-button">
                  <button
                    className="btn"
                    onClick={() => openModal("Cardio Training")}
                  >
                    Join Now
                  </button>
                </div>
              </article>
              <article
                id="tabs-3"
                style={{ display: activeTab === "tabs-3" ? "block" : "none" }}
              >
                <img src={class3} alt="Third Class" />
                <h4>Fat Burning</h4>
                <p>
                  Fat Burning workouts incorporate high-intensity interval
                  training (HIIT) and metabolic conditioning exercises to torch
                  calories, boost metabolism, and promote fat loss, making it an
                  effective option for those seeking weight management and
                  increased energy levels.
                </p>
                <span>Coach: Michael Thompson</span>
                <div className="main-button">
                  <button
                    className="btn"
                    onClick={() => openModal("Fat Burning")}
                  >
                    Join Now
                  </button>
                </div>
              </article>
              <article
                id="tabs-4"
                style={{ display: activeTab === "tabs-4" ? "block" : "none" }}
              >
                <img src={class4} alt="Fourth Training" />
                <h4>Aerobics Class</h4>
                <p>
                  Aerobics classes offer energetic workouts with rhythmic
                  movements set to music, designed to improve cardiovascular
                  fitness and coordination while providing a fun and dynamic
                  exercise experience.
                </p>
                <span>Coach: Emily Rodriguez</span>
                <div className="main-button">
                  <button
                    className="btn"
                    onClick={() => openModal("Aerobics Class")}
                  >
                    Join Now
                  </button>
                </div>
              </article>
            </section>
          </div>
        </div>
      </div>

      {renderModal()}
    </section>
  );
};

export default Classes;