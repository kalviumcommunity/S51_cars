import React from 'react'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
const data={
    "name": "Hyundai",
    "Price":"Rs 29 lakhs",
    "model":"Hyundai Ioniq 5 ",
    "body_type":"Crossover SUV",
    "range":"Up to 300 miles (EPA estimated range)",
    "charging_time": "Approximately 18 minutes (80% charge with 350 kW fast charger)",
    "safety_features": ["Forward Collision-Avoidance Assist", "Lane Following Assist","Lane Following Assist","etc. "],
    "battery_capacity":"58 kWh or 72.6 kWh (depending on trim)"
    
}

function component() {
  let [data, setData] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    const apiLink = "https://cars-5ep7.onrender.com/getallev";
    try {
      const fetching = await fetch(apiLink);
      const fetchData = await fetching.json();  
      setData(fetchData);
      console.log(fetchData);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    try {
        const response = await fetch(`https://cars-5ep7.onrender.com/deleteuser/${id}`, {
            method: 'DELETE'
        });
        if (response.ok) {
            const updatedData = data.filter(item => item.FoodID !== id);
            setData(updatedData);
            console.log('Food item deleted successfully');
        } else {
            console.error('Failed to delete food item');
        }
    } catch (error) {
        console.error('Error deleting food item:', error);
    }
};

  return (
    <div>
             <h1> Ev cars </h1>
             <Link to='/add'><button>ADD</button></Link>
      <div className="carContainer">
        {data &&
          data.map((item) => {
            return <div className='box'>
              <h1>Name:{item.Name}</h1>
              <h1>Price:{item.Price}</h1>
              <h1>Model:{item.model}</h1>
              <h1>Bodytype:{item.bodytype}</h1>
              <h1>Range:{item.range}</h1>
              <h1>Chargingtime:{item.chargingtime}</h1>
              <h1>Safetyfeatures:{item.safetyfeatures}</h1>
              <h1>Batterycapacity:{item.batterycapacity}</h1>
              <Link to={`/update/${item._id}`}><button>Update</button></Link>
              <button onClick={(e)=> handleDelete(item._id)}>Delete</button>
            </div>
          })
        }
      </div>
      
    </div>
  )
}

export default component
