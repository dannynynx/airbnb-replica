import React from 'react';
import { useNavigate } from 'react-router-dom';
import config from '../config.json';
import Button from '../components/Button';
import Input from '../components/Input';
// import airbnbCover from '../assets/airbnb-cover.jpg';

const BACKEND_PORT = config.BACKEND_PORT;

function Login () {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState('');

  const navigate = useNavigate();

  const login = async () => {
    const response = await fetch(`http://localhost:${BACKEND_PORT}/user/auth/login`, {
      method: 'POST',
      body: JSON.stringify({
        email,
        password,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();
    if (data.error) {
      setError(data.error);
    } else if (data.token) {
      localStorage.setItem('token', data.token);
      navigate('/');
    }
  };

  return (
    <>
      <div className="relative">
        <div className="fixed inset-0 flex justify-center items-center z-40 bg-black/20 backdrop-blur-sm">
          <div className="flex flex-col px-6 py-4 w-[32rem] bg-white rounded-md gap-2 shadow-md animate-fade-in text-sm">
            <b className='text-center text-base'>Login</b>
            <hr />
            <p>
              Email <span className="text-red-500">*</span>
            </p>
            <Input id="email" type="email" setId={setEmail} />
            <p>
              Password <span className="text-red-500">*</span>
            </p>
            <Input id="password" type="password" setId={setPassword} />
            <hr className="my-1" />
            {error && (
              <div className="bg-red-100 px-4 py-2 text-sm rounded-md">
                <p className="text-red-500">{error}</p>
              </div>
            )}
            <Button label="LOGIN" onClick={login} />
          </div>
        </div>
      </div>
      {/* <img className="fixed inset-0 w-full h-full object-cover" src={airbnbCover} alt="Airbnb Photo" /> */}
    </>
  );
}

export default Login;
