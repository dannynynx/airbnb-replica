import config from '../config.json';
import { createContext, useContext } from 'react';

const BACKEND_PORT = config.BACKEND_PORT;

// USER AUTH
// Managing user authentication and authorisation

export const postRegisterUser = async (body) => {
  try {
    const response = await fetch(`http://localhost:${BACKEND_PORT}/user/auth/register`, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const postLoginUser = async (body) => {
  try {
    const response = await fetch(`http://localhost:${BACKEND_PORT}/user/auth/login`, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const postLogoutUser = async () => {
  try {
    const response = await fetch(`http://localhost:${BACKEND_PORT}/user/auth/logout`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};

export function isLoggedIn () {
  return !!localStorage.getItem('token');
}

const UserContext = createContext();
export const useUserContext = () => useContext(UserContext);

// LISTING MANAGEMENT
// Managing listings

export const getAllListings = async () => {
  try {
    const response = await fetch(`http://localhost:${BACKEND_PORT}/listings`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const postNewListing = async (body) => {
  try {
    const response = await fetch(`http://localhost:${BACKEND_PORT}/listings/new`, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getListing = async (listingId) => {
  try {
    const response = await fetch(`http://localhost:${BACKEND_PORT}/listings/${listingId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};
