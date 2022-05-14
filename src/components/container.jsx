import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import '../App.css';
import AddFlights from './addFlights';
import ViewFlights from './viewFlights';
import ViewRoutes from './viewRoutes';
import ViewAircrafts from './viewAircrafts';
import ViewAirports from './viewAirports';
import NotFound from './NotFound';
import AddAirports from './AddAirports';

export default function Container() {

    return (
        <div className='container bg-white bg-opacity-50 row p-2 mt-5'>
            <div className="sidebar col-md-2">
                <a href='/view-routes'><button type="button" className="btn btn-primary rounded-pill sidebar-btn mb-1" >View Routes</button></a>
                <a href='/view-aircrafts'><button type="button" className="btn btn-primary rounded-pill sidebar-btn mb-1" >View Aircrafts</button></a>
                <a href='/view-airports'><button type="button" className="btn btn-primary rounded-pill sidebar-btn mb-1" >View Airports</button></a>
                <a href='/add-airports'><button type="button" className="btn btn-primary rounded-pill sidebar-btn mb-1" >Add Airports</button></a>
            </div>
            <div className="col-md-10 bg-secondary bg-opacity-25 overflow-auto" id='content' style={{'maxHeight': '88vh' }}>
                <BrowserRouter>
                    <Routes>
                        <Route index element={<h3 className='text-center'> Select an option</h3>}></Route>
                        <Route path='/view-routes' element={<ViewRoutes/>}></Route>
                        <Route path='/view-aircrafts' element={<ViewAircrafts/>}></Route>
                        <Route path='/view-airports' element={<ViewAirports/>}></Route>
                        <Route path='/add-airports' element={<AddAirports/>}></Route>
                        <Route path='*' element = {<NotFound/>}></Route>
                    </Routes>
                </BrowserRouter>
            </div>
        </div>
    )
}