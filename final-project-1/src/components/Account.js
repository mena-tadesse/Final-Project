import React, { useContext } from 'react';
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";
import { LanguageContext } from "../LanguageContext"; // Import LanguageContext

const Account = () => {
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
                await deleteAccount(currentUser); // Calls deleteAccount() function from AuthContext.js & passes in currentUserInfo
                navigate("/"); // Redirect to home after deletion
            } catch (error) {
                console.error("Error deleting account:", error);
            }
        }
    };

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
                            <Link to="/bookmarks">
                                {language === "en" ? "Bookmarks" : "Marcadores"}
                            </Link>
                        </li>
                    </ul>
                </nav>
                <button className="delete-account-button" onClick={handleDeleteAccount}>
                    {language === "en" ? "Delete Account" : "Eliminar Cuenta"}
                </button>
            </div>
            <div className="profile-container">
                <h3>{language === "en" ? "Profile" : "Perfil"}</h3>
                <div className="profile-card">
                    <div className="profile-image-container">
                        <img
                            src={"../Images/default_user_profile_picture.png"}
                            alt={language === "en" ? "Profile" : "Perfil"}
                            className="profile-image"
                        />
                        <label htmlFor="upload-image" className="upload-image-button">
                            {language === "en" ? "Upload Image" : "Subir Imagen"}
                        </label>
                        <input
                            type="file"
                            id="upload-image"
                            style={{ display: "none" }}
                        />
                    </div>
                    <div className="profile-details">
                        <p>
                            {language === "en" ? "Name: " : "Nombre: "}
                            {currentUser?.displayName || " "}
                        </p>
                        <p>
                            {language === "en" ? "Email: " : "Correo Electrónico: "}
                            { currentUser?.email}
                        </p>
                        <p>
                            {language === "en" ? "Password: " : "Contraseña: "}
                            <span>
                                ********
                                <button className="show-password-button">
                                    {language === "en" ? "🔒" : "🔒 "}
                                </button>
                            </span>
                        </p>
                        <p>{language === "en" ? "Language: " : "Idioma: "}
                           {language === "en" ? "English" : "Español"}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Account;