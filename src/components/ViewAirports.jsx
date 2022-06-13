import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'

export default function ViewAirports() {

  //fetch from database and load: GET /ariports
  const [airports, setAirports] = useState([]);
  let airportList = useRef([]);

  let handleDelete = (id_) =>{
    // request to delete : DELETE /apirports/:id
    axios.delete(`/airport/${id_}`).then(()=>{
      setAirports( [...airports].filter(({id})=> id != id_));
      alert(`Airport deleted sucessfully` );
    })
    .catch((err)=>{
      console.log(err);
    })
  }

  useEffect(()=>{
    axios.get('/airport')
    .then((res)=>{
      airportList.current = res.data.airports;
      setAirports(res.data.airports);
    })
  },[]);

  let handleChange = (e) =>{
    if(e.target.value === '') setAirports(airportList.current);
    else setAirports(airportList.current.filter(({name}) => name.toLowerCase().includes(e.target.value.toLowerCase())));
  }
  
  return (
    <div className='m-3'>
      <form>
        <label className='form-label' htmlFor='airport'>Search For Airport</label>
        <input id='airport' type="text" list='airports' className='form-control' onChange={(e)=>handleChange(e)}/>
        <datalist id="airports">
          {airports.map(({id, name}) => <option key={id}>{name}</option>)}
        </datalist>
      </form>
      <br/>
      {
        airports.map(({id, name, code, location})=>{
          return <div className='card mt-1' key={id}>
            <div className='card-header'> {location.split(",")[location.split(",").length -1]}</div>
            <div className='card-body row'>
              <div className='col-4'>{name}</div>
              <div className='col-2'>{code}</div>
              <div className='col-4'>{location}</div>
              <div className='col-2'><button onClick={()=>handleDelete(id)} className="btn btn-primary">Delete</button></div>
            </div>
          </div>
        })
      }
    </div>
  )
}
