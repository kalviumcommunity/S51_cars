import React from 'react'
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
  return (
    <div>
        <h1>name={data.name}</h1>
        <h1>Price={data.Price}</h1>\
        <h1>model={data.model}</h1>
        <h1>body_type={data.body_type}</h1>
        <h1>range={data.range}</h1>
        <h1>charging_time={data.charging_time}</h1>
        <h1>safety_features={data.safety_features}</h1>
        <h1>battery_capacity={data.battery_capacity}</h1>
      
    </div>
  )
}

export default component
