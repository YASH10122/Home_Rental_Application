
import React from 'react'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import History from "./pages/History.jsx";
import Admin from './pages/Admin.jsx';
import CreateListing from './pages/CreateListing.jsx';
//import ListingPage from './pages/ListingPage.jsx';
import ListingDetails from './pages/ListingDetails.jsx';
import TripList from './pages/TripList.jsx';
import PropertyList from './pages/PropertyList.jsx';
import UserDetail from './pages/UserDetail';


const App = () => {
  return (
    <>
      <div>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />}></Route>
            <Route path="/register" element={<RegisterPage />}></Route>
            <Route path="/login" element={<LoginPage />}></Route>
            <Route path="/history" element={<History />}></Route>
            <Route path="/admin" element={<Admin />}></Route>
            <Route path='/create-listing' element={<CreateListing />}></Route>
            <Route path='/Properties/:listingId' element={<ListingDetails />}></Route>
            <Route path='/:userId/trips' element={<TripList />}></Route>
            <Route path='/:userId/properties' element={<PropertyList />}></Route>
            <Route path='/users' element={<UserDetail />}></Route>
          </Routes>
        </BrowserRouter>
      </div></>
  )
}

export default App