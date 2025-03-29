import React, { useState } from 'react';
import { auth } from '../config/config';
import { createUserWithEmailAndPassword } from 'firebase/auth';


const Login = () => {

    /*
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    }

    const logIn = async () => {
        await createUserWithEmailAndPassword(auth, email, password);
    };
*/
    return (
        <div className="login-background-container">
            <div className="login-container">
                    <img src="../Images-Header/CharlotteIcon.png" alt="Home Button" />
                    <div className="auth-details-alignment">
                        <p>LOGIN</p>
                        <label for="login_email">Email</label>
                        <input id="login_email" className="authentication_info" type="email" placeholder="example@email.com"/>
                        <label for="login_password">Password</label>
                        <input id="login_password" className="authentication_info" type="password" placeholder="abc123"/>
                        <button type="submit">LOGIN</button>
                        <div className="social-media">
                            <a href="https://twitter.com/charlottgotalot"><img src="../Images-Header/twittericon.png" alt="twitter icon" className="twitter"/></a>
                            <a href="https://www.facebook.com/charlottesgotalot/"><img src="../Images-Header/facebook.png" alt="facebook icon" className="facebook" /></a>
                            <a href="https://www.instagram.com/charlottesgotalot/"><img src="../Images-Header/instagram_icon.png" alt="instagram icon" className="instagram"  /></a>

                        </div>
                    </div>
            </div>
            <div className="signup-path-container">
            </div>
        </div> 
    )
};

export default Login;