import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';

import '../App.css';
import AddFlights from './AddFlights';
import ViewFlights from './ViewFlights';
import AddBooking from './AddBooking';
import PaymentPortal from './PaymentPortal';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import NotFound from "./NotFound";

export default function Container() {
    return (
        <div className='container bg-white bg-opacity-50 row p-2 mt-5'>
            <div className="sidebar col-md-2">
                <a href='/add-flight' className="btn btn-primary rounded-pill sidebar-btn mb-1">Add Flights</a>
                <a href='/view-flight' className="btn btn-primary rounded-pill sidebar-btn mb-1">View Flight Detail</a>
                <a href='/add-booking' className="btn btn-primary rounded-pill sidebar-btn mb-1">Booking</a>
            </div>
            <div className="col-md-10 bg-secondary bg-opacity-25 overflow-auto" id='content'
                 style={{'maxHeight': '88vh'}}>
                <BrowserRouter>
                    <Routes>
                        <Route index element={<h3 className='text-center mt-5'> Select an option</h3>}></Route>
                        <Route path='/add-flight' element={<AddFlights/>}/>
                        <Route path='/view-flight' element={<ViewFlights/>}/>
                        <Route path='/add-booking' element={<AddBooking/>}/>
                        <Route path='/paymentportal' element={<PaymentPortal/>}/>
                        <Route path='/*' element={<NotFound/>}/>
                    </Routes>
                </BrowserRouter>

            </div>
        </div>
    )
}