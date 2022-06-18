import React, { useState } from "react";
import "../css/navbar.css";
import { Navigate, useNavigate } from "react-router-dom";
import UserStore from "../stores/UserStore";

function Navbar(props) {
  const [active, setActive] = useState("nav_menu");
  const [toggleIcon, setToggleIcon] = useState("nav_toggler");

  const navToggle = () => {
    active === "nav_menu"
      ? setActive("nav_menu nav_active")
      : setActive("nav_menu");

    //ToggleIcon
    toggleIcon === "nav_toggler"
      ? setToggleIcon("nav_toggler toggle")
      : setToggleIcon("nav_toggler");
  };

  let signInBtn = "block";
  let signOutBtn = "none";
  if ((UserStore.isLoggedIn == true)) {
    signOutBtn = "block";
    signInBtn = "none";
  }

  return (
    <nav className="nav navbar fixed-top">
      <ul className={active}>
        <li className="nav_item nav-item">
          <a href="#" className="nav_link nav-link">
            Home
          </a>
        </li>

        <li className="nav_item nav-item dropdown">
          <a
            href="#"
            className="nav_link nav-link nav-link dropdown-toggle"
            id="navbarDropdownMenuLink"
            role="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            About
          </a>
          <ul
            className="dropdown-menu"
            aria-labelledby="navbarDropdownMenuLink"
          >
            <li>
              <a className="dropdown-item" href="#">
                Mission
              </a>
            </li>
            <li>
              <hr className="dropdown-divider" />
            </li>
            <li>
              <a className="dropdown-item" href="#">
                Vision
              </a>
            </li>
            <li>
              <hr className="dropdown-divider" />
            </li>
            <li>
              <a className="dropdown-item" href="#">
                Team
              </a>
            </li>
          </ul>
        </li>

        <li className="nav_item nav-item">
          <a href="#" className="nav_link nav-link">
            Services
          </a>
        </li>

        <li className="nav_item nav-item">
          <a href="#" className="nav_link nav-link">
            Contact Us
          </a>
        </li>

        <li className="nav_item nav-item" >
          <a href="#" className="nav_link nav-link">
            Sign Up
          </a>
        </li>

        <li
          className="nav_item view-ticket-btn"
          style={{ display: `${UserStore.role==="user" ? 'block' :'none'}` }}
          
         
        >
          <a href="/tickets" className="nav_link nav-link">
            View Tickets
          </a>
        </li>


        <li
          className="nav_items sign-in-btn"
          style={{ display: `${signInBtn}` }}
          onClick={() => {
            document.querySelector(".sign-out-btn").style.display = "block";
            document.querySelector(".sign-in-btn").style.display = "none";
          }}
        >
          <a href="/signIn" className="nav_links">
            Sign In
          </a>
        </li>

        <li
          className="nav_items sign-out-btn"
          style={{ display: `${signOutBtn}` }}
          onClick={() => {
            const logout = props.logout;
            logout();
            document.querySelector(".sign-out-btn").style.display = "none";
            document.querySelector(".sign-in-btn").style.display = "block";
          }}
        >
          <a href="/" className="nav_links">
            Sign Out
          </a>
        </li>
      </ul>

      <div onClick={navToggle} className={toggleIcon}>
        <div className="line1"></div>
        <div className="line2"></div>
        <div className="line3"></div>
      </div>
    </nav>
  );
}

export default Navbar;
