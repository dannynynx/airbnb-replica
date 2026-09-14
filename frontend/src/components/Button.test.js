import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Login from '../pages/Login';

describe('Login Component', () => {
  it('testing if error pops up if invalid email or password', async () => {
    const { getByText, getByLabelText } = render(<Login />);

    fireEvent.change(getByLabelText('Email'), { target: { value: 'invalid email' } });
    fireEvent.change(getByLabelText('Password'), { target: { value: 'invalid password' } });

    fireEvent.click(getByText('LOGIN'));

    postLoginUser.mockResolvedValueOnce({ error: 'Invalid credentials' });

    await waitFor(() => {
      expect(postLoginUser).toHaveBeenCalledWith({
        email: 'invalid email',
        password: 'invalid password',
      });
    });

    expect(getByText('Invalid credentials')).toBeInTheDocument();
  });
});