import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import VehiclesList from "./pages/VehiclesList";
import VehicleDetails from "./pages/VehicleDetails";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<VehiclesList />} />
        <Route path="/vehicle/:id" element={<VehicleDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
