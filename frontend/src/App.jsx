import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import HostedListings from './pages/HostedListings';

function App () {
  return (
    <div className="font-nunito">
      <BrowserRouter>
        <Navbar/>
        <Routes>
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/listings" element={<HostedListings/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
