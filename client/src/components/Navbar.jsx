import React, { useState } from "react";
import "../css/navbar.css";
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
  if ((UserStore.isLoggedIn === true)) {
    signOutBtn = "block";
    signInBtn = "none";
  }

  return (
    <nav className="nav navbar fixed-top">
      <ul className={active}>
        {props.items && props.items.map(({ item, link }) => {
          return (
            <li className="nav_item nav-item" key={item}>
              <a href={link} className="nav_link nav-link">
                {item}
              </a>
            </li>
          )
        })}
        {!UserStore.isLoggedIn && (
          <>
            <li className="nav_item nav-item" >
              <a href="/sign-up" className="nav_link nav-link">
                Sign Up
              </a>
            </li>

            <li className="nav_items sign-in-btn">
              <a href="/sign-in" className="nav_links">
                Sign In
              </a>
            </li>
          </>
        )}
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
