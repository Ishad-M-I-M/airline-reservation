import axios from "axios";
import React, { useEffect, useState } from "react";
import { Form, Button, Dropdown } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";

import {errorToast, infoToast, warningToast, reload, redirect} from "./common/Toasts";

const BookingForm = (props) => {

  let unbookedEconomy = [];
  let unbookedBusiness = [];
  let unbookedPlatinum = [];

  const [seatArray, setSeatArray] = useState([]);
  const [seatNo, setSeatNo] = useState(null);
  const [passengerId, setPassengerId] = useState("");
  const [passengerName, setPassengerName] = useState("");
  const [passengerAdd, setPassengerAdd] = useState("");
  // const [curTime,setCurTime]=useState(new Date("2022-04-24T21:11:54"));
  const [bDay, setbDay] = useState(new Date("2022-04-24"));
  const [f_id, setFID] = useState(null);

  const [flight_class, setClass] = useState("");
  const navigate = useNavigate();



  function checkValidBooking() {
    axios
      .post("/checkValidBooking", {
        f_id,
        passengerId,
        seatNo,
      })
      .then(function (response) {
        if (response.data.success === true) {
          if (response.data.data === "seat_occupied") {
            infoToast("seat occupied!!");
            reload();

          } else if (response.data.data === "passenger_occupied") {
            infoToast("passenger already booked");
            reload();

          } else {
            const ticket_details = {
              f_id,
              passengerId,
              passengerName,
              passengerAdd,
              bDay,
              flight_class,
              seatNo,
            };
            axios
              .post("/reserveBooking", ticket_details)
              .then(function (response) {
                if (response.data.success) {
                  navigate("/paymentPage", { state: { f_id, seatNo, passengerId } });
            

                } else {
                  warningToast("sorry your booking cannot be reserved!");
                  redirect("/");
                }
              })
              .catch(function (error) {
                errorToast("oops an error occured!");
                console.log(error)
                // window.location.href = "/";
              });

          }
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }



  function handleChangeFClass(e) {
    console.log(props.seatDet)
    

    const EconomySeatBookings = props.seatDet.eco_booked;
    const BusinessSeatBookings = props.seatDet.busi_booked;
    const PlatinumSeatBookings = props.seatDet.plat_booked;
    setFID(props.seatDet.flight_id);

    const EconomySeats = props.seatDet.eco_seats;
    const BusinessSeats = props.seatDet.busi_seats;
    const PlatinumSeats = props.seatDet.plat_seats;
  
    

    for (let i = 1; i <= EconomySeats; i++) {
      if (!EconomySeatBookings.includes(i)) {
        unbookedEconomy.push(i);
      }
    }
    for (let i = 1 + EconomySeats; i <= BusinessSeats + EconomySeats; i++) {
      if (!BusinessSeatBookings.includes(i)) {
        unbookedBusiness.push(i);
      }
    }
    for (
      let i = 1 + EconomySeats + BusinessSeats;
      i <= EconomySeats + BusinessSeats + PlatinumSeats;
      i++
    ) {
      if (!PlatinumSeatBookings.includes(i)) {
        unbookedPlatinum.push(i);
      }
    }
    console.log(unbookedEconomy, unbookedBusiness, unbookedPlatinum);

    if (e.target.value != "0") {
      const selected = e.target.value;
      document.querySelector(".seat-select").style.pointerEvents = "auto";
      if (e.target.value == "Economy") {
        setSeatArray(unbookedEconomy);
        setSeatNo(unbookedEconomy[0]);
        setClass("Economy");
      } else if (e.target.value == "Business") {
        setSeatArray(unbookedBusiness);
        setSeatNo(unbookedBusiness[0]);
        setClass("Business");
      } else if (e.target.value == "Platinum") {
        setSeatArray(unbookedPlatinum);
        setSeatNo(unbookedPlatinum[0]);
        setClass("Platinum");
      }
    } else {
      document.querySelector(".seat-select").style.pointerEvents = "none";
    }
  };

  return (
    <div
      style={{
        background: "rgba(0, 0, 0, 0.5)",
        position: "fixed",
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 3,
        display: "none",
      }}
      className="booking-window"
      onClick={(event) => {
        if (event.currentTarget !== event.target) {
          return;
        }
        document.querySelector(".booking-window").style.display = "none";
        window.location.reload();
      }}
    >
      <Form
        style={{
          width: "400px",
          margin: "auto",
          marginTop: "5vh",
          backgroundColor: "white",
          padding: "20px",
          borderRadius: "10px",
        }}
        onClick={() => {
          document.querySelector(".booking-window").style.display = "block";
        }}
      >
        <Form.Group className="mb-3" controlId="formPassengerId">
          <Form.Label>Passenger Id</Form.Label>
          <Form.Control
            type="text"
            placeholder="2000164A"
            required
            onChange={(e) => {
              setPassengerId(e.target.value);
            }}
          />
          <Form.Text className="text-muted">Enter your passport ID</Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formPassengerName">
          <Form.Label>Passenger Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Andrew Ferdinan"
            required
            onChange={(e) => {
              setPassengerName(e.target.value);
            }}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formAddress">
          <Form.Label>Passenger Address</Form.Label>
          <Form.Control
            type="text"
            placeholder="No.12, 1st cross street,Mannar,Sri Lanka"
            required
            onChange={(e) => {
              setPassengerAdd(e.target.value);
            }}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formDOB">
        <Form.Label>Date of Birth</Form.Label>
          <Form.Control
            type="date"
            name="date_of_birth"
            required
            onChange={(e) => {
              setbDay(e.target.value);
              console.log(bDay);
            }}
          />
        </Form.Group>

        <select
          className="form-select"
          aria-label="Default select example"
          style={{ marginBottom: "20px", width: "200px" }}
          onChange={handleChangeFClass}
          required
        >
          <option selected value="0">
            Select Class
          </option>
          <option value="Economy">Economy</option>
          <option value="Business">Business</option>
          <option value="Platinum">Platinum</option>
        </select>

        <Form.Group
          className="mb-3 seat-select"
          controlId="formSeat"
          style={{ width: "100px", pointerEvents: "none" }}
        >
          <Form.Label>Seat No</Form.Label>
          <Form.Control
            as="select"
            value={seatNo}
            onChange={(e) => {
              setSeatNo(parseInt(e.target.value));
            }}
          >
            {seatArray.map((opt) => (
              <option value={opt}>{opt}</option>
            ))}
          </Form.Control>
        </Form.Group>

        <Button
          variant="primary"
          onClick={() => {
            if (
              passengerId === "" ||
              passengerName === "" ||
              passengerAdd === "" ||
              seatNo === null ||
              flight_class === undefined
            ) {
              alert("fill every details");
            } else {
              checkValidBooking();
            }
          }}
        >
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default BookingForm;
