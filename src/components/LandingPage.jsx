import React, { Component } from 'react';

import '../css/LandingPage.css';
import Navbar from "./Navbar";

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
                    <p>Service, Comfort, Safety, Reliability, and Punctuality ....</p>
                    <a href="/usr-booking" className="btn - btn-primary rounded-pill ps-5 pe-5">Get Started &rarr;</a>
                </div>

            </div>
            <div id="About" className="cover">
                <h1>About</h1>
                <p className="text-center"><strong>B Airways</strong> is a subsidiary of <strong>Virgin
                    Airlines </strong> but functions independently.<br/> It currently caters only
                    to the needs of small distance, internal flights in Indonesia. <br/> B Airways founded on 2000 and
                    currently a fastest growing airlines in the world </p>
            </div>
            <div id="Services" className="cover">
                <h1>Services</h1>
                <p>We provide airline transportation for distinct locations in the world and provide internal operations
                    in Indoneasia. </p>
            </div>
            <div id="Contact" className="cover">
                <h1>Contact</h1>
                <p>Find us on</p>
                <div className="d-flex justify-content-evenly" style={{width: "60%"}}>
                    <img
                        src={"https://img.shields.io/badge/-Facebook-blue?style=for-the-badge&labelColor=blue&logo=facebook&logoColor=white"}/>
                    <img
                        src={"https://img.shields.io/badge/-Twitter-9cf?style=for-the-badge&labelColor=9cf&logo=twitter&logoColor=white"}/>
                    <img
                        src={"https://img.shields.io/badge/-Instagram-ff69b4?style=for-the-badge&labelColor=ff69b4&logo=instagram&logoColor=white"}/>
                    <img
                        src={"https://img.shields.io/badge/-LinkedIn-blue?style=for-the-badge&labelColor=blue&logo=linkedin&logoColor=white"}/>
                </div>
            </div>
        </div>
    );
}