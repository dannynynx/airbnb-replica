import React from 'react';

const Button = ({ label, onClick }) => {
  return (
    <button
      className='rounded-md p-2 bg-[#FE375B] text-white hover:bg-[#D52E49] transition-all duration-300 font-bold'
      type='button'
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default Button;
