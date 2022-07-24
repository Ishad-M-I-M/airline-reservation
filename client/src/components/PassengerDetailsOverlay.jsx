import React from "react";
import 'bootstrap/dist/css/bootstrap.css';
import '../css/FlightResultOverlay.css';

import Overlay from './common/Overlay';

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
            </Overlay>
        );
    }
}

export default PassengerDetailsOverlay;