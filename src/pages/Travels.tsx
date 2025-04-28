import React, { useState, useEffect } from 'react';
import { Star, X, MapPin, Clock, Users, CalendarDays, Utensils, Wifi, Bus } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';

const travels = [
  {
    id: 1,
    title: "Siwa trip 4 days, 3 nights with a lot of activities",
    rating: 4.5,
    reviews: 1084,
    price: 3500,
    originalPrice: 5000,
    hotelName: "Siwa Oasis Resort",
    image: "https://images.unsplash.com/photo-1547234935-80c7145ec969?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    availableUntil: "August 28, 2025",
    description: "Discover the magic of Siwa Oasis with this comprehensive 4-day package. Experience traditional Berber culture, explore ancient ruins, and relax in natural hot springs.",
    highlights: [
      "Desert safari adventure",
      "Visit to ancient temples",
      "Traditional Berber dinner",
      "Hot springs experience",
      "Mountain biking"
    ],
    amenities: ["Free Breakfast", "Free Internet", "Pool", "Desert Tours", "Bike Rental"],
    itinerary: [
      {
        day: 1,
        activities: ["Airport transfer", "Welcome dinner", "Hotel check-in"]
      },
      {
        day: 2,
        activities: ["Desert safari", "Visit to Oracle Temple", "Traditional dinner"]
      },
      {
        day: 3,
        activities: ["Hot springs visit", "Mountain biking", "Sunset viewing"]
      },
      {
        day: 4,
        activities: ["Local market visit", "Departure"]
      }
    ],
    location: "Siwa Oasis, Egypt",
    duration: "4 days, 3 nights",
    company: "Luxury Voyages",
    groupSize: "8-12 people",
    meals: "Breakfast included",
    tags: ["Adventure", "Cultural", "Desert Safari"]
  },
  {
    id: 2,
    title: "Newiba trip 3 days, 2 nights with a lot of activities",
    rating: 4.5,
    reviews: 1084,
    price: 2500,
    originalPrice: 5000,
    hotelName: "Newiba Beach Resort",
    image: "https://images.unsplash.com/photo-1590708669751-3b240de0c317?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    availableUntil: "September 4, 2025",
    description: "Experience the pristine beaches and crystal-clear waters of Newiba. This package includes snorkeling, beach activities, and comfortable accommodation.",
    highlights: [
      "Snorkeling in coral reefs",
      "Beach camping",
      "Seafood BBQ",
      "Sunset boat trip",
      "Beach volleyball"
    ],
    amenities: ["Free Breakfast & Dinner", "Free Internet", "Beach Access", "Water Sports"],
    itinerary: [
      {
        day: 1,
        activities: ["Resort check-in", "Beach orientation", "Welcome dinner"]
      },
      {
        day: 2,
        activities: ["Snorkeling trip", "Beach camping", "Seafood BBQ"]
      },
      {
        day: 3,
        activities: ["Morning yoga", "Departure"]
      }
    ],
    location: "Newiba, Egypt",
    duration: "3 days, 2 nights",
    company: "Adventure Quest Tours",
    groupSize: "6-10 people",
    meals: "Half board",
    tags: ["Beach & Sun", "Adventure"]
  },
  {
    id: 3,
    title: "Luxor trip 6 days, 5 nights with a lot of activities",
    rating: 4.8,
    reviews: 570,
    price: 8500,
    originalPrice: 10000,
    hotelName: "Luxor Palace Hotel",
    image: "https://images.unsplash.com/photo-1539768942893-daf53e448371?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    availableUntil: "Tomorrow",
    isLimitedTime: true,
    description: "Immerse yourself in ancient Egyptian history with this comprehensive Luxor package. Visit iconic temples, tombs, and enjoy luxury accommodation.",
    highlights: [
      "Valley of the Kings tour",
      "Karnak Temple visit",
      "Nile felucca ride",
      "Hot air balloon ride",
      "Sound and light show"
    ],
    amenities: ["Free Breakfast", "Free Dinner", "Free Internet", "Pool"],
    itinerary: [
      {
        day: 1,
        activities: ["Airport pickup", "Hotel check-in", "Evening sound and light show"]
      },
      {
        day: 2,
        activities: ["Valley of the Kings tour", "Hatshepsut Temple visit"]
      },
      {
        day: 3,
        activities: ["Hot air balloon ride", "Karnak Temple tour"]
      },
      {
        day: 4,
        activities: ["Luxor Temple visit", "Nile felucca ride"]
      },
      {
        day: 5,
        activities: ["Local market visit", "Farewell dinner"]
      },
      {
        day: 6,
        activities: ["Free morning", "Departure"]
      }
    ],
    location: "Luxor, Egypt",
    duration: "6 days, 5 nights",
    company: "Cultural Expeditions",
    groupSize: "10-15 people",
    meals: "Half board",
    tags: ["Cultural", "Historical", "Luxury"]
  },
  {
    id: 4,
    title: "Dahab trip 5 days, 4 nights with a lot of activities",
    rating: 4.7,
    reviews: 570,
    price: 6500,
    originalPrice: 8000,
    hotelName: "Dahab Bay Resort",
    image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    availableUntil: "July 30, 2025",
    description: "Enjoy the laid-back atmosphere of Dahab while experiencing world-class diving and water sports. Perfect for adventure seekers and nature lovers.",
    highlights: [
      "Scuba diving",
      "Blue Hole visit",
      "Windsurfing lessons",
      "Desert dinner",
      "Mountain hiking"
    ],
    amenities: ["Free Internet", "Free Inside transportation", "Diving Equipment", "Beach Access"],
    itinerary: [
      {
        day: 1,
        activities: ["Airport transfer", "Resort check-in", "Beach orientation"]
      },
      {
        day: 2,
        activities: ["Diving lesson", "Blue Hole visit"]
      },
      {
        day: 3,
        activities: ["Windsurfing", "Desert dinner"]
      },
      {
        day: 4,
        activities: ["Mountain hiking", "Snorkeling"]
      },
      {
        day: 5,
        activities: ["Free morning", "Departure"]
      }
    ],
    location: "Dahab, Egypt",
    duration: "5 days, 4 nights",
    company: "Luxury Voyages",
    groupSize: "8-12 people",
    meals: "Breakfast included",
    tags: ["Beach & Sun", "Adventure", "Diving"]
  }
];

