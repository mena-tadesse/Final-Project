import React from 'react';
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";


const Bookmarks = () => {

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
                await deleteAccount(currentUser); //calls deleteAccount() function from AuthContext.js and passes in the currentUser info
                navigate("/"); // Redirect to home after deletion
            } catch (error) {
                console.error("Error deleting account:", error);
            }
        } 
    };


    const bookmarks = [
        { id: 1, title: "Event 1", description: "Description for Event 1" },
        { id: 2, title: "Event 2", description: "Description for Event 2" },
        { id: 3, title: "Event 3", description: "Description for Event 3" },
    ];

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
            <div className="bookmarks-container">
                <h3>Bookmarks</h3>
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
