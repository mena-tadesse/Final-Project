import React, { useState } from 'react';
import { auth } from '../config/config';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";



const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const { login, error } = useAuth();
    const navigate = useNavigate();

    const handleLogin = async (e) => { 
        e.preventDefault();
        setErrorMessage(""); //Clears any previous error messages
        try {
            await login(email, password);
            navigate("/account"); //Redirect of account page after logging in
        } catch (error) {
            if (error.code === "auth/user-not-found") {
                setErrorMessage("User does not exist. Please check your email or sign up.");
            } else if (error.code === "auth/wrong-password") {
                setErrorMessage("Incorrect password. Please try again.");
            } else if (error.code === "auth/invalid-email") {
                setErrorMessage("Invalid email format. Please enter a valid email.");
            } else {
                setErrorMessage("An error occurred. Please try again later.");
            }
        }
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    }


    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    }


    return (
        <div className="login-background-container">
            <div className="login-container">
                    <Link to="/">
                        <img src="../Images/CharlotteIcon.png" alt="Home Button" />
                    </Link>
                    <div className="auth-details-alignment">
                        <form onSubmit={handleLogin}>
                        <p>LOGIN</p>
                        <label for="login_email">Email</label>
                        <input id="login_email" className="authentication_info" type="email" placeholder="example@email.com" onChange={handleEmailChange} required/>
                        <label for="login_password">Password</label>
                        <input id="login_password" className="authentication_info" type="password" placeholder="abc123" onChange={handlePasswordChange} required/>
                        <button type="submit">LOGIN</button>
                        </form>
                        <div className="social-media">
                            <a href="https://twitter.com/charlottgotalot" target="_blank"><img src="../Images/twittericon.png" alt="twitter icon" className="twitter"/></a>
                            <a href="https://www.facebook.com/charlottesgotalot/" target="_blank"><img src="../Images/facebook.png" alt="facebook icon" className="facebook" /></a>
                            <a href="https://www.instagram.com/charlottesgotalot/" target="_blank"><img src="../Images/instagram_icon.png" alt="instagram icon" className="instagram"  /></a>

                        </div>
                    </div>
            </div>
            <div className="signup-path-container">
                <div className="signup-path-content-container">
                    <p>WELCOME!</p>
                    <p>
                        "Charlotte is one of the nation's fastest-growing metropolitan areas" 
                        <span>
                            ~Queen City
                        </span>
                    </p>
                    <p>Don't have an account?</p>
                    <Link to="/signup">
                        <button>SIGN UP</button>
                    </Link>
                </div>
            </div>
        </div> 
    )
};

export default Login;