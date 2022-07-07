import React from "react";
import 'bootstrap/dist/css/bootstrap.css';
import '../css/FlightResultOverlay.css';

import Overlay from './common/Overlay';

class BookingReportOverlay extends React.Component {

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
                            <th>Discount Type</th>
                            <th>Booking Count</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.data.map(booking => (
                            <tr key={booking.type}>
                                <td>{booking.type}</td>
                                <td>{booking.Booking_Count}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </Overlay>
        );
    }
}

export default BookingReportOverlay;