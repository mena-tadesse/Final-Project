import React, { createContext, useContext, useReducer, useEffect } from "react";
import { auth } from "./config/config"; // Firebase auth instance
import {
  onAuthStateChanged, //checks if someone is logged in
  createUserWithEmailAndPassword, //creates new user
  signInWithEmailAndPassword, //logs users in
  signOut, //logs out
} from "firebase/auth";

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
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch({ type: "LOGIN_SUCCESS", payload: user });
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
    } catch (error) {
      //if there is an error, the user isn't created
      dispatch({ type: "AUTH_ERROR", payload: error.message });
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

  // Context value to share
  const value = {
    currentUser: state.currentUser,
    loading: state.loading,
    error: state.error,
    signup,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{!state.loading && children}</AuthContext.Provider>;
};