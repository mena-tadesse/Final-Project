import React, { createContext, useContext, useReducer, useEffect, useState } from "react";
import { auth, firestore } from "./config/config"; // Firebase auth instance
import {
  onAuthStateChanged, //checks if someone is logged in
  createUserWithEmailAndPassword, //creates new user
  signInWithEmailAndPassword, //logs users in
  signOut, //logs out
  deleteUser, //deletes user
  reauthenticateWithCredential, //re-authenticates user
  EmailAuthProvider, //provides email and password for re-authentication
  getAuth,
} from "firebase/auth";
import { doc, getDoc, deleteDoc, getDocs, collection } from "firebase/firestore"; // Firestore functions
import { deleteObject, getStorage, ref } from "firebase/storage";

// Initial state
const initialState = {
  currentUser: null, //nobody is logged in yet
  loading: true, //the app is checking if someone is logged in
  error: null, //no errors yet
};

// Reducer function
const authReducer = (state, action) => { //accepts the state and action. then updates the state accordingly
  switch (action.type) {
    //if the user logs in successfully, then the state is set to the currentUser who just logged in.
    case "LOGIN_SUCCESS":
      return { ...state, currentUser: action.payload, loading: false, error: null };
    //if the user signs up successfully, then the state is set to the currentUser who just signed up. 
    case "SIGNUP_SUCCESS":
      return { ...state, currentUser: action.payload, loading: false, error: null };
    //if the user logs out, then the state is set to an initialState where currentUser is null.
    case "LOGOUT":
      return { ...state, currentUser: null, loading: false, error: null };
    //if there was an error with the authentication, the state recieves an error
    case "AUTH_ERROR":
      return { ...state, error: action.payload, loading: false };
    case "SET_LOADING":
      return { ...state, loading: true };
    //if all cases are false, then keep the state as it is
    default:
      return state;
  }
};

// Create the AuthContext
const AuthContext = createContext();

// Custom hook to use the AuthContext.
export const useAuth = () => useContext(AuthContext);

// AuthProvider component
export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  //useEffect() runs only when the app starts & when the app refreshes
  //It does NOT run when users sign up / login / logout
  //This is because it is checking if someone is already
  //logged in from before.
  //When it runs, firebase will pass a user (if someone is already signed in)
  //otherwise, it'll be signed out.
  useEffect(() => {
    //auth was imported from firebase. auth is a firebase
    //instance, which is basically the connection between
    //the app and the firebase login system
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          // Fetch user data from Firestore
          const userRef = doc(firestore, "users", user.uid);
          const userDoc = await getDoc(userRef); //gets document for the signed in user

          if (userDoc.exists()) {
              const userData = userDoc.data(); //gets data from user's doc
              // Merges the user's firestore data with the user object from authentication
              const updatedUser = {
                  ...user,
                  photoURL: userData.profile?.photoURL || null,
              }; //adds the url to their document if it exists.
              dispatch({ type: "LOGIN_SUCCESS", payload: updatedUser });
          } else { //if the user's document (which holds their pfp url) doesn't exist in firestore, but they still have a valid account, they should still be able to login 
              dispatch({ type: "LOGIN_SUCCESS", payload: user });
          }
      } catch (error) {
          console.error("Error fetching user data from Firestore:", error);
          dispatch({ type: "LOGIN_SUCCESS", payload: user });
      }
      } else {
        dispatch({ type: "LOGOUT" });
      }
    });

    return unsubscribe; // Cleanup the listener on unmount
  }, []);

  // Signup function
  const signup = async (email, password) => {
    dispatch({ type: "SET_LOADING" });
    try {
      //firebase creates new user and returns an object.
      //That object is assigned to the userCredential constant
      //The object has properties, one of which is 
      //userCredential.user, which contains the user's
      //info like email, uid, and more.
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      //we pass in the newly created user's info if successful
      dispatch({ type: "SIGNUP_SUCCESS", payload: userCredential.user });
      return userCredential; //returns the userCredential object
    } catch (error) {
      //if there is an error, the user isn't created
      dispatch({ type: "AUTH_ERROR", payload: error.message });
      throw error;
    }
  };

  // Login function
  const login = async (email, password) => {
    dispatch({ type: "SET_LOADING" });
    try {
      //Firebase checks the email/password and returns an object if the credentials exist.
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      //we pass in the object.user property (which contains user info like email, uid, etc)
      dispatch({ type: "LOGIN_SUCCESS", payload: userCredential.user });
    } catch (error) {
      //
      dispatch({ type: "AUTH_ERROR", payload: error.message });
      throw error;
    }
  };

  // Logout function
  const logout = async () => {
    //logs out the currently signed in user
    await signOut(auth);
    dispatch({ type: "LOGOUT" });
  };

  //Delete user function
  const deleteAccount = async (email, password) => { //we pass in the user details
    console.log("deleteAccount called");
    try{
      console.log("Deleting user account...");
      //Get the current user
      //we have to call the current user again because the user
      //object we defined was modified, and didn't include all the
      //properties that the user object from firebase has
      const auth = getAuth();
      const user = auth.currentUser;

      if (!user) {
          throw new Error("No authenticated user found.");
      }

      //Re-authenticate the user
      const credential = EmailAuthProvider.credential(email, password);
      await reauthenticateWithCredential(user, credential);
      console.log("Re-authentication successful");

      //when we delete the user, we must also delete their profile picture from storage
      const storage = getStorage(); //initialize storage reference
      const profilePictureRef = ref(storage, `profilePictures/${user.uid}/profile.jpg`); //get reference to user's profile picture
      await deleteObject(profilePictureRef); //delete the profile picture from storage
      console.log("Profile picture deleted");

      //when we delete the user we must also delete the user's data from database
      const userRef = doc(firestore, "users", user.uid); //get the user reference from firestore
      await deleteDoc(userRef);
      console.log("User data deleted from Firestore");

      //delete the user's bookmarks from firestore
      const bookmarksRef = collection(firestore, "users", user.uid, "bookmarks"); //get the user's bookmarks collection reference
      const bookmarksSnapshot = await getDocs(bookmarksRef); //get all the documents in the bookmarks collection
      console.log("Bookmarks deleted");
      
      // Use Promise.all to delete all bookmarks concurrently
      const deletePromises = bookmarksSnapshot.docs.map((doc) => deleteDoc(doc.ref));
      await Promise.all(deletePromises);

      //delete the user's instance from firebase authentication
      await deleteUser(user);
      console.log("User deleted from Firebase Authentication");
    } catch (error) {
      console.error("Error deleting user: ", error);
      throw error;
    }
    
  }

  // Context value to share
  const value = {
    currentUser: state.currentUser,
    loading: state.loading,
    error: state.error,
    signup,
    login,
    logout,
    deleteAccount,
  };

  return <AuthContext.Provider value={value}>{!state.loading && children}</AuthContext.Provider>;
};