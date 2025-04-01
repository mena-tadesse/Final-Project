import React from 'react';
import { Link } from "react-router-dom";


const Account = () => {
    return (
        <div className="account-home-container">
            <div className="account-navbar">
                <h2>My Account</h2>
                <nav>
                <ul>
                    <li>
                    <Link to="/account" className="active">
                        Profile
                    </Link>
                    </li>
                    <li>
                    <Link to="/account/bookmarks">Bookmarks</Link>
                    </li>
                </ul>
                </nav>
                <button className="delete-account-button">
                Delete Account
                </button>
            </div>
            <div className="profile-container">
                <h3>Profile</h3>
                <div className="profile-card">
                    <div className="profile-image-container">
                        <img
                        src={"https://via.placeholder.com/150"}
                        alt="Profile"
                        className="profile-image"
                        />
                        <label htmlFor="upload-image" className="upload-image-button">
                        Upload Image
                        </label>
                        <input
                        type="file"
                        id="upload-image"
                        style={{ display: "none" }}/>
                    </div>
                    <div className="profile-details">
                    <p>Name: </p>
                    <p>Email: </p>
                    <p>Password: ******** 
                        <span>
                            <button className="show-password-button">👁️</button>
                        </span>
                    </p>
                    <p>Language: </p>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Account;