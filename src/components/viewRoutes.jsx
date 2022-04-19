import { Button } from "bootstrap";
import React, { useState } from "react";

export default function ViewRoutes() {

  //fetched from backend: GET /routes
    const [routes, setRoutes] = useState(
      [{'id': 1, 'origin' : 'CMB', 'destination': 'JFK'},
        {'id': 2,'origin' : 'JFK', 'destination': 'CMB'},
        {'id': 3,'origin' : 'CMB', 'destination': 'MCW'},
        {'id': 4,'origin' : 'CMB', 'destination': 'JED'}]
    );


    const locations = [];
    for(let route of routes){
        if ( locations.indexOf(route['origin']) === -1) locations.push(route['origin']);
        if ( locations.indexOf(route['destination']) === -1) locations.push(route['destination']);
    }
  
    const [endStations, setEndStations] = useState({'origin': null, 'destination': null});

    let handleChange = (endStation, value) =>{
      let endStations_ = {... endStations};
      endStations_[endStation] = value? value: null;
      setEndStations(endStations_);
    }

    let handleDelete =(id_) => {
      // rest API request to delete.: DELETE /routes/:id
      setRoutes(routes.filter(({id}) => id != id_ ));
    }

  return (
    <div className="m-3">
      <form>
        <div className="row align-items-center mb-2">
        <datalist id = "locations" defaultValue="">
                      {locations.map(loc => 
                          <option key={loc}>{loc}</option>
                      )}
        </datalist>
          <div className="col-md-5">
              <label htmlFor="origin" className="form-label"> Origin </label>
              <input id="origin" className="form-control" onChange={(e) => handleChange('origin', e.target.value)} list="locations"/>
       
          </div>
          <div className="col-md-1 text-center align-middle fw-bold fs-5"> to </div>
          <div className="col-md-5">
          <label htmlFor="destination" className="form-label"> Destination </label>
              <input id="destination" className="form-control" onChange={(e)=> handleChange('destination', e.target.value)} list="locations"/>
                  
          </div>
        </div>
      </form>
      <div>
        {routes.map(({id, origin, destination}) =>{
            if ((endStations['origin'] === null || origin === endStations['origin']) && (endStations['destination'] === null || destination === endStations['destination']) ){
              return <div className="row bg-white rounded p-1 mt-1" key={id}> 
                      <div className="col-3">{origin} </div>
                      <div className="col-2 fs-3 fw-bold">&rarr;</div> 
                      <div className="col-3">{destination} </div>
                      <div className="col-4"><button className="btn btn-primary" onClick={()=>handleDelete(id)}>Delete</button></div>
                      </div>
            }
        }   
        )}
          
      </div>
    </div>
  );
}
