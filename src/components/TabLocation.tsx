import React from 'react';
import { Tour } from '../types';

const encodeLocation = (location: string) => {
  return encodeURIComponent(location);
};

const TabLocation: React.FC<{ tour: Tour }> = ({ tour }) => {
  return (
    <div>
      <h2 className="text-4xl font-bold text-[#DF6951] mb-4">Location</h2>
      <div className="bg-gray-200 h-96 rounded-lg overflow-hidden">
        {tour.destinationCity ? (
          <iframe
            src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d108744.98444505!2d8.466675499999999!3d47.3774336!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47900b9749bea219%3A0xe66e8df1e71fdc03!2s${encodeLocation(tour.location)}!5e0!3m2!1sen!2sus!4v1699999999999!5m2!1sen!2sus`}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        ) : (
          <div className="flex items-center justify-center h-full text-gray-600">
            No location provided.
          </div>
        )}
      </div>
      <li className="pt-4">
        <span>{tour.destinationCity}</span> This destination offers a variety of transport options, including public transit, car rentals, and guided tours for convenient travel. You can explore a range of accommodations, from luxury hotels to cozy boutique stays, ensuring a comfortable visit. Additionally, the area is home to popular attractions, local eateries, and cultural landmarks, making it a perfect spot for both adventure and relaxation.
      </li>
    </div>
  );
};

export default TabLocation;