const categories = [
  "Beach & Sun",
  "Cultural",
  "Adventure",
  "Desert Safari",
  "Historical",
  "Diving",
  "Relaxation",
  "Romantic",
  "Family Friendly",
  "Luxury"
];

const relatedSearches = [
  "Red Sea",
  "Giza Pyramids",
  "Phone OnePlus",
  "North Coast",
  "Sahara Dessert",
  "Phone under 50,000"
];

const TravelDetailsModal = ({ trip, onClose }: { trip: any; onClose: () => void }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="relative">
          <img
            src={trip.image}
            alt={trip.title}
            className="w-full h-64 object-cover rounded-t-xl"
          />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-white/80 p-2 rounded-full hover:bg-white transition-all"
          >
            <X size={24} />
          </button>
        </div>

        <div className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded">Recommended</span>
          </div>

          <h2 className="text-2xl font-bold mb-2">{trip.title}</h2>
          
          <div className="flex items-center mb-4">
            <div className="flex">
              {Array.from({ length: 5 }).map((_, index) => (
                <Star
                  key={index}
                  size={16}
                  className={index < Math.floor(trip.rating) ? "text-yellow-400 fill-current" : "text-gray-300"}
                />
              ))}
            </div>
            <span className="ml-2 text-gray-600">• {trip.reviews} reviews</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <MapPin size={20} className="text-gray-500" />
                <span>{trip.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock size={20} className="text-gray-500" />
                <span>{trip.duration}</span>
              </div>
              <div className="flex items-center gap-2">
                <Users size={20} className="text-gray-500" />
                <span>{trip.groupSize}</span>
              </div>
              <div className="flex items-center gap-2">
                <CalendarDays size={20} className="text-gray-500" />
                <span>Available until {trip.availableUntil}</span>
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="text-3xl font-bold text-red-600 mb-2">{trip.price} EG</div>
              <button className="w-full bg-red-500 text-white py-3 rounded-lg hover:bg-red-600 transition-colors">
                Book Now
              </button>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-3">Description</h3>
            <p className="text-gray-600">{trip.description}</p>
          </div>

          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-3">Trip Highlights</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {trip.highlights.map((highlight: string, index: number) => (
                <div key={index} className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                  <span>{highlight}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-3">Amenities</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {trip.amenities.map((amenity: string, index: number) => (
                <div key={index} className="flex items-center gap-2">
                  {amenity.includes('Breakfast') && <Utensils size={20} className="text-gray-50" />}
                  {amenity.includes('Internet') && <Wifi size={20} className="text-gray-500" />}
                  {amenity.includes('transportation') && <Bus size={20} className="text-gray-500" />}
                  <span>{amenity}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-3">Itinerary</h3>
            <div className="space-y-4">
              {trip.itinerary.map((day: any) => (
                <div key={day.day} className="border-l-2 border-orange-500 pl-4">
                  <h4 className="font-semibold mb-2">Day {day.day}</h4>
                  <ul className="space-y-1">
                    {day.activities.map((activity: string, index: number) => (
                      <li key={index} className="text-gray-600">• {activity}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Travels = () => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTrip, setSelectedTrip] = useState<any>(null);
  const [company, setCompany] = useState<string | null>(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    
    // Handle company
    const companyParam = params.get('company');
    if (companyParam) {
      setCompany(companyParam);
    } else {
      const storedCompany = localStorage.getItem('selectedCompany');
      if (storedCompany) setCompany(storedCompany);
    }

    // Handle categories
    const categoriesParam = params.get('categories');
    if (categoriesParam) {
      setSelectedCategories(categoriesParam.split(','));
    }

    // Handle search term
    const searchParam = params.get('search');
    if (searchParam) setSearchTerm(searchParam);

    // Handle price range
    const minPrice = params.get('minPrice');
    const maxPrice = params.get('maxPrice');
    if (minPrice || maxPrice) {
      setPriceRange({
        min: minPrice || '',
        max: maxPrice || ''
      });
    }
  }, [location.search]);

  useEffect(() => {
    const params = new URLSearchParams();
    
    if (company) params.set('company', company);
    if (searchTerm) params.set('search', searchTerm);
    if (selectedCategories.length > 0) {
      params.set('categories', selectedCategories.join(','));
    }
    if (priceRange.min) params.set('minPrice', priceRange.min);
    if (priceRange.max) params.set('maxPrice', priceRange.max);

    navigate(`?${params.toString()}`, { replace: true });
  }, [company, searchTerm, selectedCategories, priceRange, navigate]);

  const handleCategoryChange = (category: string) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const handlePriceRangeChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'min' | 'max') => {
    const value = e.target.value;
    setPriceRange(prev => ({
      ...prev,
      [type]: value
    }));
  };

  const filteredTravels = travels.filter(trip => {
    // Company filter
    if (company && trip.company !== company) return false;

    // Search term filter
    if (searchTerm && !trip.title.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }

    // Price range filter
    const minPrice = priceRange.min ? parseInt(priceRange.min) : 0;
    const maxPrice = priceRange.max ? parseInt(priceRange.max) : Infinity;
    if (trip.price < minPrice || trip.price > maxPrice) return false;

    // Categories filter - match ANY of the selected categories
    if (selectedCategories.length > 0) {
      // Check if trip has tags that match any selected category
      if (!trip.tags) return false;
      return selectedCategories.some(cat => 
        trip.tags.some((tripTag: string) => 
          tripTag.toLowerCase().includes(cat.toLowerCase())
        )
      );
    }

    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filters Sidebar */}
        <div className="lg:w-1/4">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="mb-6">
              <h3 className="font-semibold mb-2">Trip Name</h3>
              <div className="relative">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search..."
                  className="w-full p-2 border rounded-lg pr-10"
                />
                <button className="absolute right-2 top-1/2 -translate-y-1/2">
                  🔍
                </button>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="font-semibold mb-2">Categories</h3>
              <div className="space-y-2">
                {categories.map((category) => (
                  <div key={category} className="flex items-center">
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedCategories.includes(category)}
                        onChange={() => handleCategoryChange(category)}
                        className="rounded text-orange-500 focus:ring-orange-500"
                      />
                      <span className={selectedCategories.includes(category) ? "font-medium" : ""}>
                        {category}
                      </span>
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <h3 className="font-semibold mb-2">Price</h3>
              <div className="space-y-2">
                {['Under 1000 EG', '1000 EG - 5000 EG', '5000 EG - 10,000 EG', 'Over 10,000 EG'].map((range) => (
                  <div key={range} className="flex items-center">
                    <input type="radio" name="price" className="mr-2" />
                    <label>{range}</label>
                  </div>
                ))}
              </div>
              <div className="flex gap-2 mt-4">
                <input
                  type="number"
                  placeholder="Min"
                  value={priceRange.min}
                  onChange={(e) => handlePriceRangeChange(e, 'min')}
                  className="w-20 p-1 border rounded"
                />
                <input
                  type="number"
                  placeholder="Max"
                  value={priceRange.max}
                  onChange={(e) => handlePriceRangeChange(e, 'max')}
                  className="w-20 p-1 border rounded"
                />
                <button 
                  onClick={() => setPriceRange({ min: '', max: '' })}
                  className="bg-gray-200 px-3 rounded hover:bg-gray-300"
                >
                  Reset
                </button>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Deals</h3>
              <div className="flex items-center">
                <input type="checkbox" className="mr-2" />
                <label>Today's Deals</label>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:w-3/4">
          {filteredTravels.length === 0 ? (
            <div className="text-center py-8">
              <h3 className="text-xl font-semibold text-gray-700">No trips found</h3>
              <p className="text-gray-500 mt-2">Try adjusting your filters or search criteria</p>
            </div>
          ) : (
            filteredTravels.map((trip) => (
              <div 
                key={trip.id} 
                className="bg-white rounded-lg shadow mb-6 p-4 cursor-pointer hover:shadow-lg transition-shadow"
                onClick={() => setSelectedTrip(trip)}
              >
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="md:w-1/3">
                    <img
                      src={trip.image}
                      alt={trip.title}
                      className="w-full h-48 object-cover rounded-lg"
                    />
                  </div>
                  <div className="md:w-2/3">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center mb-2">
                          <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded">Recommended</span>
                        </div>
                        <h2 className="text-xl font-semibold mb-2">{trip.title}</h2>
                        <div className="flex items-center mb-2">
                          <div className="flex">
                            {Array.from({ length: 5 }).map((_, index) => (
                              <Star
                                key={index}
                                size={16}
                                className={index < Math.floor(trip.rating) ? "text-yellow-400 fill-current" : "text-gray-300"}
                              />
                            ))}
                          </div>
                          <span className="ml-2 text-gray-600">• {trip.reviews} reviews</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <span className="text-2xl font-bold text-red-600">{trip.price}EG</span>
                      {trip.originalPrice && (
                        <span className="ml-2 text-sm text-gray-500 line-through">{trip.originalPrice}EG</span>
                      )}
                    </div>
                    
                    <div className="text-sm text-gray-600">
                      <div className="flex items-center mb-1">
                        <span className="text-blue-500">• {trip.hotelName}</span>
                      </div>
                      <div>This offer is available until {trip.availableUntil}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}

          {/* Related Searches */}
          <div className="mt-8">
            <h3 className="font-semibold mb-4">RELATED</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {relatedSearches.map((search) => (
                <button
                  key={search}
                  className="p-3 bg-white rounded-lg shadow text-left hover:shadow-md transition-shadow"
                >
                  {search}
                </button>
              ))}
            </div>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-center mt-8 gap-2">
            <button className="px-3 py-1 border rounded hover:bg-gray-100">Previous</button>
            {[1, 2, 3, '...', 98].map((page, index) => (
              <button
                key={index}
                className={`px-3 py-1 border rounded ${page === 1 ? 'bg-blue-500 text-white' : 'hover:bg-gray-100'}`}
              >
                {page}
              </button>
            ))}
            <button className="px-3 py-1 border rounded hover:bg-gray-100">Next</button>
          </div>
        </div>
      </div>

      {/* Travel Details Modal */}
      {selectedTrip && (
        <TravelDetailsModal
          trip={selectedTrip}
          onClose={() => setSelectedTrip(null)}
        />
      )}
    </div>
  );
};

export default Travels;