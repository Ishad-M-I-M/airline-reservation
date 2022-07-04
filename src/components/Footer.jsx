import React from "react";
import { MDBCol, MDBContainer, MDBRow, MDBFooter } from "mdbreact";

const Footer = () => {
  return (
    <MDBFooter color="blue" className="font-small pt-4 mt-4 footer">
      <MDBContainer fluid className="text-center text-md-left footer-container">
        <MDBRow>
          <MDBCol md="6">
            <h5 className="title">B Airlines</h5>
       
            <ul >
              <li className="list-unstyled ">
                  <p >
              service, comfort, safety, reliability, and punctuality
             </p>
              </li>
            </ul>
          </MDBCol>
          <MDBCol md="6">
            <h5 className="title">Links</h5>
            <ul >
              <li className="list-unstyled ">
                <a href="#!" style={{color:'#314755'}}>About Us</a>
              </li>
              <li className="list-unstyled ">
                <a href="#!" style={{color:'#314755'}}>Help</a>
              </li>
              <li className="list-unstyled ">
                <a href="#!" style={{color:'#314755'}}>Services</a>
              </li>
              <li className="list-unstyled ">
                <a href="#!" style={{color:'#314755'}}>Terms and Conditions</a>
              </li>
            </ul>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
      <div className="footer-copyright text-center py-3">
        <MDBContainer fluid>
          &copy; {new Date().getFullYear()} Copyright: <a href='#'> BAirlines.com </a>
        </MDBContainer>
      </div>
    </MDBFooter>
  );
}

export default Footer;