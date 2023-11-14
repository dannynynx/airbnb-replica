import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import HostedListings from './pages/HostedListings';

import { Context, initialValue } from './helpers/context';

function App () {
  const [userEmail, setUserEmail] = React.useState(initialValue.userEmail)
  const getters = {
    userEmail,
  }
  const setters = {
    setUserEmail,
  }

  return (
    <div className="font-nunito">
      <BrowserRouter>
        <Context.Provider value={{ getters, setters }}>
          <Navbar/>
          <Routes>
            <Route path="/login" element={<Login/>}/>
            <Route path="/register" element={<Register/>}/>
            <Route path="/my-listings" element={<HostedListings/>}/>
          </Routes>
          </Context.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
