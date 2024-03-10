import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Component() {
  const [data, setData] = useState(null);
  const [creators, setCreators] = useState([]);
  const [selectedCreator, setSelectedCreator] = useState('');
  const [isLoggedIn,setIsLoggedIn] = useState(false)

  useEffect(() => {
    fetchData();
    checkLoginStatus();
  }, []);

  useEffect(() => {
    extractCreators();
  }, [data]);

  const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
};

  const checkLoginStatus = () => {
    const token = getCookie('token');
    setIsLoggedIn(!!token);
};
const handleLogout = () => {
  document.cookie = 'token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
  setIsLoggedIn(false);
  window.location.reload();
};

  const fetchData = async () => {
    const apiLink = "https://cars-5ep7.onrender.com/getallev";
    try {
      const response = await fetch(apiLink);
      const fetchData = await response.json();
      setData(fetchData);
    } catch (err) {
      console.error(err);
    }
  };

  const extractCreators = () => {
    if (data) {
      const uniqueCreators = [...new Set(data.map(item => item.createdby))];
      setCreators(uniqueCreators);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`https://cars-5ep7.onrender.com/deleteuser/${id}`, {
        method: 'DELETE'
      });
      if (response.ok) {
        const updatedData = data.filter(item => item._id !== id);
        setData(updatedData);
        console.log('Car deleted successfully');
      } else {
        console.error('Failed to delete car');
      }
    } catch (error) {
      console.error('Error deleting car:', error);
    }
  };

  const handleCreatorChange = (event) => {
    setSelectedCreator(event.target.value);
  };

  const filteredData = selectedCreator ? data.filter(item => item.createdby === selectedCreator) : data;

  return (
    <div>
      <h1>Ev cars</h1>
      <Link to='/add'><button>ADD</button></Link>
      {isLoggedIn ? (
                    <button className="logout" onClick={handleLogout}>LOGOUT</button>
                ) : (
                    <Link to='/login'><button className="login">LOGIN</button></Link>
                )}
      <div>
        <label htmlFor="creator">Filter by Creator:</label>
        <select id="creator" value={selectedCreator} onChange={handleCreatorChange}>
          <option value="">All</option>
          {creators.map(creator => (
            <option key={creator} value={creator}>{creator}</option>
          ))}
        </select>
      </div>
      <div className="carContainer">
        {filteredData &&
          filteredData.map((item) => (
            <div className='box' key={item._id}>
              <h1>Name:{item.Name}</h1>
              <h1>Price:{item.Price}</h1>
              <h1>Model:{item.model}</h1>
              <h1>Bodytype:{item.bodytype}</h1>
              <h1>Range:{item.range}</h1>
              <h1>Chargingtime:{item.chargingtime}</h1>
              <h1>Safetyfeatures:{Array.isArray(item.safetyfeatures) ? item.safetyfeatures.join(', ') : 'N/A'}</h1>
              <h1>Batterycapacity:{item.batterycapacity}</h1>
              <h1>Creator:{item.createdby}</h1>
              <Link to={`/update/${item._id}`}><button>Update</button></Link>
              <button onClick={(e) => handleDelete(item._id)}>Delete</button>
            </div>
          ))}
      </div>
    </div>
  );
}

export default Component;
