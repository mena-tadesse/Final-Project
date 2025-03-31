import React, { createContext, useContext, useReducer, useEffect } from "react";
import { auth } from "./config/config"; // Firebase auth instance
import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

// Initial state
const initialState = {
  currentUser: null,
  loading: true,
  error: null,
};

// Reducer function
const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      return { ...state, currentUser: action.payload, loading: false, error: null };
    case "SIGNUP_SUCCESS":
      return { ...state, currentUser: action.payload, loading: false, error: null };
    case "LOGOUT":
      return { ...state, currentUser: null, loading: false, error: null };
    case "AUTH_ERROR":
      return { ...state, error: action.payload, loading: false };
    case "SET_LOADING":
      return { ...state, loading: true };
    default:
      return state;
  }
};

// Create the AuthContext
const AuthContext = createContext();

// Custom hook to use the AuthContext
export const useAuth = () => useContext(AuthContext);

// AuthProvider component
export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Listen for authentication state changes
  useEffect(() => {
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
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      dispatch({ type: "SIGNUP_SUCCESS", payload: userCredential.user });
    } catch (error) {
      dispatch({ type: "AUTH_ERROR", payload: error.message });
    }
  };

  // Login function
  const login = async (email, password) => {
    dispatch({ type: "SET_LOADING" });
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      dispatch({ type: "LOGIN_SUCCESS", payload: userCredential.user });
    } catch (error) {
      dispatch({ type: "AUTH_ERROR", payload: error.message });
      throw error;
    }
  };

  // Logout function
  const logout = async () => {
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