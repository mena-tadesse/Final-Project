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

function App() {
  return (
    <div className="App">
    {/*Create the routes*/}
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/events" element={<Events />} >
            <Route path="eventdetail" element={<EventDetail />} />
          </Route>
          <Route path="/account" element={<Account />} > 
            <Route path="bookmarks" element={<Bookmarks />} />
          </Route>
          <Route path="/calendar" element={<Calendar />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
