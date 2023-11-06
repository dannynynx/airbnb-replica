import config from '../config.json';
import { useNavigate } from 'react-router-dom';

const BACKEND_PORT = config.BACKEND_PORT;
const navigate = useNavigate();

export function isLoggedIn () {
  return !!localStorage.getItem('token');
}

export const logout = async () => {
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
      navigate('/login');
    }
  } catch (error) {
    console.log(error);
  }
};
