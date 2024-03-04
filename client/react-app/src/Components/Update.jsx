import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import axios from 'axios';


export default function UpdateData() {
    const { id } = useParams(); // Adjust here
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [model, setModel] = useState('');
    const [bodyType, setBodyType] = useState('');
    const [range, setRange] = useState('');
    const [chargingTime, setChargingTime] = useState('');
    const [safetyFeatures, setSafetyFeatures] = useState('');
    const [batteryCapacity, setBatteryCapacity] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.patch(`https://cars-5ep7.onrender.com/updateuser/${id}`, {  
                Name: name, 
                Price: price, 
                model: model, 
                bodytype: bodyType, 
                range: range, 
                chargingtime: chargingTime, 
                safetyfeatures: safetyFeatures, 
                batterycapacity: batteryCapacity 
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (response.status === 200) {
                console.log('Updated Product:', response.data);
                navigate('/');
            } else {
                console.error('Update failed:', response.data.error);
            }
        } catch (error) {
            console.error('Error updating product:', error);
        }
    };
return (
        <>
            <h2>Update Data</h2>
            <div className="form-container">
                <form className='form' onSubmit={handleSubmit}>
                    <div className='div'>
                        <label htmlFor="Name">Name</label>
                        <input type="text" id="Name" name="Name" value={name} onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div className='div'>
                        <label htmlFor="Price">Price</label>
                        <input type="text" id="Price" name="Price" value={price} onChange={(e) => setPrice(e.target.value)} />
                    </div>
                    <div className='div'>
                        <label htmlFor="Model">Model</label>
                        <input type="text" id="Model" name="Model" value={model} onChange={(e) => setModel(e.target.value)} />
                    </div>
                    <div className='div'>
                        <label htmlFor="BodyType">Body Type</label>
                        <input type="text" id="BodyType" name="BodyType" value={bodyType} onChange={(e) => setBodyType(e.target.value)} />
                    </div>
                    <div className='div'>
                        <label htmlFor="Range">Range</label>
                        <input type="text" id="Range" name="Range" value={range} onChange={(e) => setRange(e.target.value)} />
                    </div>
                    <div className='div'>
                        <label htmlFor="ChargingTime">Charging Time</label>
                        <input type="text" id="ChargingTime" name="ChargingTime" value={chargingTime} onChange={(e) => setChargingTime(e.target.value)} />
                    </div>
                    <div className='div'>
                        <label htmlFor="SafetyFeatures">Safety Features</label>
                        <input type="text" id="SafetyFeatures" name="SafetyFeatures" value={safetyFeatures} onChange={(e) => setSafetyFeatures(e.target.value)} />
                    </div>
                    <div className='div'>
                        <label htmlFor="BatteryCapacity">Battery Capacity</label>
                        <input type="text" id="BatteryCapacity" name="BatteryCapacity" value={batteryCapacity} onChange={(e) => setBatteryCapacity(e.target.value)} />
                    </div>
                    <input type="submit" className='submit' value="Submit" />
                </form>
            </div>
        </>
    );
}
