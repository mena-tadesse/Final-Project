import React, { useState, useContext } from 'react';
import { auth } from '../config/config';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";
import { LanguageContext } from "../LanguageContext";
import { updateProfile } from "firebase/auth"; 

const SignUp = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const { signup, error } = useAuth(); // Access signup function from AuthContext
    const { language } = useContext(LanguageContext); // Access the language context
    const navigate = useNavigate();

    // Handle signup logic
    const handleSignup = async (e) => {
        e.preventDefault();
        try {
            const fullName = `${firstName} ${lastName}`; // Combine first and last name
            const userCredential = await signup(email, password); // Calls signup() function from AuthContext.js
            await updateProfile(userCredential.user, {
                displayName: fullName,
            }); // Update the user's display name in Firebase
            navigate("/account"); // Redirect to account after signup
        } catch {
            console.error("Error during signup:", error);
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

    const handleFirstNameChange = (e) => {
        setFirstName(e.target.value);
    }

    const handleLastNameChange = (e) => {
        setLastName(e.target.value);
    }

    return (
        <div className="login-background-container">
            <div className="login-container">
                {/* Home button */}
                <Link to="/">
                    <img src="../Images/CharlotteIcon.png" alt="Home Button" />
                </Link>
                <div className="auth-details-alignment-signup">
                    {/* Signup form */}
                    <form onSubmit={handleSignup}>
                        <p>{language === "en" ? "SIGN UP" : "REGÍSTRATE"}</p>
                        <label htmlFor="first_name">{language === "en" ? "First Name" : "Nombre"}</label>
                        <input 
                            id="first_name" 
                            className="authentication_info" 
                            type="text" 
                            placeholder={language === "en" ? "John" : "Juan"} 
                            value={firstName}
                            onChange={handleFirstNameChange}
                            required 
                        />
                        <label htmlFor="last_name">{language === "en" ? "Last Name" : "Apellido"}</label>
                        <input 
                            id="last_name" 
                            className="authentication_info" 
                            type="text" 
                            placeholder={language === "en" ? "Doe" : "Pérez"} 
                            value={lastName}
                            onChange={handleLastNameChange}
                            required 
                        />
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
                            minLength="8" 
                            maxLength="12" 
                            value={password} 
                            onChange={handlePasswordChange} 
                            required 
                        />
                        <button type="submit">{language === "en" ? "SIGN UP" : "REGÍSTRATE"}</button>
                    </form>
                    {/* Social media links */}
                    <div className="social-media-signup">
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
            {/* Login path section */}
            <div className="login-path-container">
                <div className="login-path-content-container">
                    <p>{language === "en" ? "HELLO FRIEND!" : "¡HOLA AMIGO!"}</p>
                    <p>
                        {language === "en" 
                            ? "“The first documented discovery of gold in the US was in Charlotte in 1799”" 
                            : "“El primer descubrimiento documentado de oro en los EE.UU. fue en Charlotte en 1799”"}
                        <span>~Queen City</span>
                    </p>
                    <p>{language === "en" ? "Already have an account?" : "¿Ya tienes una cuenta?"}</p>
                    <Link to="/login">
                        <button>{language === "en" ? "LOGIN" : "INICIAR SESIÓN"}</button>
                    </Link>
                </div>
            </div>
                 <div className="back-to-home-container">
            <Link to="/">
                <button className="back-to-home-button">Back to Home</button>
            </Link>
        </div>
        </div> 
    );
};

export default SignUp;
