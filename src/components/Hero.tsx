import React, { useState } from 'react';
import { Search, MapPin, Calendar, Users, X, Info } from 'lucide-react';

const activities = [
  { id: 'culture', label: 'Culture' },
  { id: 'shopping', label: 'Shopping' },
  { id: 'nightlife', label: 'Nightlife' },
  { id: 'wildlife', label: 'Wildlife' },
  { id: 'hiking', label: 'Hiking' },
  { id: 'sports', label: 'Sports' },
  { id: 'romantic', label: 'Romantic' },
  { id: 'religious', label: 'Religious' },
  { id: 'museums', label: 'Museums' },
  { id: 'beach', label: 'Beach' },
  { id: 'mountains', label: 'Mountains' },
  { id: 'cruise', label: 'Cruise' },
];

const Hero = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedActivities, setSelectedActivities] = useState<string[]>([]);
  const [destination, setDestination] = useState('');
  const [location, setLocation] = useState('');
  const [startDate, setStartDate] = useState('');
  const [travelers, setTravelers] = useState('2 adults');

  const toggleActivity = (activityId: string) => {
    setSelectedActivities(prev => 
      prev.includes(activityId) 
        ? prev.filter(id => id !== activityId)
        : [...prev, activityId]
    );
  };

  return (
    <div className="relative pt-16">
      <div 
        className="absolute inset-0 h-[600px] bg-cover bg-center"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1512453979798-5ea266f8880c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80")',
        }}
      >
        <div className="absolute inset-0 bg-black opacity-40"></div>
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
        <div className="max-w-xl">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            No matter where you're going to, we'll take you there
          </h1>
          
          <button 
            onClick={() => setIsModalOpen(true)}
            className="bg-orange-500 text-white px-8 py-3 rounded-md hover:bg-orange-600 transition-colors"
          >
            Build Your Package
          </button>
        </div>
      </div>

      {/* Build Your Own Package Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Build Your Own Package</h2>
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Destination Selection */}
              <div className="space-y-6">
                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Primary Destination (country/region or city)
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={destination}
                      onChange={(e) => setDestination(e.target.value)}
                      placeholder="Switzerland"
                      className="w-full pl-4 pr-10 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                    <Info className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  </div>
                </div>

                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Specific Location (optional)
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      placeholder="Lauterbrunnen"
                      className="w-full pl-4 pr-10 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                    <Info className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Start Date
                    </label>
                    <input
                      type="date"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Travelers
                    </label>
                    <select
                      value={travelers}
                      onChange={(e) => setTravelers(e.target.value)}
                      className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                    >
                      <option>1 adult</option>
                      <option>2 adults</option>
                      <option>2 adults, 1 child</option>
                      <option>2 adults, 2 children</option>
                      <option>Group (5+)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Activities and Interests (optional)
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {activities.map((activity) => (
                      <button
                        key={activity.id}
                        onClick={() => toggleActivity(activity.id)}
                        className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                          selectedActivities.includes(activity.id)
                            ? 'bg-orange-500 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {activity.label}
                      </button>
                    ))}
                  </div>
                </div>

                <button 
                  onClick={() => {
                    // Handle package building logic here
                    setIsModalOpen(false);
                  }}
                  className="w-full bg-orange-500 text-white py-3 rounded-md hover:bg-orange-600 transition-colors font-medium"
                >
                  Build Package
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="flex items-center justify-between space-x-8 overflow-x-auto py-4">
          <CategoryButton icon="🏖️" label="Beaches" />
          <CategoryButton icon="🏛️" label="Heritage" />
          <CategoryButton icon="🏔️" label="Mountains" />
          <CategoryButton icon="🌆" label="Cities" />
          <CategoryButton icon="🏺" label="Museums" />
        </div>
      </div>
    </div>
  );
};

const CategoryButton = ({ icon, label }: { icon: string; label: string }) => (
  <button className="flex flex-col items-center space-y-2 text-white hover:text-orange-500 transition-colors">
    <span className="text-2xl">{icon}</span>
    <span className="text-sm font-medium">{label}</span>
  </button>
);

export default Hero;