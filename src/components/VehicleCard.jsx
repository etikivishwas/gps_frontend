import React from "react";
import { useLocation } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

import "leaflet/dist/leaflet.css";

const VehicleDetails = () => {
  const { state: vehicle } = useLocation();

  if (!vehicle) return <h2>No vehicle data</h2>;

  const lat = vehicle.latitude;
  const lng = vehicle.longitude;

  return (
    <div style={{ padding: "20px" }}>
      <h1>Vehicle Details – {vehicle.vehicleNo}</h1>

      <div style={{ marginBottom: "20px" }}>
        <p><strong>Speed:</strong> {vehicle.speed}</p>
        <p><strong>Latitude:</strong> {lat}</p>
        <p><strong>Longitude:</strong> {lng}</p>
        <p><strong>Ignition:</strong> {vehicle.ignition ? "ON" : "OFF"}</p>
        <p><strong>IMEI:</strong> {vehicle.imei}</p>
        <p><strong>Status:</strong> {vehicle.vehicleStatus}</p>
      </div>

      <MapContainer center={[lat, lng]} zoom={14} style={{ height: "400px", width: "100%" }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        <Marker position={[lat, lng]}>
          <Popup>{vehicle.vehicleNo}</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default VehicleDetails;
