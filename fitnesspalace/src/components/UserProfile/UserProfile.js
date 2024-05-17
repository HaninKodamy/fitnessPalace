import React, { useState, useEffect } from "react";
import axios from "axios";
import "./UserProfile.css";
import backUser from "../../assets/userInfoProfile.jpg";

const UserProfile = () => {
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios
        .post("http://localhost:8000/Backend/getUserInfo.php", { token })
        .then((response) => {
          if (response.data.success) {
            setUserInfo(response.data.userInfo);
          } else {
            console.error(response.data.message);
          }
        })
        .catch((error) => {
          console.error("Error fetching user info:", error);
        });
    }
  }, []);

  const renderClassesAndPlans = () => {
    const uniqueClassesAndPlans = [];
    userInfo.forEach((item) => {
      const exists = uniqueClassesAndPlans.some(
        (uniqueItem) =>
          uniqueItem.className === item.className &&
          uniqueItem.planName === item.planName
      );
      if (!exists) {
        uniqueClassesAndPlans.push(item);
      }
    });

    return uniqueClassesAndPlans.map((item, index) => (
      <li key={index} className="class-plan-item">
        <strong className="info-subtitles">Class Name:</strong>{" "}
        <span className="user-details">{item.className}</span>
        <br />
        <strong className="info-subtitles">Plan Name:</strong>{" "}
        <span className="user-details">{item.planName}</span>
        <br />
        <strong className="info-subtitles">Expiry Date:</strong>{" "}
        <span className="user-details">{item.expiry_date}</span>
        <br />
        <strong className="info-subtitles">Cost: $</strong>{" "}
        <span className="user-details">{item.cost}</span>
        <br />
      </li>
    ));
  };

  const renderNutritionPlans = () => {
    const uniqueNutritionPlans = [];
    userInfo.forEach((item) => {
      if (
        item.nutPlanName &&
        !uniqueNutritionPlans.includes(item.nutPlanName)
      ) {
        uniqueNutritionPlans.push(item.nutPlanName);
      }
    });

    return uniqueNutritionPlans.map((item, index) => (
      <li key={index} className="nutrition-plan-item">
        <strong className="info-subtitles">Nutrition Plans Downloaded:</strong>{" "}
        <span className="user-details">{item}</span>
        <br />
      </li>
    ));
  };

  return (
    <div
      className="user-profile-container"
      style={{
        backgroundImage: `url(${backUser})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      {userInfo && (
        <div className="user-profile">
          <h2 className="userIntro">User Profile</h2>
          <div className="user-info">
            <strong className="info-subtitles">Name:</strong>{" "}
            <span className="user-details">{userInfo[0].username}</span>
            <br />
            <strong className="info-subtitles">Email:</strong>{" "}
            <span className="user-details">{userInfo[0].email}</span>
            <br />
            <strong className="info-subtitles">Date of Birth:</strong>{" "}
            <span className="user-details">{userInfo[0].dob}</span>
            <br />
          </div>
          <h2 className="info">Classes and Plans</h2>
          <ul className="classes-plans">{renderClassesAndPlans()}</ul>
          <h2 className="info">Nutrition Plans</h2>
          <ul className="nutrition-plans">{renderNutritionPlans()}</ul>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
