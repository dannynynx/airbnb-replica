import React from 'react';
import config from '../config.json';
import Button from '../components/Button';

const BACKEND_PORT = config.BACKEND_PORT;

function Login () {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const login = async () => {
    const response = await fetch(`http://localhost:${BACKEND_PORT}/user/auth/login`, {
      method: 'POST',
      body: JSON.stringify({
        email, password
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const data = await response.json();
    if (data.error) {
      alert(data.error);
    } else if (data.token) {
      localStorage.setItem('token', data.token);
    }
  };
  return (
    <>
      <div className='flex justify-center items-center w-screen h-screen bg-black/50'>
        <div className='flex flex-col w-[368px] px-6 py-4 bg-white rounded-md gap-2 drop-shadow-md'>
          <b>Log In</b>
          <hr />
          <div className='flex flex-col'>
            <p>Email</p>
            <input
              id='email'
              type='email'
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>
          <div className='flex flex-col'>
          <p>Password</p>
            <input
              id='password'
              type='password'
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </div>
          <Button label="Login" onClick={login} />
        </div>
      </div>
    </>
  )
}

export default Login;
