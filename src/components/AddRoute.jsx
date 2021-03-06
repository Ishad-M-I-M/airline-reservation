import React, { useEffect, useState} from 'react'
import '../css/formstyle.css'
import 'bootstrap/dist/css/bootstrap.css';
import axios from "axios";
import { useNavigate } from "react-router-dom";

import {errorToast, redirect, successToast, warningToast} from "./common/Toasts";

export default function AddRoute (){
    const nav = useNavigate();
    const [origin, setOrigin] = useState(0);
    const [destination, setDestination] = useState(0);
    const [airports, setAirports] = useState([]);

    useEffect(()=>{
        axios.get('/airport').then((res) =>{
            // console.log(typeof(res.data.airports ));
            setAirports(res.data.airports)
            // airports.push(res.data.airports);
        }).catch((e)=>{
            console.error(e);
        });
    }, []);

    const handleOriginChange = (e) =>{
        setOrigin(e.target.value);
        console.log("value", e.target.value);
    }

    const handleDestinationChange = (e) =>{
        setDestination(e.target.value);
    }

    const handleSubmit = (e) =>{
        e.preventDefault();
    //    console.log(origin);
    //    console.log(destination);
        if (origin === destination || origin === 0 || destination ===0){
            errorToast("Invalid Input");
        }
        else{
            axios.post('/route', {origin: origin, destination: destination})
            .then((res) => {
     
                if(res.data.message){
                  warningToast("Route Already Exists");
                  // handleClick({
                  //   vertical: 'top',
                  //   horizontal: 'center'
                  // })()
                }
                
                else if (res.data.success){
                  successToast("Route Added Successfully");
                  redirect("/add");
                }
                
              }).catch((err) => {
                console.log(err);
              });
        }

    }

    return (
        <div className='testform'>
            <form onSubmit={handleSubmit}>
                <div className="form-floating">
                    <select className="form-select" id="floatingSelect" aria-label="Floating label select example" placeholder = 'Origin'
                            onChange={handleOriginChange}>
                        <option value={origin} >Select</option>
                        {
                            airports.map((c)=>(
                                <option key={c.id} value={c.id}>{c.code}</option>
                            ))
                        }
                    </select>

                    <label htmlFor="floatingSelect">Select Origin</label>
                </div>

                <br></br>

                <div className="form-floating">
                    <select className="form-select" id="floatingSelect" aria-label="Floating label select example"
                            placeholder = 'Destination'
                            onChange={handleDestinationChange}>
                        <option value={destination}>Select</option>
                        {
                            airports.map((c)=>(
                                <option key={c.id} value={c.id}>{c.code}</option>
                            ))
                        }
                    </select>
                    <label htmlFor="floatingSelect">Select Destination</label>
                </div>


                <br></br>

                <button className='btn btn-primary' type='submit'>Submit</button>
            </form>


        </div>
    )
}
