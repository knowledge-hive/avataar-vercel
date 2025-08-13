import React from 'react';
import classNames from 'classnames';

export const Heading = ({ 
  level = 1, 
  variant = 'default', 
  children, 
  className,
  ...props 
}) => {
  const HeadingTag = `h${level}`;
  
  const headingClasses = classNames(
    {
      'text-3xl font-bold': level === 1,
      'text-2xl font-semibold': level === 2,
      'text-xl font-semibold': level === 3,
      'text-lg font-medium': level === 4,
      'text-base font-medium': level === 5,
      'text-sm font-medium': level === 6,
      'text-gray-900': variant === 'default' || variant === 'primary',
      'text-gray-600': variant === 'secondary',
      'text-white': variant === 'inverse',
    },
    className
  );

  return (
    <HeadingTag className={headingClasses} {...props}>
      {children}
    </HeadingTag>
  );
};