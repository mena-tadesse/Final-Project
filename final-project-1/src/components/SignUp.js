import React, { useState } from 'react';
import { auth } from '../config/config';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";


const SignUp = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { signup, error } = useAuth();
    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();
        try {
          await signup(email, password);
          navigate("/account"); // Redirect to account after signup
        } catch {
          // Error is already handled in the context
        }
      };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };


    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    return (
        <div className="login-background-container">
            <div className="login-container">
                    <Link to="/">
                        <img src="../Images/CharlotteIcon.png" alt="Home Button" />
                    </Link>
                    <div className="auth-details-alignment-signup">
                        <form onSubmit={handleSignup}>
                        <p>SIGN UP</p>
                        <label for="first_name">First Name</label>
                        <input id="first_name" className="authentication_info" type="text" placeholder="John" required/>
                        <label for="last_name">Last Name</label>
                        <input id="last_name" className="authentication_info" type="text" placeholder="Doe" required/>
                        <label for="login_email">Email</label>
                        <input id="login_email" className="authentication_info" type="email" placeholder="example@email.com" onChange={handleEmailChange} required/>
                        <label for="login_password">Password</label>
                        <input id="login_password" className="authentication_info" type="password" placeholder="abc123" minlength="8" maxLength="12" onChange={handlePasswordChange} required/>
                        <button type="submit">SIGN UP</button>
                        </form>
                        <div className="social-media-signup">
                            <a href="https://twitter.com/charlottgotalot" target="_blank"><img src="../Images/twittericon.png" alt="twitter icon" className="twitter"/></a>
                            <a href="https://www.facebook.com/charlottesgotalot/" target="_blank"><img src="../Images/facebook.png" alt="facebook icon" className="facebook" /></a>
                            <a href="https://www.instagram.com/charlottesgotalot/" target="_blank"><img src="../Images/instagram_icon.png" alt="instagram icon" className="instagram"  /></a>
                        </div>
                    </div>
            </div>
            <div className="login-path-container">
                <div className="login-path-content-container">
                    <p>HELLO FRIEND!</p>
                    <p>
                    “The first documented discovery of gold in the US was in Charlotte in 1799”
                        <span>
                            ~Queen City
                        </span>
                    </p>
                    <p>Already have an account?</p>
                    <Link to="/login">
                        <button>LOGIN</button>
                    </Link>
                </div>
            </div>
        </div> 
    )
};

export default SignUp;