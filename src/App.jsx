import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Homepage from "./components/Homepage";
import Donation from "./components/Donation";
import Navbar from "./components/Navbar";
import Campaigns from "./components/Campaigns";

function App() {
  return (
    <div className=" bg-primary text-secondary font-raleway">
      <Navbar />
      <Router>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/Donate" element={<Donation />} />
          <Route path="/Campaigns" element={<Campaigns />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
