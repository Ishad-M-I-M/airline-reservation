import React from "react";
import 'bootstrap/dist/css/bootstrap.css';
import '../css/FlightResultOverlay.css';

class PassengerDetailsOverlay extends React.Component {

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
                            <th>Passenger ID</th>
                            <th>Name</th>
                            <th>Age</th>
                            <th>Address</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.data.map(passenger => (
                            <tr key={passenger.passenger_id}>
                                <td>{passenger.passenger_id}</td>
                                <td>{passenger.name}</td>
                                <td>{passenger.Age}</td>
                                <td>{passenger.address}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
        );
    }
}

export default PassengerDetailsOverlay;