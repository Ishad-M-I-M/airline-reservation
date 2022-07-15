import React, {useEffect, useRef, useState} from "react";

import Table from './common/Table';
import {errorToast, reload, successToast} from "./common/Toasts";
import axios from "axios";

export default function ViewRoutes() {

    const routeReference = useRef([]);
    //fetched from backend: GET /routes
    const [routes, setRoutes] = useState(
        [{'id': 1, 'origin': 'CMB', 'destination': 'JFK'},
            {'id': 2, 'origin': 'JFK', 'destination': 'CMB'},
            {'id': 3, 'origin': 'CMB', 'destination': 'MCW'},
            {'id': 4, 'origin': 'CMB', 'destination': 'JED'}]
  );

    useEffect(()=> {
        axios.get('/route')
            .then(result => {
                routeReference.current = result.data.data;
                setRoutes(result.data.data);
            })
            .catch(err => {
                errorToast("error in fetching routes");
                console.error(err);
            });
    }, []);

    const locations = [];
    for (let route of routes) {
        if (locations.indexOf(route['origin']) === -1) locations.push(route['origin']);
        if (locations.indexOf(route['destination']) === -1) locations.push(route['destination']);
    }

    let handleChange = (endStation, value) => {
        if (value === ""){
            setRoutes(routeReference.current);
        }
        else {
            let routes_ = [...routeReference.current];
            routes_ = routes_.filter((row)=>{
                return row[endStation].indexOf(value.trim()) !== -1;
            });
            setRoutes(routes_);
        }
    }

    let handleDelete = (id_) => {
        // rest API request to delete.: DELETE /routes/:id
        axios.delete(`/route/${id_}`)
            .then(() => {
                successToast("Route is successfully made unavailable.");
                reload();
            })
            .catch(err => {
                errorToast("error in deleting route");
                console.error(err);
            });

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
          <Table id = "id" tableHeadings={{'id': '#','origin': 'Origin', 'destination': 'Destination'}} tableData={routes} deleteHandler={handleDelete}/>

      </div>
    </div>
  );
}
