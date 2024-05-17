import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./Payment.css";

const Payment = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { className, planName, costAmount } = location.state || {
    className: "N/A",
    planName: "N/A",
    costAmount: "N/A",
  };

  const [formData, setFormData] = useState({
    cardNumber: "",
    cardholder: "",
    month: "00",
    year: "00",
    cvc: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let start_date = new Date().toISOString().split("T")[0];
    const { cardNumber, cardholder, month, year, cvc } = formData;

    if (cardNumber && cardholder && month !== "00" && year !== "00" && cvc) {
      const token = localStorage.getItem("token");
      console.log("token", token);
      try {
        const response = await fetch(
          "http://localhost:8000/Backend/subscribePlan.php",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              className,
              planName,
              cost: costAmount,
              start_date,
              token,
            }),
          }
        );
        console.log(response);
        if (response.ok) {
          navigate("/");
        } else {
          console.log("Error sending payment and enrollment details");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    } else {
      console.log("Please fill all the required fields correctly");
    }
  };

  return (
    <div id="page-wrapper">
      <div id="wrapper">
        <div id="container">
        <div id="info">
            <div className="info-div">
              <div className="centered-content">
                <h3 className="stroke-text">Class:{className}</h3>
                <h3 className="stroke-text">Plan: {planName}</h3>
                <div id="price">
                  <h3 className="stroke-text">Cost: ${costAmount}</h3>
                </div>
              </div>
            </div>
          </div>
          <div id="payment">
            <form id="checkout" onSubmit={handleSubmit}>
              <input
                className="card"
                id="visa"
                type="button"
                name="card"
                value=""
              />
              <input
                className="card"
                id="mastercard"
                type="button"
                name="card"
                value=""
              />
              <label htmlFor="cardnumber">Credit Card Number</label>
              <input
                id="cardnumber"
                type="text"
                name="cardNumber"
                value={formData.cardNumber}
                onChange={handleChange}
                pattern="[0-9]{13,16}"
                required
                placeholder="0123-4567-8901-2345"
              />
              <label htmlFor="cardholder">Card Holder</label>
              <input
                id="cardholder"
                type="text"
                name="cardholder"
                value={formData.cardholder}
                onChange={handleChange}
                required
                maxLength="50"
                placeholder="Cardholder"
              />
              <div id="expiry-cvc">
                <div>
                  <label for="month">Expiration Date</label>
                  <select
                    name="month"
                    id="month"
                    onChange={handleChange}
                    value={formData.month}
                    size="1"
                  >
                    <option value="00" disabled>
                      MM
                    </option>
                    <option value="01">01</option>
                    <option value="02">02</option>
                    <option value="03">03</option>
                    <option value="04">04</option>
                    <option value="05">05</option>
                    <option value="06">06</option>
                    <option value="07">07</option>
                    <option value="08">08</option>
                    <option value="09">09</option>
                    <option value="10">10</option>
                    <option value="11">11</option>
                    <option value="12">12</option>
                  </select>
                  <p>/</p>
                  <select
                    name="year"
                    id="year"
                    onChange={handleChange}
                    value={formData.year}
                    size="1"
                  >
                    <option value="00" disabled>
                      YY
                    </option>
                    <option value="01">16</option>
                    <option value="02">17</option>
                    <option value="03">18</option>
                    <option value="04">19</option>
                    <option value="05">20</option>
                    <option value="06">21</option>
                    <option value="07">22</option>
                    <option value="08">23</option>
                    <option value="09">24</option>
                    <option value="10">25</option>
                  </select>
                </div>
                <br />
                <div>
                  <label htmlFor="cvc" id="cvc-label">
                    CVC/CVV
                  </label>
                  <input
                    id="cvc"
                    type="text"
                    name="cvc"
                    value={formData.cvc}
                    onChange={handleChange}
                    placeholder="Cvc/Cvv"
                    maxLength="3"
                  />
                </div>
              </div>
              <input
                className="purchase"
                type="submit"
                name="purchase"
                value="Purchase"
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
