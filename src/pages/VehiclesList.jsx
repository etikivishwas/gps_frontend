import React, { useEffect, useState } from "react";
import axios from "axios";

const API_BASE_URL = "http://localhost:5000";

const VehiclesList = () => {
  const [vehicles, setVehicles] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/vehicles/location/data`)
      .then((res) => {
        console.log("API Response:", res.data);
        setVehicles(res.data.data); // store array
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <h2>Loading...</h2>;

  return (
    <div style={{ padding: "20px" }}>
      <h1>Vehicles Data (Raw)</h1>

      <pre style={{ background: "#eee", padding: "20px" }}>
        {JSON.stringify(vehicles, null, 2)}
      </pre>
    </div>
  );
};

export default VehiclesList;
