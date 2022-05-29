import React from 'react';
import Popup from './Popup';
import '../css/clerk.css'
import Form from './Form';
import { useState } from 'react';
import Add_discount from './Add_discount';
import Add_airport from './Add_airport';
import Add_craft from './Add_craft';
import 'bootstrap/dist/css/bootstrap.css';


function ClerkPage() {
  const [buttonpopup, setbuttonpopup] = useState(false);
  const [buttonpopup2, setbuttonpopup2] = useState(false);
  const [buttonpopup3, setbuttonpopup3] = useState(false);
  const [buttonpopup4, setbuttonpopup4] = useState(false);


  return (

    <div>

        <div className="navbar">
        <a href="#">Home</a>
        <a href="#contact">Log Out</a>

      </div>
      <div>
          <Popup trigger={buttonpopup} setTrigger = {setbuttonpopup}>
        <h1 style={{textAlign: 'center'}}>
        Add Aircraft
        </h1>
        <Add_craft/>

      </Popup>
       
      </div> 
      <br></br>
      <div>
          <Popup trigger={buttonpopup2} setTrigger = {setbuttonpopup2}>
        <h1 style={{textAlign: 'center'}}>
        Add Route
        </h1>
        <Form/>

      </Popup>
        
      </div> 
      <br></br>
      <div>
          <Popup trigger={buttonpopup3} setTrigger = {setbuttonpopup3}>
        <h1 style={{textAlign: 'center'}}>
        Add Airport
        </h1>
       <Add_airport/>

      </Popup>
        
      </div> 
      <br></br>
      <div>
          <Popup trigger={buttonpopup4} setTrigger = {setbuttonpopup4}>
        <h1 style={{textAlign: 'center'}}>
        Add / Update Discount
        </h1>
        <Add_discount/>

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

export default ClerkPage