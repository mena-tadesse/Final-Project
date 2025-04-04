import React, { useContext } from 'react';
import { IoInvertModeOutline } from "react-icons/io5";
import { VscAccount } from "react-icons/vsc";
import { BsFillTicketPerforatedFill } from "react-icons/bs";
import { MdOutlineLanguage } from "react-icons/md";
import { FaRegCalendarDays } from "react-icons/fa6";
import { TbLogin2 } from "react-icons/tb";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";
import { LanguageContext } from "../LanguageContext";

const Header = () => {
    // Gets current route
    const location = useLocation();
    const navigate = useNavigate();
    const { currentUser, logout } = useAuth();
    const { language, toggleLanguage } = useContext(LanguageContext);

    // Handle logout
    const handleLogout = async () => {
        try {
            await logout(); // Calls logout function in AuthContext
            navigate("/");
        } catch (error) {
            console.error("Error logging out: ", error);
        }
    };

    return (
        <nav className="navbar">
            <ul className="navitems">
                <li>
                    <IoInvertModeOutline className="icon" />
                    <span>{language === "en" ? "Dark Mode" : "Modo Oscuro"}</span>
                </li>
                <li>
                    {/* Linking icon to account route. If the current route is equal to account, then the className is set to active */}
                    <Link to="/account" className={location.pathname === "/account" || location.pathname === "/bookmarks" ? "active" : ""}>
                        <VscAccount className="icon" />
                        <span>{language === "en" ? "Account" : "Cuenta"}</span>
                    </Link>
                </li>
                <li>
                    {/* Linking icon to events route. If the current route is equal to events, then the className is set to active */}
                    <Link to="/events" className={location.pathname === "/events" ? "active" : ""}>
                        <BsFillTicketPerforatedFill className="icon" />
                        <span>{language === "en" ? "Events" : "Eventos"}</span>
                    </Link>
                </li>
                <li>
                    {/* Linking icon to home route. If the current route is equal to home, then the className is set to active */}
                    <Link to="/" className={location.pathname === "/" ? "active" : ""}>
                        <img src="../Images/CharlotteIcon.png" alt={language === "en" ? "Home Button" : "Botón de Inicio"} />
                    </Link>
                </li>
                <li>
                    <button onClick={toggleLanguage} className="language-button">
                        <MdOutlineLanguage className="icon" />
                        <span>{language === "en" ? "Español" : "English"}</span>
                    </button>
                </li>
                <li>
                    {/* Linking icon to calendar route. If the current route is equal to calendar, then the className is set to active */}
                    <Link to="/calendar" className={location.pathname === "/calendar" ? "active" : ""}>
                        <FaRegCalendarDays className="icon" />
                        <span>{language === "en" ? "Calendar" : "Calendario"}</span>
                    </Link>
                </li>
                <li>
                    {/* If currentUser isn't null, then change the icon to handle logout logic */}
                    {currentUser ? (
                        <button onClick={handleLogout}>
                            <TbLogin2 className="icon" />
                            <span>{language === "en" ? "Logout" : "Cerrar Sesión"}</span>
                        </button>
                    ) : (
                        <Link to="/login">
                            <TbLogin2 className="icon" />
                            <span>{language === "en" ? "Login" : "Iniciar Sesión"}</span>
                        </Link>
                    )}
                </li>
            </ul>
        </nav>
    );
};

export default Header;