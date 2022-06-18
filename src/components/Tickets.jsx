import axios from "axios";
import { runInAction } from "mobx";
import React, { useEffect, useState } from "react";

export default function Tickets() {
  const [arr, setArr] = useState([]);


  

  useEffect(() => {
    axios.get("/getTickets").then((response) => {

        if(response.data.success===true){
          setArr(response.data.data);}

    });
  }, []);

  return (
    <div style={{height:"100vh",backgroundColor:"#BBD2C5"}}>
    <div style={{right:"0",left:"0",marginRight:"10vw",marginLeft:"10vw"}}>
       {arr.length===0 && <h2 >No Booked Tickets</h2>}
    
      {arr.map((i) => {
        return(
          <div className="card" style={{width:"50vw",padding:"10px",marginLeft:"20%",marginTop:"20px",top:"100px"}}>
          <div className="card-body">
            <h5 className="card-title">Ticket Id : {i['ticket_id']}</h5>
            <h5 className="card-title">Fight Id : {i['flight_id']}</h5>
            <h5 className="card-title">Passenger Id : {i['passenger_id']}</h5>
            <h5 className="card-title">Seat No : {i['seat_number']}</h5>

          </div>
        </div>)
      })}
    </div>
    </div>
  );
}
