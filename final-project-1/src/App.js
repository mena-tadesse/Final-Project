//import logo from './logo.svg';
import { useState} from 'react';
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import './App.css';
import Header from './components/Header';
import Events from './components/Events';
import Home from './components/Home';
import EventDetail from './components/EventDetail';
import Account from './components/Account';
import Calendar from './components/Calendar';
import Bookmarks from './components/Bookmarks';
import Login from './components/Login';
import SignUp from './components/SignUp'
import {useLocation} from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import React from 'react';
import { useAuth } from "./AuthContext";
import { firestore } from "./config/config";
import { doc,setDoc, deleteDoc} from "firebase/firestore";

//AppConent() is responsible for rendering the header and routes based on the current location
function AppContent() {
  //provides access to the current path being used
  const location = useLocation();

  //hideHeader is initialized to true if the current path is /login or /signup
  const hideHeader = location.pathname === "/login" || location.pathname === "/signup";

  const [bookmarkedEvents, setBookmarkedEvents] = useState([]);
  const [language, setLanguage] = useState("en");
  const { currentUser } = useAuth();

  const toggleBookmark = async (event) => {
    //if user isn't signed in, they cannot bookmark events. 
    if(!currentUser) {
        alert(language === "en" ? "Please login to bookmark events." : "Por favor, inicie sesion para marcar eventos.");
        return;
    }

    //create a reference to the user's bookmarks collection in firestore
    const bookmarksRef = doc(firestore, "users", currentUser.uid, "bookmarks", event.id);
    //if bookmarked events includes the passed in event's id, then delete it from firestore and update the state
    if (bookmarkedEvents.includes(event.id)) {
        await deleteDoc(bookmarksRef);
        setBookmarkedEvents((prev) => prev.filter((id) => id !== event.id));
    } else {
        console.log("event data saved: ", event);

        //if the event is not already bookmarked, create the event data object
        const eventData = {
            id: event.id,
            name: event.name || "Unknown Event Name",
            image: event.images?.[0]?.url || "",
            dates: {
                start: event.start || "Unknown Start Date",
                end: event.end || event.start || "Unknown End Date",
            },
            location: event.location,
        };

        try {
            //save the event data to firestore
            await setDoc(bookmarksRef, eventData);
            //update the state with the new bookmarked event id
            setBookmarkedEvents((prev) => [...prev, event.id]);
        } catch (error) {
            console.error("Error saving bookmark in firestore: ", error);
        }

        
    }
};

  return (
    <div className="App">
        {/*display the header if the pathName isn't login or signup*/}
        {!hideHeader && <Header setBookmarkedEvents={setBookmarkedEvents}/>}
        {/*Create the routes*/}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/events" element={<Events bookmarkedEvents={bookmarkedEvents} setBookmarkedEvents={setBookmarkedEvents} toggleBookmark={toggleBookmark} currentUser={currentUser}
      language={language} />} />
          {/*Event Detail is nested in Events*/}
            <Route path="/events/:id" element={<EventDetail bookmarkedEvents={bookmarkedEvents} toggleBookmark={toggleBookmark} />} />
          {/*Protected Route is used to prevent users from accessing account & Calendar if they aren't logged in*/}
          <Route path="/account" element={<ProtectedRoute><Account /></ProtectedRoute>} /> 
          <Route path="bookmarks" element={<Bookmarks />} />
          <Route path="/calendar" element={<Calendar />} />
        </Routes>
    </div>
  );
}

//App() is responsible for placing the AppContent() in BrowserRouter
//BrowserRouter is used to keep track of the current location 
function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;