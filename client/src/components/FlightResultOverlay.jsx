import React from "react";
import 'bootstrap/dist/css/bootstrap.css';
import '../css/FlightResultOverlay.css';
import axios from "axios";
import {successToast, warningToast, errorToast, reload} from "./common/Toasts";

import Overlay from './common/Overlay';

class FlightResultOverlay extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            visibility: props.visibility,
            data : props.information,
        }

    }

    deleteFlight(flight_id) {
        axios.delete("/flightSchedule/", {params: {id: flight_id}})
        .then((res)=> {
            console.log(res.data.success);
            if(res.data.success) {
                successToast('Succesfully deleted')
                reload();
            }else {
                warningToast('Failed to delete')
            }
        }).catch((err)=> {
            errorToast("Error occured deleting")
        });
    }

    render() {
        return(
            <Overlay visible={this.state.visibility}
                     changeVisibility={()=>{
                         this.setState({
                             visibility: false,
                         });
                         this.props.onClick();
                     }}>
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th>Flight ID</th>
                            <th>Takeoff Time</th>
                            <th>Landing Time</th>
                            <th>Aircraft</th>
                            <th>Origin</th>
                            <th>Destination</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.data.map(flight => (
                            <tr key={flight.flight_id}>
                                <td>{flight.flight_id}</td>
                                <td>{(new Date(flight.takeoff_time)).toLocaleString()}</td>
                                <td>{(new Date(flight.departure_time)).toLocaleString()}</td>
                                <td>{flight.model}</td>
                                <td>{flight.origin}</td>
                                <td>{flight.destination}</td>
                                <td><button 
                                style={{"marginLeft":"0px"}} 
                                className='btn btn-danger' 
                                onClick={this.deleteFlight.bind(this, flight.flight_id)}>X</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </Overlay>
        );
    }
}

export default FlightResultOverlay;