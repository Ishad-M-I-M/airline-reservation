import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';

import '../App.css';
import AddFlights from './addFlights';
import ViewFlights from './viewFlights';
import ViewRoutes from './viewRoutes';
import ViewAircrafts from './viewAircrafts';
import ViewAirports from './viewAirports';

export default function Container() {
    let [state, setState] = useState(0);
    const handleClick = (arg) => {
        setState(arg);
    }

    return (
        <div className='container bg-white bg-opacity-50 row p-2 mt-5'>
            <div className="sidebar col-md-2">
                <button type="button" className="btn btn-primary rounded-pill sidebar-btn mb-1" onClick={() => handleClick(0)}>View Routes</button>
                <button type="button" className="btn btn-primary rounded-pill sidebar-btn mb-1" onClick={() => handleClick(1)}>View Aircrafts</button>
                <button type="button" className="btn btn-primary rounded-pill sidebar-btn mb-1" onClick={() => handleClick(2)}>View Airports</button>
            </div>
            <div className="col-md-10 bg-secondary bg-opacity-25" id='content'>
                {state === 0 && <ViewRoutes />}
                {state === 1 && <ViewAircrafts/>}
                {state ===2 && <ViewAirports/>}
            </div>
        </div>
    )
}