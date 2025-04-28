import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import HeaderSection from '../components/HeaderSection';
import NavigationTabs from '../components/NavigationTabs';
import TabContent from '../components/TabContent';
import zr3Image from '../assets/images/zr3.png';

interface Tour {
  id: number;
  title: string;
  description?: string;
  price: number;
  location: string;
  image: string;
  latitude?: number;
  longitude?: number;
  availableSeats?: number;
  companyName?: string;
  companyLogo?: string;
  included?: string[];
  excluded?: string[];
}

const TravelWithUs: React.FC = () => {
  const location = useLocation();
  
  // Make sure tour has all the required properties
  const tour = location.state?.tour as Tour;

  const [activeTab, setActiveTab] = useState<string>('Information');

  return (
    <div className="min-h-screen bg-gray-100 pb-8">
      {/* Top Section with Background Image */}
      <HeaderSection tour={tour} />

      {/* Container for Navigation and Content */}
      <div className="container mx-auto px-4 -mt-10 z-0 relative bg-white p-6 rounded-lg shadow-lg max-w-[1150px]">
        {/* Navigation Tabs */}
        <NavigationTabs activeTab={activeTab} setActiveTab={setActiveTab} />

        {/* Content Based on Active Tab */}
        <div className="pb-32">
          <TabContent activeTab={activeTab} tour={tour} />
        </div>

        {/* Image at the bottom-left corner of the container */}
        <div className="absolute bottom-0 left-0">
          <img
            src={zr3Image}
            alt="ZR3"
            className="w-60 h-auto"
          />
        </div>
      </div>
    </div>
  );
};

export default TravelWithUs;
