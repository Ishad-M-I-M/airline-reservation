import React from "react";
import "../css/ChooseFlights.css";
import { useLocation } from "react-router-dom";


import FlightCard from "./FlightCard";



export default function ChooseFlights() {
  const location = useLocation();


  return (
    <div className="choose-flights">
      <div className="scenary" />
      <div className="header">
        <h1>Choose Flights</h1>
      </div>
      <div className="outer-bg">
      <div className="container card-container" style={{display:"flex",flexDirection:"row",justifyContent:"space-around"}}>
     
        <div className="dep-cards" style={{marginTop:"10vh"}}>
          

          <FlightCard  />

          
          
        </div>
        
        
      </div>
      </div>
      <div className="footer" />
    </div>
  );
}
