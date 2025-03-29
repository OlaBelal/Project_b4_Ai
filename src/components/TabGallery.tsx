import React from 'react';
import { Tour } from '../types';

const TabGallery: React.FC<{ tour: Tour }> = ({ tour }) => {
  return (
    <div>
      <h2 className="text-4xl font-bold text-[#DF6951] mb-4">Gallery</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[1, 2, 3, 4, 5, 6].map((item) => (
          <img
            key={item}
            src={`https://via.placeholder.com/300x200?text=${tour?.title}+${item}`}
            alt={`Gallery ${item}`}
            className="w-full h-48 object-cover rounded-lg"
          />
        ))}
      </div>
    </div>
  );
};

export default TabGallery;