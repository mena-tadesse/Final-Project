import React, { use } from 'react';
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";



const Account = () => {
    const {currentUser, deleteAccount, error} = useAuth();
    const navigate = useNavigate();

    const handleDeleteAccount = async (e) => {
        e.preventDefault();
        const confirmDelete = window.confirm(
            "Are you sure you want to delete your account? This action cannot be undone."
        );

        //if confirmDelete is true...
        if(confirmDelete){
            try {
                await deleteAccount(currentUser); //calls deleteAccount() function from AuthContext.js & passes in currentUserInfo
                navigate("/"); // Redirect to home after deletion
            } catch (error) {
                console.error("Error deleting account:", error);
            }
        } 
      };

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
                    <Link to="/bookmarks">Bookmarks</Link>
                    </li>
                </ul>
                </nav>
                <button className="delete-account-button" onClick={handleDeleteAccount}>
                Delete Account
                </button>
            </div>
            <div className="profile-container">
                <h3>Profile</h3>
                <div className="profile-card">
                    <div className="profile-image-container">
                        <img
                        src={"../Images/default_user_profile_picture.png"}
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
                    <p>Password: 
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