import React from "react";
import 'bootstrap/dist/css/bootstrap.css';
import '../css/FlightResultOverlay.css';

class FlightResultOverlay extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            visibility: props.visibility,
            data : props.information,
        }

    }

    render() {
        return(
        <div className='overlay' style={{
            display: (this.state.visibility ? 'display' : 'none'),
        }}>
            <div className='container-overlay rounded'>
                <button className='btn btn-danger' style={{
                    marginRight:'5px',
                    marginTop:'5px',
                    paddingTop:'1px',
                    paddingBottom:'1px',
                    paddingLeft:'7px',
                    paddingRight:'7px',
                    float:'right'
                }} onClick={()=>{
                    this.setState({
                        visibility: false,
                    });
                    this.props.onClick();
                    }}>&times;</button>
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th>Flight ID</th>
                            <th>Takeoff Time</th>
                            <th>Landing Time</th>
                            <th>Aircraft</th>
                            <th>Origin</th>
                            <th>Destination</th>
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
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
        );
    }
}

export default FlightResultOverlay;