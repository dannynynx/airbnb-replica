import React from 'react';

const Input = ({ id, type, setId }) => {
  return (
    <input
      className='rounded-sm border border-black/25 px-2 py-1 text-sm'
      id={id}
      type={type}
      onChange={e => setId(e.target.value)}
    />
  );
};

export default Input;
