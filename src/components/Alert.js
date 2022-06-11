
import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.css';

import { 
    Button,
    Row,
    Col,
    Toast
   } from 'react-bootstrap';

function AlertMe(props) {
    const [show, setShow] = useState(props.shows);
  
    return (
        // delay={3000} autohide         
      <Row >
        <Col xs={6}> 
          <Toast onClose={() => setShow(false)} show={show} className="d-inline-block m-1" bg='info' delay={3000} autohide >
            <Toast.Header>
              <strong className="me-auto">Current Discounts</strong>
              <small>Just Now</small>
            </Toast.Header>
            <Toast.Body> 
              Invalid Input
            </Toast.Body>
          </Toast>
        </Col>
      </Row>
    );
  }
  
export default AlertMe;