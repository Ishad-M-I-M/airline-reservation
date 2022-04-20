import React from 'react';
import { Link } from 'react-router-dom';

class Home extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div>
                <Link to="/signin">Sign In</Link>
            </div>
        );
    }
}

export default Home;