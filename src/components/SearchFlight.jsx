import React, { useContext, useState, useEffect } from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  Navigate,
  useNavigate,
} from "react-router-dom";

import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import axios from "axios";

function SearchFlight() {
  const [count, setCount] = useState(1);
  const [depDate, setDepDate] = useState(new Date("2022-07-09T21:11:54"));
  const [retDate, setRetDate] = useState(new Date("2022-07-09T21:11:54"));
  const [airports, setAirports] = useState([]);
  const [depAirCode,setDepAirCode]=useState("");
  const [desAirCode,setDesAirCode]=useState("");
  const [checkBox,setCheckBox]=useState(0);


  const navigate = useNavigate();


  const handleChangeDepDate = (newValue) => {
    setDepDate(newValue);
  };

  const handleChangeRetDate = (newValue) => {
    setRetDate(newValue);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const searchFields = {
      checkBox,
      count,
      depDate,
      retDate,
      depAirCode,
      desAirCode,
    };
    console.log(searchFields)


    // const response = await fetch("/search-result", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   mode: "cors",
    //   cache: "default",
    //   body: JSON.stringify(searchFields),
    // });

    // const flights_result = await response.json();
    
    axios.post("/search-result",searchFields).then(
    
      function(response){
        if(response.data.success){
          const flights_result=response.data.data;
          const return_flights_result=response.data.return_data;
          const data={
            checkBox,
            return_flights_result,
            flights_result,
            depAirCode,
            desAirCode
          }
          
          navigate("/searchResult", { state: data });
          
        }
      }
    )
        .catch(function(error){
            console.log(error);
        })

    
  };

  useEffect(() => {
    document.querySelector(".noReturnCheckBox").setAttribute("checked",true);

    axios
      .get("/airport")
      .then((res) => {
        setAirports(res.data.airports);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <form onSubmit={handleSubmit} className="search-box">
        <div className="radio-btn">
          <input
            type="radio"
            className="btn returnCheckBox"
            name="check"
            
            onClick={() => {
              setCheckBox(1)
              
              
            }}
          />
          <span>Return</span>
          <input
            type="radio"
            className="btn noReturnCheckBox"
            name="check"
            
            onClick={() => {
              setCheckBox(0)
            }}
          />
          <span>One-Way</span>
        </div>

        <div className="booking-form">
          <div className="row">
            <div className="col">
              <div className="loc">
                <i className="bi bi-geo-alt-fill  icon"></i>
                <select
                  required
                  className="mdb-select md-form"
                  searchable="Search here.."
                  style={{ height: "40px", width: "300px" }}
                  onChange={(e) => {
                    setDepAirCode(e.target.value)
                  }}
                >
                  <option value="" disabled selected>
                    Choose Departing Airport
                  </option>
                  {airports.map((i) => (
                    <option value={i["code"]}>
                      {i["code"] + " : " + i["name"]}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="col">
              <div className="loc">
                <i className="bi bi-geo-alt-fill  icon"></i>
                <select
                  required
                  className="mdb-select md-form"
                  searchable="Search here.."
                  style={{ height: "40px", width: "300px" }}
                  onChange={(e) => {
                    setDesAirCode(e.target.value)
                  }}
                >
                  <option value="" disabled selected>
                    Choose Destination Airport
                  </option>
                  {airports.map((i) => (
                    <option value={i["code"]}>
                      {i["code"] + " : " + i["name"]}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <div className="loc">
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <Stack spacing={3}>
                    <DesktopDatePicker
                      required
                      label="Departing Date"
                      inputFormat="MM/dd/yyyy"
                      value={depDate}
                      onChange={handleChangeDepDate}
                      renderInput={(params) => <TextField {...params} />}
                    />
                  </Stack>
                </LocalizationProvider>
              </div>
            </div>

            <div className="col returnDatePick" style={{display:`${checkBox===0?'none':'block'}`}}>
              <div className="loc ">
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <Stack spacing={3}>
                    <DesktopDatePicker
                      label="Returning Date"
                      inputFormat="MM/dd/yyyy"
                      value={retDate}
                      onChange={handleChangeRetDate}
                      renderInput={(params) => <TextField {...params} />}
                    />
                  </Stack>
                </LocalizationProvider>
              </div>
            </div>

            <div className="col count loc">
              <label>Passenger</label>
              <div className="loc">
                <i className="bi bi-people-fill icon"></i>
                <input
                  type="number"
                  min={1}
                  step={1}
                  max={10}
                  defaultValue={1}
                  className="form-control"
                  id="input1"
                  placeholder="how many"
                  value={count}
                  onChange={(e) => setCount(e.target.value)}
                />
              </div>
            </div>
          </div>
          <input
            type="submit"
            className="custom-btn btn-1"
            value="Search for Flights"
          />
        </div>
      </form>
    </div>
  );
}

export default SearchFlight;
