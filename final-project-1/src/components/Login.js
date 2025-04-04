import React, { useState, useContext } from 'react';
import { auth } from '../config/config';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";
import { LanguageContext } from "../LanguageContext"; 

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const { login, error } = useAuth(); // This is the global state (that keeps track of the current user logged in / signed up) that was created in AuthContext.js.
    const { language } = useContext(LanguageContext); // Access the language context
    const navigate = useNavigate();

    // Handle login logic
    const handleLogin = async (e) => { 
        e.preventDefault();
        setErrorMessage(""); // Clears any previous error messages
        try {
            await login(email, password);
            navigate("/account"); // Redirect to account page after logging in
        } catch (error) {
            // Handle Firebase authentication errors
            if (error.code === "auth/user-not-found") {
                setErrorMessage(language === "en" 
                    ? "User does not exist. Please check your email or sign up." 
                    : "El usuario no existe. Por favor, revise su correo electrónico o regístrese.");
            } else if (error.code === "auth/wrong-password") {
                setErrorMessage(language === "en" 
                    ? "Incorrect password. Please try again." 
                    : "Contraseña incorrecta. Por favor, inténtelo de nuevo.");
            } else if (error.code === "auth/invalid-email") {
                setErrorMessage(language === "en" 
                    ? "Invalid email format. Please enter a valid email." 
                    : "Formato de correo electrónico no válido. Por favor, introduzca un correo electrónico válido.");
            } else {
                setErrorMessage(language === "en" 
                    ? "An error occurred. Please try again later." 
                    : "Ocurrió un error. Por favor, inténtelo más tarde.");
            }
        }
    };

    // Handle email input change
    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    // Handle password input change
    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    return (
        <div className="login-background-container">
            <div className="login-container">
                {/* Home button */}
                <Link to="/">
                    <img src="../Images/CharlotteIcon.png" alt="Home Button" className="charlotte-home-icon-on-authentication"/>
                </Link>
                <div className="auth-details-alignment">
                    {/* Login form */}
                    <form onSubmit={handleLogin}>
                        <p>{language === "en" ? "LOGIN" : "INICIAR SESIÓN"}</p>
                        <label htmlFor="login_email">{language === "en" ? "Email" : "Correo Electrónico"}</label>
                        <input 
                            id="login_email" 
                            className="authentication_info" 
                            type="email" 
                            placeholder={language === "en" ? "example@email.com" : "ejemplo@correo.com"} 
                            onChange={handleEmailChange} 
                            value={email} 
                            required 
                        />
                        <label htmlFor="login_password">{language === "en" ? "Password" : "Contraseña"}</label>
                        <input 
                            id="login_password" 
                            className="authentication_info" 
                            type="password" 
                            placeholder={language === "en" ? "abc123" : "abc123"} 
                            onChange={handlePasswordChange} 
                            value={password} 
                            required 
                        />
                        <button type="submit">{language === "en" ? "LOGIN" : "INICIAR SESIÓN"}</button>
                    </form>
                    {/* Display error messages */}
                    {errorMessage && <p className="error-message">{errorMessage}</p>}
                    {/* Social media links */}
                    <div className="social-media">
                        <a href="https://twitter.com/charlottgotalot" target="_blank" rel="noopener noreferrer">
                            <img src="../Images/twittericon.png" alt="twitter icon" className="twitter" />
                        </a>
                        <a href="https://www.facebook.com/charlottesgotalot/" target="_blank" rel="noopener noreferrer">
                            <img src="../Images/facebook.png" alt="facebook icon" className="facebook" />
                        </a>
                        <a href="https://www.instagram.com/charlottesgotalot/" target="_blank" rel="noopener noreferrer">
                            <img src="../Images/instagram_icon.png" alt="instagram icon" className="instagram" />
                        </a>
                    </div>
                </div>
            </div>
            {/* Signup section */}
            <div className="signup-path-container">
                <div className="signup-path-content-container">
                    <p>{language === "en" ? "WELCOME!" : "¡BIENVENIDO!"}</p>
                    <p>
                        {language === "en" 
                            ? `"Charlotte is one of the nation's fastest-growing metropolitan areas"` 
                            : `"Charlotte es una de las áreas metropolitanas de más rápido crecimiento en el país"`}
                        <span>~Queen City</span>
                    </p>
                    <p>{language === "en" ? "Don't have an account?" : "¿No tienes una cuenta?"}</p>
                    <Link to="/signup">
                        <button>{language === "en" ? "SIGN UP" : "REGÍSTRATE"}</button>
                    </Link>
                </div>
            </div>
                 
        </div> 
    );
};

export default Login;
