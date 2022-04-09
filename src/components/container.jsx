import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';

import '../App.css';
import AddFlights from './addFlights';
import ViewFlights from './viewFlights';

export default function Container() {
    let [state, setState] = useState(1);
    const handleClick = (arg) => {
        setState(arg);
    }

    return (
        <div className='container bg-white bg-opacity-50 row p-2 '>
            <div className="sidebar col-md-2">
                <button type="button" className="btn btn-primary rounded-pill sidebar-btn" onClick={() => handleClick(0)}>View Flights</button>
                <button type="button" className="btn btn-primary rounded-pill sidebar-btn" onClick={() => handleClick(1)}>Add Flights </button>
            </div>
            <div className="col-md-10 bg-secondary bg-opacity-25" id='content'>
                {state === 0 && <ViewFlights />}
                {state === 1 && <AddFlights />}
            </div>
        </div>
    )
}