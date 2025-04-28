import React from 'react';
import { Tour } from '../types';
import { API_BASE_URL } from '../services/apiConfig';

interface TabInformationProps {
  tour: Tour;
  onCompanyNameClick: () => void;
}

const TabInformation: React.FC<TabInformationProps> = ({ tour, onCompanyNameClick }) => {
  // Helper function to calculate duration
  const calculateDuration = (startDate?: string, endDate?: string): string => {
    if (!startDate || !endDate) return '';
    try {
      const start = new Date(startDate);
      const end = new Date(endDate);
      const diffTime = Math.abs(end.getTime() - start.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return `${diffDays} days`;
    } catch {
      return '';
    }
  };

  return (
    <div>
      {/* Title and Price */}
      <div className="flex items-center mb-2">
        <h2 className="text-3xl font-bold text-gray-900 mr-10">{tour.title}</h2>
        <div className="flex items-center space-x-4">
          <p className="text-orange-600 text-xl font-semibold">£{tour.price} / Per Couple</p>
          <div
            className={`px-3 py-1 rounded-full text-sm font-semibold ${
              tour.availableSeats > 0
                ? 'bg-green-100 text-green-600'
                : 'bg-red-100 text-red-600'
            }`}
          >
            {tour.availableSeats > 0 ? 'Available' : 'Sold Out'}
          </div>
        </div>
      </div>

      {/* Rating */}
      {tour.rating && (
        <div className="flex items-center mb-4">
          <div className="flex space-x-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <span key={star} className="text-yellow-400 text-xl">
                {star <= Math.round(tour.rating) ? '★' : '☆'}
              </span>
            ))}
          </div>
          <span className="text-gray-600 ml-2 text-sm">
            (No reviews yet)
          </span>
        </div>
      )}

      {/* Company Name and Logo */}
      {tour.companyName && (
        <div className="flex items-center mb-4">
          <img
            src={`${API_BASE_URL}/default-company.png`}
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
      )}

      {/* Description */}
      {tour.description && (
        <p className="text-gray-700 mb-12 whitespace-pre-line">
          {tour.description}
        </p>
      )}

      {/* Tour Information */}
      <div className="mb-6">
        <ul className="space-y-4">
          <li className="text-gray-700">
            <strong className="text-[#DF6951] text-lg">Destination:</strong>
            <span className="ml-24">{tour.destinationCity}</span>
          </li>
          <li className="text-gray-700">
            <strong className="text-[#DF6951] text-lg">Departure Location:</strong>
            <span className="ml-8">{tour.departurePoint}</span>
          </li>
          <li className="text-gray-700">
            <strong className="text-[#DF6951] text-lg">Departure Date:</strong>
            <span className="ml-16">{new Date(tour.startDate).toLocaleDateString()}</span>
          </li>
          <li className="text-gray-700">
            <strong className="text-[#DF6951] text-lg">Return Date:</strong>
            <span className="ml-20">{new Date(tour.endDate).toLocaleDateString()}</span>
          </li>
          <li className="text-gray-700">
            <strong className="text-[#DF6951] text-lg">Duration:</strong>
            <span className="ml-20">{calculateDuration(tour.startDate, tour.endDate)}</span>
          </li>
          <li className="text-gray-700">
            <strong className="text-[#DF6951] text-lg">Transport:</strong>
            <span className="ml-20">{tour.transportationType}</span>
          </li>
          <li className="text-gray-700">
            <strong className="text-[#DF6951] text-lg">Special Offer:</strong>
            <span className="ml-12">Kids under 6 travel at half price!</span>
          </li>
          {/* Amenities */}
          {tour.amenities && tour.amenities.length > 0 && (
            <li className="text-gray-700">
              <strong className="text-[#DF6951] text-lg">Amenities:</strong>
              <ul className="grid grid-cols-2 gap-4 pl-4 mt-2">
                {tour.amenities.map((amenity, index) => (
                  <li key={index} className="text-gray-700">
                    {amenity}
                  </li>
                ))}
              </ul>
            </li>
          )}

          {/* Static Sections as requested */}
          
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

      {/* Itinerary */}
      {tour.itineraries && tour.itineraries.length > 0 && (
        <div className="mb-6">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Itinerary</h3>
          <div className="space-y-4">
            {tour.itineraries.map((day, index) => (
              <div key={index} className="bg-gray-50 p-4 rounded-lg">
                <h4 className="text-lg font-semibold text-[#DF6951]">Day {day.dayNumber}</h4>
                <ul className="list-disc pl-5 mt-2 space-y-1">
                  {day.activities.map((activity, i) => (
                    <li key={i} className="text-gray-700">{activity}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TabInformation;