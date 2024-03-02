import { useState, useEffect } from 'react'
import './App.css'

function App() {
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

  return (
    <>
      <h1> Ev cars </h1>
      <div className="carContainer">
        {data &&
          data.map((item) => {
            return <div>
              <h1>{item.Name}</h1>
              <h1>{item.Price}</h1>
              <h1>{item.model}</h1>
              <h1>{item.bodytype}</h1>
              <h1>{item.range}</h1>
              <h1>{item.chargingtime}</h1>
              <h1>{item.safetyfeatures}</h1>
              <h1>{item.batterycapacity}</h1>
            </div>
          })
        }
      </div>
    </>
  )
}

export default App