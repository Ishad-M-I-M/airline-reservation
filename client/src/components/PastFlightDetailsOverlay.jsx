import React from "react";
import 'bootstrap/dist/css/bootstrap.css';
import '../css/FlightResultOverlay.css';

import Overlay from './common/Overlay';

class PastFlightDetailsOverlay extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            visibility: props.visibility,
            data : props.information,
        }

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
                            <th>Tail_Number</th>
                            <th>Model</th>
                            <th>Origin</th>
                            <th>Destination</th>
                            <th>Takeoff Time</th>
                            <th>Landing Time</th>
                            <th>Passenger Count</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.data.map(flight => (
                            <tr key={flight.flight_id}>
                                <td>{flight.tail_number}</td>
                                <td>{flight.model}</td>
                                <td>{flight.origin}</td>
                                <td>{flight.destination}</td>
                                <td>{(new Date(flight.takeoff_time)).toLocaleString()}</td>
                                <td>{(new Date(flight.departure_time)).toLocaleString()}</td>
                                <td>{flight.Passenger_Count}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </Overlay>
        );
    }
}

export default PastFlightDetailsOverlay;