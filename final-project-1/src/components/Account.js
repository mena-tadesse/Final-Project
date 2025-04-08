import React, { useContext, useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";
import { LanguageContext } from "../LanguageContext"; // Import LanguageContext
import { storage, firestore } from "../config/config"; // Import storage and firestore from config
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"; // Import necessary functions from Firebase Storage
import { doc, updateDoc, setDoc, collection, getDocs } from "firebase/firestore"; // Firestore functions

const Account = () => {
    const { currentUser, deleteAccount, error } = useAuth();
    const { language } = useContext(LanguageContext); // Access the language context
    const navigate = useNavigate();
    const [uploading, setUploading] = useState(false); // State to manage uploading status of image
    const [photoURL, setPhotoURL] = useState(currentUser?.photoURL || "../Images/default_user_profile_picture.png");

    // Update photoURL state whenever currentUser changes
    useEffect(() => {
        if (currentUser?.photoURL) {
            setPhotoURL(currentUser.photoURL);
        }
    }, [currentUser]);

    //Handle image upload 
    const handleImageUpload = async (e) => {
        const file = e.target.files[0]; // Get the selected file
        if (!file) return; // If no file is selected, return
        setUploading(true); // Set uploading state to true

        try {
            // Step 1: Upload the file to Firebase Storage
            console.log("Current User UID:", currentUser?.uid);
            console.log("Current User UID:", currentUser?.displayName);
            console.log("Uploading file to Firebase Storage...")
            const storageRef = ref(storage, `profilePictures/${currentUser.uid}/profile.jpg`);
            await uploadBytes(storageRef, file);
            console.log("File uploaded to storage successfully");

            // Step 2: Get the download URL
            console.log("Getting download URL...");
            const downloadURL = await getDownloadURL(storageRef);
            console.log("Download URL: ", downloadURL);
            console.log("Current user object:", currentUser);


            // Step 3: Save the URL in Firestore
            console.log("Updating Firestore with photoURL...");
            const userRef = doc(firestore, "users", currentUser.uid);
            const data = { profile: { photoURL: downloadURL } };
            console.log("Data being sent to Firestore:", data);
            await setDoc(userRef, data, { merge: true });
            console.log("Firestore updated successfully");
            
            alert(language === "en" ? "Profile picture updated successfully!" : "¡Foto de perfil actualizada con éxito!");
            setPhotoURL(downloadURL); // Update the photoURL in the state
        } catch (error) {
            console.error("Error uploading image:", error);
            alert(language === "en" ? "Failed to upload image. Please try again." : "Error al subir la imagen. Por favor, inténtelo de nuevo.");
        } finally {
            setUploading(false); // Set uploading state to false
        }

    }

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
                            src={photoURL}
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
                            onChange={handleImageUpload}
                            disabled={uploading}
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