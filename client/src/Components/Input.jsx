import React from 'react';

const Input = React.forwardRef(({ type, placeholder, className, label, ...props }, ref) => {
  return (
    <div className='w-full'>
      {label && (
        <label className="text-sm text-gray-700 mb-1 floating-label">
          {label}
        </label>
      )}
      <input
        type={type}
        placeholder={placeholder}
        className={`${className} input cursor-pointer`}
        ref={ref}                // ✅ Pass ref correctly
        {...props}
      />
    </div>
  );
});

export default Input;
