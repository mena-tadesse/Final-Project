import React from 'react';
import {IoInvertModeOutline} from "react-icons/io5";
import {IoInvertMode} from "react-icons/io5";
import { VscAccount } from "react-icons/vsc";
import { BsFillTicketPerforatedFill } from "react-icons/bs";
import { MdOutlineLanguage } from "react-icons/md";
import { FaRegCalendarDays } from "react-icons/fa6";
import { TbLogin2 } from "react-icons/tb";
import { useLocation, Link } from "react-router-dom";

const Header = () => {

    //gets current route
    const location = useLocation();

    return (
        <nav className="navbar">
            <ul className="navitems">
                <li><IoInvertModeOutline className="icon"/><span>Dark Mode</span></li>
                <li>
                    {/*linking icon to account route. if the current route is equal to account, then the className is set to active*/}
                    <Link to="/account" className={location.pathname === "/account" ? "active" : ""}>
                    <VscAccount className="icon"/>
                    <span>Account</span>
                    </Link>
                </li>
                <li>
                    {/*linking icon to events route. if the current route is equal to events, then the className is set to active*/}
                    <Link to="/events" className={location.pathname === "/events" ? "active" : ""}>
                        <BsFillTicketPerforatedFill className="icon"/>
                        <span>Events</span>
                    </Link>
                </li>
                <li>
                    {/*linking icon to home route. if the current route is equal to home, then the className is set to active*/}
                    <Link to="/" className={location.pathname === "/" ? "active" : ""}>
                        <img src="../Images/CharlotteIcon.png" alt="HomeButton"/>
                    </Link>
                </li>
                <li><MdOutlineLanguage className="icon"/><span>Español</span></li>
                <li>
                    {/*linking icon to calendar route. if the current route is equal to calendar, then the className is set to active*/}
                    <Link to="/calendar" className={location.pathname === "/calendar" ? "active" : ""}>
                        <FaRegCalendarDays className="icon"/><span>Calendar</span>
                    </Link>
                </li>
                <li>
                    <Link to="/login">
                        <TbLogin2 className="icon"/><span>Login</span>
                    </Link>
                </li>
            </ul>
        </nav>
    )
}

export default Header;