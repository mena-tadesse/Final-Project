import React, { useContext } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";
import { LanguageContext } from "../LanguageContext"; // Import LanguageContext

const Bookmarks = () => {
    const { currentUser, deleteAccount, error } = useAuth();
    const { language } = useContext(LanguageContext); // Access the language context
    const navigate = useNavigate();

    // Handle account deletion
    const handleDeleteAccount = async (e) => {
        e.preventDefault();
        const confirmDelete = window.confirm(
            language === "en"
                ? "Are you sure you want to delete your account? This action cannot be undone."
                : "¿Está seguro de que desea eliminar su cuenta? Esta acción no se puede deshacer."
        );

        // If confirmDelete is true...
        if (confirmDelete) {
            try {
                await deleteAccount(currentUser); // Calls deleteAccount() function from AuthContext.js and passes in the currentUser info
                navigate("/"); // Redirect to home after deletion
            } catch (error) {
                console.error("Error deleting account:", error);
            }
        }
    };

    // Sample bookmarks data
    const bookmarks = [
        { id: 1, title: language === "en" ? "Event 1" : "Evento 1", description: language === "en" ? "Description for Event 1" : "Descripción del Evento 1" },
        { id: 2, title: language === "en" ? "Event 2" : "Evento 2", description: language === "en" ? "Description for Event 2" : "Descripción del Evento 2" },
        { id: 3, title: language === "en" ? "Event 3" : "Evento 3", description: language === "en" ? "Description for Event 3" : "Descripción del Evento 3" },
    ];

    return (
        <div className="account-home-container">
            <div className="account-navbar">
                <h2>{language === "en" ? "My Account" : "Mi Cuenta"}</h2>
                <nav>
                    <ul>
                        <li>
                            <Link to="/account" className="active">
                                {language === "en" ? "Profile" : "Perfil"}
                            </Link>
                        </li>
                        <li>
                            <Link to="/bookmarks">{language === "en" ? "Bookmarks" : "Marcadores"}</Link>
                        </li>
                    </ul>
                </nav>
                <button className="delete-account-button" onClick={handleDeleteAccount}>
                    {language === "en" ? "Delete Account" : "Eliminar Cuenta"}
                </button>
            </div>
            <div className="bookmarks-container">
                <h3>{language === "en" ? "Bookmarks" : "Marcadores"}</h3>
                <div className="bookmarks-box">
                    {bookmarks.map((bookmark) => (
                        <div key={bookmark.id} className="bookmark-item">
                            <h2>{bookmark.title}</h2>
                            <p>{bookmark.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Bookmarks;