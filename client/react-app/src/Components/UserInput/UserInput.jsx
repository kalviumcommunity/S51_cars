import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// import "./UserInput.css";

const UserInput = () => {
  const [formData, setFormData] = useState({
    Name: "", 
    Price: "", 
    model: "", 
    bodytype: "", 
    range:"",
    chargingtime:"",
    safetyfeatures:"",
    batterycapacity:"",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Sending data to the server using axios post request
      console.log(formData);
      const res = await axios.post("https://cars-5ep7.onrender.com/addev", formData);
      navigate('/');
      // Logging the response data to the console
      console.log(res.data);
    } catch (error) {
      // Handling errors
      console.error("Error during form submission:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="input-form">
      <div className="input">
        <label>
          Name:
          <input type="text" name="Name" value={formData.Name} onChange={handleChange} />
        </label>
        <br />

        <label>
          Price:
          <input type="text" name="Price" value={formData.Price} onChange={handleChange} />
        </label>
        <br />

        <label>
          Model:
          <input type="text" name="model" value={formData.model} onChange={handleChange} />
        </label>
        <br />

        <label>
          Bodytype:
          <input type="text" name="bodytype" value={formData.bodytype} onChange={handleChange} />
        </label>
        <br />

        <label>
          Range:
          <input type="text" name="range" value={formData.range} onChange={handleChange} />
        </label>
        <br />

        <label>
          Chargingtime:
          <input type="text" name="chargingtime" value={formData.chargingtime} onChange={handleChange} />
        </label>
        <br />

        <label>
          Safetyfeatures:
          <input type="text"  name="safetyfeatures" value={formData.safetyfeatures} onChange={handleChange} />
        </label>
        <br />
 
        <label>
          Batterycapacity:
          <input type="text" name="batterycapacity" value={formData.batterycapacity} onChange={handleChange} />
        </label>
        <br />

        <button id="submit" type="submit">Submit</button>
      </div>
    </form>
  );
};

export default UserInput;
