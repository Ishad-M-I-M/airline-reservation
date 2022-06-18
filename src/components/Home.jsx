import React, { useEffect } from "react";
import SearchFlight from "./SearchFlight.jsx";
import "../css/home.css";
import Navbar from "./Navbar.jsx";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import FlightCard from "./FlightCard.jsx";
import ChooseFlights from "./ChooseFlights.jsx";
import LoginForm from "./LoginForm.jsx";
import Footer from "./Footer.jsx";
import PaymentPage from "./PaymentPage";
import Tickets from "./Tickets"

export default function Home(props) {
  // useEffect(()=>{
    
  //   window.addEventListener('popstate', function(event) {
  //     window.location.href="/";
  //   });
  // },[]);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <div>
              <div className="home-page">
                <Navbar logout={props.logout} />
                <div className="background-img">
                  <SearchFlight />
                </div>
                {/*<Footer />*/}
              </div>
            </div>
          }
        ></Route>

        <Route path="/searchResult" element={<ChooseFlights />}></Route>
        <Route path="/paymentPage" element={<PaymentPage />}></Route>
        <Route path="/signIn" element={<LoginForm />}></Route>
        <Route path="/tickets" element={<Tickets />}></Route>

      </Routes>
    </BrowserRouter>
  );
}
