import axios from 'axios';
import React, { useEffect, useState, useRef } from 'react'

export default function ViewAircrafts() {
  const [aircrafts, setAircrafts] = useState([
    {'aircraft_id': 1,'model': 'Boeing 737' , 'tail_number': 'JA-8089'},
    {'aircraft_id': 2,'model': 'Boeing 734' , 'tail_number': 'UA-3089'},
    {'aircraft_id': 3,'model': 'Airbus 330' , 'tail_number': 'UA-3060'},
    {'aircraft_id': 4,'model': 'Airbus 330' , 'tail_number': 'UA-3080'},
  ]);
  const aircraftList = useRef([]);

  useEffect(()=>{
    axios.get('/aircraft').then((res)=>{
      aircraftList.current = res.data.aircrafts;
      setAircrafts(res.data.aircrafts);
    })
  }, []);

  let handleDelete = (aircraft_id_) => {
    axios.delete(`/aircraft/${aircraft_id_}`).then(()=>{
      setAircrafts( [... aircrafts].filter(({aircraft_id})=> aircraft_id != aircraft_id_));
      alert(`Aircraft deleted sucessfully` );
    })
    .catch((err)=>{
      console.log(err);
    })
  }

  let handleChange = (e) => {
    if(e.target.value === '') setAircrafts(aircraftList.current);
    else setAircrafts(aircraftList.current.filter(({model})=> model.includes(e.target.value)));
  }

  return (
    <div className='m-3'>
      <form>
        <label htmlFor='search' className='form-label'>Filter by Model</label>
        <input id="search" type="text" list="airplanes" className='form-control' onChange={(e)=> handleChange(e)}/>
        <datalist id="airplanes">
          {[... new Set(aircrafts.map(({model})=> model))].map((x)=> <option key={x}>{x}</option>)}
        </datalist>
      </form>
      {aircrafts.map(({aircraft_id, model, tail_number})=>{
        return <div className='row bg-white rounded p-1 mt-1' key={aircraft_id}>
          <div className='col-3'>{tail_number}</div>
          <div className='col-6'>{model}</div>
          <div className='col-3'><button className='btn btn-primary' onClick={()=>handleDelete(aircraft_id)}>Delete</button></div>
        </div>
      })}
    </div>
  )
}
