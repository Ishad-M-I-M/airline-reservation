import React, { Component } from 'react';

import '../css/LandingPage.css';
import Navbar from "./Navbar";
import * as url from "url";

export function LandingPage() {
    return (
        <div className="wrapper">
            <Navbar items={[{"item": "Home", "link": "#Home"},
                {"item": "About", "link": "#About"},
                {"item": "Services", "link": "#Services"},
                {"item": "Contact", "link": "#Contact"}]}></Navbar>
            <div id="Home" className="cover" >
                <div>
                    <img src={require('../images/plane.png')} style={{height: 300}} alt="Plane logo"/>
                </div>
                <div className="text-center">
                    <h1>B Airways</h1>
                    <h5>Find your flights in one click!</h5>
                    <p>B Airways is blah blah ...</p>
                    <a href="#" className="btn - btn-primary rounded-pill ps-5 pe-5">Get Started &rarr;</a>
                </div>

            </div>
            <div id="About" className="cover">
                <h1>About</h1>
                <p>B Airways is blah blah ...</p>
            </div>
            <div id="Services" className="cover">
                <h1>Services</h1>
                <p>We provide blahhh</p>
            </div>
            <div id="Contact" className="cover">
                <h1>Contact</h1>
                <p>Contact us on</p>
            </div>
        </div>
    );
}