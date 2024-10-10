import React, { useState } from 'react';

const SizeSelector = () => {
  const [selectedSize, setSelectedSize] = useState("");  // To keep track of selected size
  const sizes = ["S", "M", "L", "XL", "2XL"];

  const handleSizeSelect = (size) => {
    setSelectedSize(size);
  };

  return (
    <div className='flex flex-col gap-2 my-2'>
      <div className='flex justify-between items-center'>
        <label htmlFor="size" className='font-medium'>Select Size</label>
        <a href='#' className='text-red-400 font-medium'>Size Guide</a>
      </div>
      <div className='flex gap-2'>
        {sizes.map((size) => (
          <button
            key={size}
            className={`border-2 px-4 py-2 rounded-full ${
              selectedSize === size ? 'border-red-600 text-red-600' : 'border-gray-300 text-gray-600'
            }`}
            onClick={() => handleSizeSelect(size)}
          >
            {size}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SizeSelector;
