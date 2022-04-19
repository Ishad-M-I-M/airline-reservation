import React, { useState } from 'react'

export default function ViewAirports() {

  //fetch from database and load: GET /ariports
  const [airports, setAirports] = useState([
    {'id': 1, 'name' : 'Bandaranayaka International Airport', 'code': 'CMB', 'location': ['Katunayaka', 'Colombo', 'Sri Lanka']},
    {'id': 2, 'name' : 'Maththala Mahinda Rajapaksha International Airport', 'code': 'MAT', 'location': ['Maththala', 'Hambamathota', 'Sri Lanka']},
    {'id': 3, 'name': 'New York International Airport', 'code': 'JFK', 'location': ['New York City', 'New York State', 'USA']},
    {'id': 4, 'name': 'Washington International Airport', 'code': 'WST', 'location': ['Washington City', 'Washington State', 'USA']},
    {'id': 5, 'name': 'Muscut International Airport', 'code': 'MCT', 'location': ['Muscut City', 'Oman']},
    {'id': 6, 'name': 'King Abdullah International Airport', 'code': 'JED', 'location': ['Jeddah City', 'KSA']},
  ]);
  let handleDelete = (id_) =>{
    // request to delete : DELETE /apirports/:id
    setAirports(airports.filter(({id})=> id != id_));
  }
  
  return (
    <div className='m-3'>
      <form>
        <label className='form-label' htmlFor='airport'>Search For Airport</label>
        <input id='airport' type="text" list='airports' className='form-control'/>
        <datalist id="airports">
          {airports.map(({id, name}) => <option key={id}>{name}</option>)}
        </datalist>
      </form>
      <br/>
      {
        airports.map(({id, name, code, location})=>{
          return <div className='card mt-1' key={id}>
            <div className='card-header'> {location[location.length -1]}</div>
            <div className='card-body row'>
              <div className='col-4'>{name}</div>
              <div className='col-2'>{code}</div>
              <div className='col-4'>{location.join(', ')}</div>
              <div className='col-2'><button onClick={()=>handleDelete(id)} className="btn btn-primary">Delete</button></div>
            </div>
          </div>
        })
      }
    </div>
  )
}
