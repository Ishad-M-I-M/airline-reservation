import React from "react";
import 'bootstrap/dist/css/bootstrap.css';
import '../css/FlightResultOverlay.css';

import Overlay from './common/Overlay';

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
        </Overlay>
        );
    }
}

export default PassengerCountOverlay;