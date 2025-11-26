import React from "react";
import { useNavigate } from "react-router-dom";

const VehicleCard = ({ vehicle }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/vehicle/${vehicle.vehicleNo}`, { state: vehicle })}
      style={{
        border: "1px solid #ccc",
        padding: "20px",
        width: "280px",
        borderRadius: "10px",
        cursor: "pointer",
        background: "#f8f9fa",
      }}
    >
      <h3>{vehicle.vehicleNo}</h3>

      <p><strong>Speed:</strong> {vehicle.speed} km/h</p>
      <p><strong>Latitude:</strong> {vehicle.latitude}</p>
      <p><strong>Longitude:</strong> {vehicle.longitude}</p>
      <p><strong>Ignition:</strong> {vehicle.ignition ? "ON" : "OFF"}</p>
    </div>
  );
};

export default VehicleCard;
