import React, { useEffect, useState} from 'react'
import '../css/formstyle.css'
import 'bootstrap/dist/css/bootstrap.css';
import axios from "axios";
import alert from "./Alert";

export default function AddRoute (){
    const [origin, setOrigin] = useState(0);
    const [destination, setDestination] = useState(0);
    const [airports, setAirports] = useState([]);

    useEffect(()=>{
        axios.get('/airport').then((res) =>{
            setAirports(res.data.airports);
        }).catch((e)=>{
            console.error(e);
        });
    }, []);

    const handleOriginChange = (e) =>{
        setOrigin(e.target.value);
    }

    const handleDestinationChange = (e) =>{
        setDestination(e.target.value);
    }

    const handleSubmit = (e) =>{
        if (origin === destination || origin === 0 || destination ===0){
            alert('Invalid origin or destination');
        }
        else{
            axios.post('/route', {origin: origin, destination: destination})
                .then(()=>{
                    alert('Route successfully added');
                })
                .catch(()=>{
                    alert('Failed to add route');
                });
        }

    }

    return (
        <div className='testform'>
            <form onSubmit={handleSubmit}>


                <div className="form-floating">
                    <select className="form-select" id="floatingSelect" aria-label="Floating label select example" placeholder = 'Origin'
                            onChange={handleOriginChange}>
                        <option disabled={true} selected={true}>Select</option>
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
                        <option disabled={true} selected={true}>Select</option>
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
