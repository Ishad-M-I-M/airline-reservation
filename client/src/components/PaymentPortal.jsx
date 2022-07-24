import React from 'react';
import {Link} from 'react-router-dom';

class PaymentPortal extends React.Component {

    constructor(props) {
        super(props);
    }

    render(){
        return(
            <div>
                <h2>Payment Portal</h2>
                <Link to="/" >Go Back</Link>
            </div>
        );
    }
}

export default PaymentPortal;