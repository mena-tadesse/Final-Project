import React, { useContext, useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";
import { LanguageContext } from "../LanguageContext"; // Import LanguageContext
import { firestore } from "../config/config";
import { doc, collection, getDocs, setDoc, deleteDoc } from "firebase/firestore";
import { FaBookmark } from "react-icons/fa";


const Bookmarks = () => {
    const { currentUser, deleteAccount, error } = useAuth();
    const { language } = useContext(LanguageContext); // Access the language context
    const navigate = useNavigate();
    const [bookmarkedEvents, setBookmarkedEvents] = useState([]); // State to hold bookmarked events

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

    //fetch bookmarked events from firestore
        useEffect(() => {
            const fetchBookmarks = async () => {
                //if currentUser is logged in
                if (currentUser) {
                    //create reference to the user's bookmarks collection
                    const bookmarksRef = collection(firestore, "users", currentUser.uid, "bookmarks");
                    //fetch all the documents in the bookmarks collection
                    const snapshot = await getDocs(bookmarksRef);
                    //map through the documents and get the ids of the bookmarks
                    const bookmarks = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data(), }));
                    //update the state with the bookmarked event IDS
                    setBookmarkedEvents(bookmarks);
                }
            };
            fetchBookmarks();
        }, [currentUser]); //fetch bookmarks when current user changes

        const deleteBookmarkedEvent = async (eventId) => {
            try {
                //create a reference to the user's bookmarks collection in firestore
                const bookmarksRef = doc(firestore, "users", currentUser.uid, "bookmarks", eventId);
                //if bookmarked events includes the passed in event's id, then delete it from firestore and update the state
                await deleteDoc(bookmarksRef);
                setBookmarkedEvents((prev) => prev.filter((event) => event.id !== eventId));
            } catch (error) {
                console.error("Error deleting bookmark:", error);
            }
        }

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
                            <Link to="/bookmarks"><u>{language === "en" ? "Bookmarks" : "Marcadores"}</u></Link>
                        </li>
                    </ul>
                </nav>
                <button className="delete-account-button" onClick={handleDeleteAccount}>
                    {language === "en" ? "Delete" : "Eliminar"}
                </button>
            </div>
            <div className="bookmarks-container">
                <h3>{language === "en" ? "Bookmarks" : "Marcadores"}</h3>
                <div className="bookmarks-box">
                    {bookmarkedEvents.length > 0 ? (
                        bookmarkedEvents.map((event) => (
                            <div key={event.id} className="bookmark-item">
                                <span className="bookmark-item-images">
                                    <button onClick={() => deleteBookmarkedEvent(event.id)}>
                                        <FaBookmark />
                                    </button>
                                    <img src={event.image} alt="Event Image" 
                                         onError={(e) => {
                                            console.error("Error loading image:", e.target.src);
                                         }}
                                    />
                                </span>
                                <span className="bookmark-item-details">
                                    <h2>{event.name}</h2>
                                    <p>{event.dates?.start}</p>
                                    <p>{event.location}</p>
                                </span>
                            </div>
                        ))
                    ) : (
                        <p>{language === "en" ? "No bookmarks found." : "No se encontraron marcadores."}</p>
                    )
                    }

                </div>
            </div>
        </div>
    );
};

export default Bookmarks;