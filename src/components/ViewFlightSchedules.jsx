import axios from "axios";
import React, { useEffect, useState } from "react";
import {errorToast, infoToast, reload, successToast} from "./common/Toasts";
import Table from "./common/Table";

export default function ViewFlightSchedules() { 

  //fetched from backend:
  const [schedules, setSchedules] = useState([]);

    useEffect(()=>{
      axios.get('/flightSchedule')
      .then((res)=>{
        console.log(res.data.data);
        setSchedules(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      })
    }, []);


    const flightschedules = [];
    for(let schedule of schedules){
        if ( flightschedules.indexOf(schedule['flight_id']) === -1) flightschedules.push(schedule['flight_id']);
        if ( flightschedules.indexOf(schedule['tail_number']) === -1) flightschedules.push(schedule['tail_number']);
        if ( flightschedules.indexOf(schedule['model']) === -1) flightschedules.push(schedule['model']);
        if ( flightschedules.indexOf(schedule['origin']) === -1) flightschedules.push(schedule['origin']);
        if ( flightschedules.indexOf(schedule['destination']) === -1) flightschedules.push(schedule['destination']);
        if ( flightschedules.indexOf(schedule['takeoff_time']) === -1) flightschedules.push(schedule['takeoff_time']);
        if ( flightschedules.indexOf(schedule['departure_time']) === -1) flightschedules.push(schedule['departure_time']);
    }
  
    const [endStations, setEndStations] = useState({'flight_id': null, 'tail_number': null, 'model': null, 'origin': null, 'destination': null, 'takeoff_time': null, 'departure_time': null});

    let handleChange = (endStation, value) =>{
      let endStations_ = {...endStations};
      endStations_[endStation] = value? value: null;
      setEndStations(endStations_);
    }

    let handleDelete =(id_) => {
      // rest API request to delete:
      fetch(`/flightSchedule/${id_}`,{
        method: 'DELETE',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            }
      })
      .then((res)=>{
        res.json()
        .then((result)=> {
          successToast("Flight Schedule is successfully made unavailable.");
          reload();
        } )
        .catch((e)=> console.error(e));
      })
      .catch((e)=>{
        console.error(e);
        errorToast("Error in deleting flight schedule.");
      })
      
    }

  return (
    <div className="m-3">
      <form>
        <div className="row align-items-center mb-2">
        <datalist id = "flightschedules" defaultValue="">
                      {flightschedules.map(sch => 
                          <option key={sch}>{sch}</option>
                      )}
        </datalist>
          <div className="col-md-3 text-center align-middle fw-bold fs-7">
              <label htmlFor="tail_number" className="form-label"> Tail Number </label>
              <input id="tail_number" className="form-control" onChange={(e) => handleChange('tail_number', e.target.value)} list="flightschedules"/>       
          </div>

          <div className="col-md-3 text-center align-middle fw-bold fs-7">
              <label htmlFor="model" className="form-label"> Aircraft Model </label>
              <input id="model" className="form-control" onChange={(e) => handleChange('model', e.target.value)} list="flightschedules"/>       
          </div>

          <div className="col-md-3 text-center align-middle fw-bold fs-7">
              <label htmlFor="origin" className="form-label"> Origin </label>
              <input id="origin" className="form-control" onChange={(e) => handleChange('origin', e.target.value)} list="flightschedules"/>
          </div>

          <div className="col-md-3 text-center align-middle fw-bold fs-7">
              <label htmlFor="destination" className="form-label"> Destination </label>
              <input id="destination" className="form-control" onChange={(e)=> handleChange('destination', e.target.value)} list="flightschedules"/>                  
          </div>
        </div>
      </form>

        <Table tableHeadings={{'id': '#', 'tail_number': 'Tail #', 'model': 'Aircraft Model', 'origin': 'Origin','destination': 'Destination', 'takeoff_time': 'Takeoff Time', 'departure_time': 'Departure Time'}} tableData={schedules} id={'id'} deleteHandler={handleDelete}/>
    </div>
  );
}
