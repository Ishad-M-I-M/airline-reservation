import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import '../App.css';
import ViewRoutes from './ViewRoutes';
import ViewAircrafts from './ViewAircrafts';
import ViewAirports from './ViewAirports';
import NotFound from './NotFound';
import ViewReports from './ViewReports';
import ViewFlightSchedules from './ViewFlightSchedules';
import ClerkPage from "./ClerkPage";
import ViewUsers from "./ViewUsers";

export default function Container() {

    return (
        <div className='container bg-white bg-opacity-50 row p-2 mt-5'>
            <div className="sidebar col-md-2">
                <a href='/view-routes'><button type="button" className="btn btn-primary rounded-pill sidebar-btn mb-1" >View Routes</button></a>
                <a href='/view-aircrafts'><button type="button" className="btn btn-primary rounded-pill sidebar-btn mb-1" >View Aircrafts</button></a>
                <a href='/view-airports'><button type="button" className="btn btn-primary rounded-pill sidebar-btn mb-1" >View Airports</button></a>
                <a href='/view-reports'><button type="button" className="btn btn-primary rounded-pill sidebar-btn mb-1">View Reports</button></a>
                <a href='/view-flight-schedules'><button type="button" className="btn btn-primary rounded-pill sidebar-btn mb-1" >View Flight Schedules</button></a>
                <a href='/view-users'><button type="button" className="btn btn-primary rounded-pill sidebar-btn mb-1" >View Users</button></a>
                <a href='/add'><button type="button" className="btn btn-primary rounded-pill sidebar-btn mb-1" >Adder</button></a>
            </div>
            <div className="col-md-10 bg-secondary bg-opacity-25 overflow-auto" id='content' style={{'maxHeight': '88vh' }}>
                <BrowserRouter>
                    <Routes>
                        <Route index element={<h3 className='text-center mt-5'> Select an option</h3>}></Route>
                        <Route path='/view-routes' element={<ViewRoutes/>}></Route>
                        <Route path='/view-aircrafts' element={<ViewAircrafts/>}></Route>
                        <Route path='/view-airports' element={<ViewAirports/>}></Route>
                        <Route path='/view-reports' element={<ViewReports/>}></Route>
                        <Route path='/view-flight-schedules' element={<ViewFlightSchedules/>}></Route>
                        <Route path='/add' element={<ClerkPage/>}></Route>
                        <Route path='/view-users' element={<ViewUsers/>}></Route>
                        <Route path='*' element = {<NotFound/>}></Route>
                    </Routes>
                </BrowserRouter>
            </div>
        </div>
    )
}