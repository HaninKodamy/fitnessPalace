import React, { useState, useEffect } from "react";
import RightArrow from "../../assets/rightArrow.png";
import "./NutritionPlans.css";

const NutritionPlans = () => {
  const [registeredPlans, setRegisteredPlans] = useState([]);
  const [isProUser, setIsProUser] = useState(false);
  const [downloadedFiles, setDownloadedFiles] = useState([]);

  useEffect(() => {
    const plansFromLocalStorage = JSON.parse(localStorage.getItem("plans"));
    console.log(plansFromLocalStorage);
    if (plansFromLocalStorage) {
      setRegisteredPlans(plansFromLocalStorage);
      setIsProUser(
        plansFromLocalStorage.some((plan) => plan.planName === "Pro Plan")
      );
      const proPlanFiles = plansFromLocalStorage
        .filter((plan) => plan.planName === "Pro Plan" && plan.nutPlanName)
        .map((plan) => plan.nutPlanName);
      setDownloadedFiles(proPlanFiles);
    }
  }, []);

  const handleDownload = (nutPlanName) => {
    if (isProUser) {
      const fileUrl = `${process.env.PUBLIC_URL}/${nutPlanName.replace(
        / /g,
        ""
      )}.pdf`;
      const link = document.createElement("a");
      link.href = fileUrl;
      link.setAttribute("download", nutPlanName);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      saveDownload(nutPlanName);
    } else {
      alert("You need to be registered in a Pro Plan to download this file.");
    }
  };

  const saveDownload = (nutPlanName) => {
    fetch("http://localhost:8000/Backend/downloadFile.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        planName: "Pro Plan",
        token: localStorage.getItem("token"),
        nutPlanName: nutPlanName,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (!data.error) {
          console.log("Download saved successfully.");
          setDownloadedFiles((prevFiles) => [...prevFiles, nutPlanName]);
          updateLocalStoragePlans(nutPlanName);
        } else {
          console.error("Failed to save download:", data.message);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const updateLocalStoragePlans = (nutPlanName) => {
    const planToUpdate = registeredPlans.find(
      (plan) => plan.planName === "Pro Plan" && !plan.nutPlanName
    );
    if (planToUpdate) {
      const updatedPlans = registeredPlans.map((plan) => {
        if (plan === planToUpdate) {
          return { ...plan, nutPlanName: nutPlanName };
        } else {
          return plan;
        }
      });
      localStorage.setItem("plans", JSON.stringify(updatedPlans));
      setRegisteredPlans(updatedPlans);
    }
  };

  const availableProPlans = registeredPlans.filter(
    (plan) => plan.planName === "Pro Plan"
  );
  const remainingDownloads = availableProPlans.length - downloadedFiles.length;

  return (
    <div className="Plans" id="plans">
      <div className="programs-header">
        <span className="stroke-text">Explore our</span>
        <span>Nutrition Plans</span>
      </div>

      <div className="plans-categories">
        {[
          {
            name: "Balanced Meal Plan",
            description:
              "This plan emphasizes a well-rounded diet with a mix of carbohydrates, proteins, healthy fats, fruits, and vegetables, ensuring nutritional balance and overall health support.",
          },
          {
            name: "Low-Carb High-Protein Plan",
            description:
              "Designed to promote weight loss and muscle maintenance, this plan focuses on lean proteins, non-starchy vegetables, and healthy fats while limiting carbohydrate intake for improved metabolic health.",
          },
          {
            name: "Plant-Based Whole Foods Plan",
            description:
              "A plant-centric approach featuring whole grains, legumes, fruits, vegetables, nuts, and seeds, this plan is rich in fiber, antioxidants, and essential nutrients, supporting heart health and sustainable eating habits.",
          },
        ].map((nut) => (
          <div key={nut.name} className="Nutplans">
            <span>{nut.name}</span>
            <span>{nut.description}</span>
            <button
              onClick={() => handleDownload(nut.name)}
              className="upload-now"
              disabled={isProUser && remainingDownloads <= 0}
            >
              <span>Download</span>
              <img
                src={RightArrow}
                alt=""
                style={{ paddingLeft: "5px", width: "1.2rem" }}
              />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NutritionPlans;
