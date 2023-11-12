import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import config from '../config.json';
import Button from '../components/Button';
import WhiteButton from '../components/WhiteButton';
import airbnbLogo from '../assets/airbnb-logo.jpg';

const BACKEND_PORT = config.BACKEND_PORT;

function Navbar () {
  const navigate = useNavigate();

  function isLoggedIn () {
    return localStorage.getItem('token') !== null;
  }

  const logout = async () => {
    try {
      const response = await fetch(`http://localhost:${BACKEND_PORT}/user/auth/logout`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 200) {
        localStorage.removeItem('token');
        navigate('/');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="fixed top-0 left-0 right-0 flex flex-row justify-between items-center text-sm px-20 py-6 border border-b-black/10 bg-white z-50">
      <Link to="/">
        <img className="w-24" src={airbnbLogo} alt="Airbnb Logo" />
      </Link>
      <div className="flex flex-row gap-4 items-center">
        {isLoggedIn()
          ? (
          <>
            <div className='flex flex-col w-24'>
              <Button label="Logout" onClick={logout} />
            </div>
          </>
            )
          : (
          <>
            <div className='flex flex-col w-24'>
              <WhiteButton label="Register" onClick={() => navigate('/register')} />
            </div>
            <div className='flex flex-col w-24'>
              <Button label="Login" onClick={() => navigate('/login')} />
            </div>
          </>
            )}
      </div>
    </div>
  );
}

export default Navbar;
