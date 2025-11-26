import React, { useEffect, useState } from "react";
import axios from "axios";

const API_BASE_URL = "http://localhost:5050";
const STORAGE_KEY = "vehiclesData";
const REFRESH_INTERVAL_MS = 65000;

const VehiclesList = () => {
  const [vehicles, setVehicles] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load any cached data from localStorage immediately.
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return;

    try {
      const parsed = JSON.parse(stored);
      setVehicles(parsed);
      setLoading(false);
    } catch (error) {
      console.error("Failed to parse stored vehicles data", error);
      localStorage.removeItem(STORAGE_KEY);
    }
  }, []);

  useEffect(() => {
    let isMounted = true;

    const fetchVehicles = async () => {
      try {
        const res = await axios.get(
          `${API_BASE_URL}/api/tracking/vehicles/location/data`
        );
        const payload = res?.data?.data ?? [];

        if (!isMounted) return;
        setVehicles(payload);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
      } catch (error) {
        console.error("Failed to fetch vehicles", error);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchVehicles();
    const intervalId = setInterval(fetchVehicles, REFRESH_INTERVAL_MS);

    return () => {
      isMounted = false;
      clearInterval(intervalId);
    };
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
