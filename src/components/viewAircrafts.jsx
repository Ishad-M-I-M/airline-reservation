import React, { useState } from 'react'

export default function ViewAircrafts() {
  const [aircrafts, setAircrafts] = useState([
    {'id': 1, 'model': 'Boeing 737' , 'tailNumber': 'JA-8089'},
    {'id': 2, 'model': 'Boeing 734' , 'tailNumber': 'UA-3089'},
    {'id': 3, 'model': 'Airbus 330' , 'tailNumber': 'UA-3060'},
    {'id': 4, 'model': 'Airbus 330' , 'tailNumber': 'UA-3080'},
  ]);
  return (
    <div className='m-3'>
      <form>
        <label htmlFor='search' className='form-label'>Filter by Model</label>
        <input id="search" type="text" list="airplanes" className='form-control'/>
        <datalist id="airplanes">
          {[... new Set(aircrafts.map(({model})=> model))].map((x)=> <option key={x}>{x}</option>)}
        </datalist>
      </form>
      {/* {aircrafts.map(({id,model, tailNumber})=>{
        <div className='row'>
          <div></div>
        </div>
      })} */}
    </div>
  )
}
