import React from 'react';
import Popup from './Popup';
import '../css/clerk.css'
import AddRoute from './AddRoute';
import { useState } from 'react';
import AddDiscount from './AddDiscount';
import AddAirport from './AddAirport';
import AddAircraft from './AddAircraft';
import 'bootstrap/dist/css/bootstrap.css';


function ClerkPage() {
  const [buttonpopup, setbuttonpopup] = useState(false);
  const [buttonpopup2, setbuttonpopup2] = useState(false);
  const [buttonpopup3, setbuttonpopup3] = useState(false);
  const [buttonpopup4, setbuttonpopup4] = useState(false);


  return (

    <div>
      <div>
          <Popup trigger={buttonpopup} setTrigger = {setbuttonpopup}>
        <h1 style={{textAlign: 'center'}}>
        Add Aircraft
        </h1>
        <AddAircraft/>

      </Popup>
       
      </div> 
      <br></br>
      <div>
          <Popup trigger={buttonpopup2} setTrigger = {setbuttonpopup2}>
        <h1 style={{textAlign: 'center'}}>
        Add Route
        </h1>
        <AddRoute/>

      </Popup>
        
      </div> 
      <br></br>
      <div>
          <Popup trigger={buttonpopup3} setTrigger = {setbuttonpopup3}>
        <h1 style={{textAlign: 'center'}}>
        Add Airport
        </h1>
       <AddAirport/>

      </Popup>
        
      </div> 
      <br></br>
      <div>
          <Popup trigger={buttonpopup4} setTrigger = {setbuttonpopup4}>
        <h1 style={{textAlign: 'center'}}>
        Add / Update Discount
        </h1>
        <AddDiscount/>

      </Popup>
        
      </div> 
  
        <div className='option'>
            <button className='butt btn btn-primary'  onClick={()=>setbuttonpopup(true)}>Add Aircraft</button>
            <br></br>
            <br></br>
            <br></br>
            <button className='butt btn btn-primary' onClick={()=>setbuttonpopup2(true)}>Add Route</button>
            <br></br>
            <br></br>
            <br></br>
            <button className='butt btn btn-primary' onClick={()=>setbuttonpopup3(true)}>Add Airport</button>
            <br></br>
            <br></br>
            <br></br>
            <button className='butt btn btn-primary' onClick={()=>setbuttonpopup4(true)}>Add / Update Discount</button>
        </div>

        
    </div>
  )
}

export default ClerkPage;