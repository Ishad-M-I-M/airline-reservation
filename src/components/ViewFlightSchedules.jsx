import axios from "axios";
import React, { useEffect, useState } from "react";
import {infoToast, reload} from "./common/Toasts";

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
          infoToast("Specific Flight Schedule is successfully made unavailable.");
          reload();
        } )
        .catch((e)=> console.error(e));
      })
      .catch((e)=>{
        console.error(e);
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

      <div>
        <div className="row bg-white rounded p-1 mt-1"> 
          <div className="col-md-1 text-center align-middle fw-bold fs-7"> Tail No. </div>
          <div className="col-md-2 text-center align-middle fw-bold fs-7"> Aircraft Model </div>
          <div className="col-md-1 text-center align-middle fw-bold fs-7"> Origin </div>
          <div className="col-md-1 text-center align-middle fw-bold fs-7"> Destination </div>
          <div className="col-md-3 text-center align-middle fw-bold fs-7"> Takeoff Time </div>
          <div className="col-md-3 text-center align-middle fw-bold fs-7"> Departure Time </div>
        </div>
      </div>

      <div>
        {schedules.map(({id, flight_id, tail_number, model, origin, destination, takeoff_time, departure_time}) =>{
            if ((endStations['tail_number'] === null || tail_number === endStations['tail_number']) && (endStations['model'] === null || model === endStations['model']) && (endStations['origin'] === null || origin === endStations['origin']) && (endStations['destination'] === null || destination === endStations['destination']) && (endStations['takeoff_time'] === null || takeoff_time === endStations['takeoff_time']) && (endStations['departure_time'] === null || departure_time === endStations['departure_time']) ){
              return <div className="row bg-white rounded p-1 mt-1" key={id}> 
                      <div className="col-md-1 text-center align-middle">{tail_number} </div>
                      <div className="col-md-2 text-center align-middle">{model} </div>
                      <div className="col-md-1 text-center align-middle">{origin} </div>
                      <div className="col-md-1 text-center align-middle">{destination} </div>
                      <div className="col-md-3 text-center align-middle">{(new Date(takeoff_time)).toLocaleString()} </div>
                      <div className="col-md-3 text-center align-middle">{(new Date(departure_time)).toLocaleString()} </div>
                      <div className="col-md-1 text-center align-middle"><button className="btn btn-primary" onClick={()=>handleDelete(flight_id)}>Delete</button></div>
                      </div>
            }
            else return null;
        }   
        )}
          
      </div>
    </div>
  );
}
