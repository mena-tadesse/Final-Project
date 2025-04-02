import logo from './logo.svg';
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

//AppConent() is responsible for rendering the header and routes based on the current location
function AppContent() {
  //provides access to the current path being used
  const location = useLocation();

  //hideHeader is initialized to true if the current path is /login or /signup
  const hideHeader = location.pathname === "/login" || location.pathname === "/signup";

  return (
    <div className="App">
        {/*display the header if the pathName isn't login or signup*/}
        {!hideHeader && <Header />}
        {/*Create the routes*/}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/events" element={<Events />} >
          {/*Event Detail is nested in Events*/}
            <Route path="eventdetail" element={<EventDetail />} />
          </Route>
          <Route path="/account" element={<Account />} /> 
            {/*Bookmarks is nested in Account*/}
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