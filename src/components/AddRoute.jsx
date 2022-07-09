import React, { useEffect, useState} from 'react'
import '../css/formstyle.css'
import 'bootstrap/dist/css/bootstrap.css';
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

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
            toast.error("Invalid Input", {
                toastId: "1",position: "top-right",
                autoClose: 4000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: false,
                draggable: false,
                progress: 0,
              });
        }
        else{
            axios.post('/route', {origin: origin, destination: destination})
            .then((res) => {
     
                if(res.data.message){
                  toast.warn("Route Exists", {
                    toastId: "1",position: "top-right",
                    autoClose: 1500,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: false,
                    draggable: true,
                    progress: 0,
                  });
                  // handleClick({
                  //   vertical: 'top',
                  //   horizontal: 'center'
                  // })()
                }
                
                else if (res.data.success){
                  toast.success("Route Added", {
                    toastId: "1",position: "top-right",
                    autoClose: 1500,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: false,
                    draggable: true,
                    progress: 0,
                  });
                  setTimeout(() => {
                    console.log("working"); // count is 0 here
                    window.location.href  = "/add";
                    }, 2000);
                  
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
                        <option value={true} >Select</option>
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
                        <option value={true}>Select</option>
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
