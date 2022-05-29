import React from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import '../css/popup.css'

function Popup(props) {
  return (props.trigger) ? (
    <div className='popup'> 
        <div className='popup-inner'>
            <button className="btn btn-danger" onClick={()=> props.setTrigger(false)}>Close</button>
            {props.children}
        </div>   
    </div>
  ): ""
}

export default Popup