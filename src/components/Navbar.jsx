import React, { useState } from 'react';
import '../css/navbar.css';
import SubmitButton from './SubmitButton';

function Navbar(props) {
    const [active, setActive] = useState("nav_menu");
    const [toggleIcon, setToggleIcon] = useState("nav_toggler");

    const navToggle = () => {
        active === 'nav_menu'
            ? setActive('nav_menu nav_active')
            : setActive("nav_menu");

        //ToggleIcon
        toggleIcon === 'nav_toggler'
            ? setToggleIcon("nav_toggler toggle")
            : setToggleIcon("nav_toggler");

    };

    return (
        <nav className="nav navbar fixed-top">

            <ul className={active}>

                <li className='nav_item nav-item'>
                    <a href="#" className='nav_link nav-link'>
                        Home
                    </a>
                </li>

                <li className='nav_item nav-item dropdown'>
                    <a href="#" className="nav_link nav-link nav-link dropdown-toggle" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        About
                    </a>
                    <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                        <li><a className="dropdown-item" href="#">Mission</a></li>
                        <li><hr className="dropdown-divider" /></li>
                        <li><a className="dropdown-item" href="#">Vision</a></li>
                        <li><hr className="dropdown-divider" /></li>
                        <li><a className="dropdown-item" href="#">Team</a></li>
                    </ul>
                </li>

                <li className='nav_item nav-item'>
                    <a href="#" className='nav_link nav-link'>
                        Services
                    </a>
                </li>

                <li className='nav_item nav-item'>
                    <a href="#" className='nav_link nav-link'>
                        Contact Us
                    </a>
                </li>

                <li className='nav_item nav-item'>
                    <a href="#" className='nav_link nav-link'>
                        Sign Up
                    </a>
                </li>

                <li className='nav_items'>                    
                    <SubmitButton 
                        className='nav_links'
                        text = 'Log out' 
                        disabled = {false} 
                        onClick = {()=> {
                            props.onClick();
                        }}
                    />
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