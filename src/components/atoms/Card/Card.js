import React from 'react';
import classNames from 'classnames';

export const Card = ({ 
  children, 
  className, 
  style, 
  padding = 'default',
  elevation = 'default',
  ...props 
}) => {
  const cardClasses = classNames(
    'bg-white border border-gray-200 rounded-lg',
    {
      'p-2': padding === 'small',
      'p-4': padding === 'default',
      'p-6': padding === 'large',
      'shadow-sm': elevation === 'small',
      'shadow-md': elevation === 'default',
      'shadow-lg': elevation === 'large',
    },
    className
  );

  return (
    <div className={cardClasses} style={style} {...props}>
      {children}
    </div>
  );
};