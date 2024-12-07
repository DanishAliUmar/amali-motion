import React from 'react';
import PropTypes from 'prop-types';

export default function Button({ children, onClick, variant = 'primary', className = '', disabled = false }) {
  const baseStyles = `px-4 py-2 rounded text-white font-medium transition`;
  const variants = {
    primary: 'bg-blue-600 hover:bg-blue-700',
    secondary: 'bg-gray-600 hover:bg-gray-700',
    danger: 'bg-red-600 hover:bg-red-700',
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${className} ${disabled && 'opacity-50 cursor-not-allowed'}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

Button.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func.isRequired,
  variant: PropTypes.oneOf(['primary', 'secondary', 'danger']),
  className: PropTypes.string,
  disabled: PropTypes.bool,
};
