import React, { useState } from 'react';

export default function AddFlights() {
  const [model, setModel] = useState(-1);

  const origins = [{id: 0, code : "CMB"}, {id: 1, code : "NYK"}, {id: 2, code : "LND"}]; // to be loaded from database
  const destinations = [{id: 0, code : "CMB"}, {id: 1, code : "NYK"}, {id: 2, code : "LND"}, {id: 3, code: "SNG"}]; // to be loaded from database according to origin selection

  const airplaneIDs = {
    0:['Boeing 737 - I', 'Boeing 737 - II', 'Boeing 737 - III'],
    1:['Boeing 757 - I', 'Boeing 757 - II', 'Boeing 757 - III', 'Boeing 757 - IV' ],
    2:['Airbus A380 - I']
  } // to be loaded from database

  const loadAirplaneIDs = e => {
    console.log(e.target.value);
    setModel(e.target.value);
  }
  return (
    <div>
      <h2 className='text-center mt-1'>Add a Flight</h2>
      <form>
        <div className='mb-3'>
          <div className='row'>
            <div className='col-md-6'>
              <label htmlFor="origin" className='form-label'>Origin</label>
              <select defaultValue={-1} id = 'origin' className='form-control'>
                <option value={-1} disabled selected> --select-- </option>
                {origins.map(({id,code}) => <option key={id}>{code}</option>)}
              </select>
            </div>

            <div className='col-md-6'>
              <label htmlFor='destination' className='form-label'>Destination</label>
              <select defaultValue={-1} id = 'destination' className='form-control'>
                <option value={-1} disabled selected> --select-- </option>
                {destinations.map(({id,code}) => <option key={id}>{code}</option>)}
              </select>
            </div>
          </div>
        </div>

        <div className='mb-3'>
          <div className='row'>
            <div className='col-md-6'>
              <label htmlFor='airplane-model' className='form-label'>Select Airplane Model</label>
              <select defaultValue={-1} id = 'airplane-model' className='form-control' onChange={(e)=>loadAirplaneIDs(e)}>
                <option value={-1} disabled selected> --select-- </option>
                <option value= {0}>Boeing 737</option>
                <option value= {1}>Boeing 757</option>
                <option value= {2}>Airbus A380</option>
              </select>
            </div>
            <div className='col-md-6'>
              <label htmlFor='airplane-id' className='form-label'> Airplane ID</label>
              <select defaultValue={-1} id = 'airplane-id' className='form-control'>
                <option value={-1} disabled selected> --select-- </option>
                {model != -1 && airplaneIDs[model].map((e) => <option key={e}>{e}</option>) }
              </select>
            </div>
          </div>
        </div>

        <div className='mb-3'>
          <div className='row'>
            <div className='col-md-6'>
              <label htmlFor='date' className='form-label'>Date</label>
              <input id='date' className='form-control me-2' type='date' />
            </div>

            <div className='col-md-6'>
              <label htmlFor='time' className='form-label'>Time</label>
              <input id='time' className='form-control me-2' type='time' />
            </div>
          </div>
        </div>

        <div className='mb-3'>
          <label htmlFor='remarks' className='form-label'>Remarks</label>
          <input id='remarks' className='form-control me-2' type='text' />
        </div>

      </form>
    </div>
  )
}
