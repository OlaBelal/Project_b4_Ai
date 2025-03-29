import React from 'react';
import { Tour } from '../types';

interface TabInformationProps {
  tour: Tour;
  onCompanyNameClick: () => void;
}

const TabInformation: React.FC<TabInformationProps> = ({ tour, onCompanyNameClick }) => {
  return (
    <div>
      {/* Title and Price */}
      <div className="flex items-center mb-2">
        <h2 className="text-3xl font-bold text-gray-900 mr-10">{tour.title}</h2>
        <div className="flex items-center space-x-4">
          <p className="text-orange-600 text-xl font-semibold">£{tour.price} / Per Couple</p>
          <div
            className={`px-3 py-1 rounded-full text-sm font-semibold ${
              tour.availableSeats && tour.availableSeats > 0
                ? 'bg-green-100 text-green-600'
                : 'bg-red-100 text-red-600'
            }`}
          >
            {tour.availableSeats && tour.availableSeats > 0 ? 'Available' : 'Sold Out'}
          </div>
        </div>
      </div>

      {/* Rating */}
      <div className="flex items-center mb-4">
        <div className="flex space-x-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <span key={star} className="text-yellow-400 text-xl">★</span>
          ))}
        </div>
        <span className="text-gray-600 ml-2 text-sm">(3.2k reviews)</span>
      </div>

      {/* Company Name and Logo */}
      <div className="flex items-center mb-4">
        <img
          src={tour.companyLogo}
          alt={tour.companyName}
          className="w-12 h-12 rounded-full mr-4"
        />
        <span
          className="text-gray-700 text-lg font-semibold cursor-pointer hover:underline"
          onClick={onCompanyNameClick}
        >
          {tour.companyName}
        </span>
      </div>

      {/* Description */}
      <p className="text-gray-700 mb-12">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
        incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur
        adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna
        aliqua.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
        incididunt ut labore et dolore magna aliqua.
      </p>

      {/* Tour Information */}
      <div className="mb-6">
        <ul className="space-y-4">
          <li className="text-gray-700">
            <strong className="text-[#DF6951] text-lg">Destination:</strong>
            <span className="ml-24">{tour.location}</span>
          </li>
          <li className="text-gray-700">
            <strong className="text-[#DF6951] text-lg">Departure Location:</strong>
            <span className="ml-8">Main Square, New City</span>
          </li>
          <li className="text-gray-700">
            <strong className="text-[#DF6951] text-lg">Departure Date:</strong>
            <span className="ml-16">2023-12-01</span>
          </li>
          <li className="text-gray-700">
            <strong className="text-[#DF6951] text-lg">Return Date:</strong>
            <span className="ml-20">2023-12-10</span>
          </li>
          <li className="text-gray-700">
            <strong className="text-[#DF6951] text-lg">Transport:</strong>
            <span className="ml-20">Bus</span>
          </li>
          <li className="text-gray-700">
            <strong className="text-[#DF6951] text-lg">Special Offer:</strong>
            <span className="ml-12">Kids under 6 travel at half price!</span>
          </li>
          <li className="text-gray-700">
            <strong className="text-[#DF6951] text-lg">Included:</strong>
            <ul className="grid grid-cols-2 gap-4 pl-4 mt-2">
              <li className="text-gray-700">5-star Accommodations</li>
              <li className="text-gray-700">Airport Transfer</li>
              <li className="text-gray-700">Breakfast</li>
              <li className="text-gray-700">Personal Guide</li>
            </ul>
          </li>
          <li className="text-gray-700">
            <strong className="text-[#DF6951] text-lg">Not Included:</strong>
            <ul className="grid grid-cols-2 gap-4 pl-4 mt-2">
              <li className="text-gray-700">Gallery Ticket</li>
              <li className="text-gray-700">Lunch</li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default TabInformation;