import axios from "axios";
import { runInAction } from "mobx";
import React, { useEffect, useState } from "react";

export default function Tickets() {
  const [arr, setArr] = useState([]);

  useEffect(() => {
    axios.get("/getTickets").then((response) => {

      if (response.data.success === true) {
        setArr(response.data.data);
      }

    });
  }, []);

  return (
    <div style={{ height: "100%" ,width:"100%",backgroundColor:"#8e9099",position:"fixed",overflow:"scroll"}}>
      <div style={{ right: "0", left: "0", marginRight: "10vw", marginLeft: "10vw" }}>
        {arr.length === 0 && <h2 >No Booked Tickets</h2>}

        {arr.map((i) => {
          return (
            <div className="card" style={{ width: "40vw", padding: "10px", marginLeft: "25%", marginTop: "20px", top: "100px" }}>
              <table className="table  table-striped">
                <tbody>
                  <tr>
                    <th scope="col">Ticket Id </th>
                    <th> {i['ticket_id']}</th>
                  </tr>

                  <tr>
                    <th scope="col">Fight Id</th>
                    <th> {i['flight_id']}</th>
                  </tr>

                  <tr>
                    <th scope="col">Passenger Id</th>
                    <th> {i['passenger_id']}</th>
                  </tr>

                  <tr>
                    <th scope="col">Seat No  </th>
                    <th> {i['seat_number']}</th>
                  </tr>
                </tbody>

              </table>
            </div>)
        })}
      </div>
    </div>
  );
}
