import React from "react";
import 'bootstrap/dist/css/bootstrap.css';
import '../css/FlightResultOverlay.css';

import Overlay from './common/Overlay';

class TotalRevenueOverlay extends React.Component {

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
                            <th>Aircraft</th>
                            <th>Total Revenue</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.data.map(aircraft => (
                            <tr key={aircraft.aircraft_id}>
                                <td>{aircraft.model}</td>
                                <td>{aircraft.Total_Revenue}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </Overlay>
        );
    }
}

export default TotalRevenueOverlay;