import React from "react";
import 'bootstrap/dist/css/bootstrap.css';
import '../css/FlightResultOverlay.css';

class PassengerCountOverlay extends React.Component {

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
                            <th>Destination Code</th>
                            <th>Destination Name</th>
                            <th>Passenger Count</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.data.map(destination => (
                            <tr key={destination.code}>
                                <td>{destination.code}</td>
                                <td>{destination.name}</td>
                                <td>{destination.Passenger_Count}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
        );
    }
}

export default PassengerCountOverlay;