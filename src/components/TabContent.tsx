import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tour} from '../types';
import TabInformation from './TabInformation';
import TabTourPlan from './TabTourPlan';
import TabLocation from './TabLocation';
import TabGallery from './TabGallery';

import BookingForm from './BookingForm';

interface TabContentProps {
  activeTab: string;
  tour: Tour;
}

const TabContent: React.FC<TabContentProps> = ({ activeTab, tour }) => {


  const navigate = useNavigate();

  const handleCompanyNameClick = () => {
    navigate('/CompaniesPag', {
      state: {
        companyName: tour.companyName,
        companyLogo: tour.profileImageUrl
      }
    });
  };

  return (
    <div className="mt-8 pb-8 relative">
      <div className="flex gap-8 max-w-6xl mx-auto">
        {/* Main Content */}
        <div className="flex-1">
          {activeTab === 'Information' && (
            <TabInformation tour={tour} />
          )}

          {activeTab === 'Tour Plan' && <TabTourPlan />}

          {activeTab === 'Location' && <TabLocation tour={tour} />}

          {activeTab === 'Gallery' && <TabGallery tour={tour} />}

          
        </div>

        {/* Booking Form (Sticky to the Right) */}
        <BookingForm tour={tour} />
      </div>
    </div>
  );
};

export default TabContent;