import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.css';

import { 
    Button,
    Row,
    Col,
    Toast
   } from 'react-bootstrap';

function Example(props) {
    const [show, setShow] = useState(false);
  
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
              Frequnt : {props.Frequent}% <br />
            Gold : {props.SavedGold}%
            </Toast.Body>
          </Toast>
        </Col>
        <Col xs={6}>
          <Button onClick={() => setShow(true)}>Show Discounts</Button>
        </Col>
      </Row>
    );
  }
  
export default Example;