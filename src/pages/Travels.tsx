import React, { useState, useEffect } from 'react';
import { Star, MapPin, Clock, CalendarDays, Heart, ChevronLeft, ChevronRight } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { fetchTours, fetchDiscountedTours, fetchLeavingSoonTours } from '../services/travelService';
import { Tour } from '../types';
import { UserInteraction } from '../interfaces/userInteraction';
import { API_BASE_URL } from '../services/apiConfig';
import { saveInteraction } from '../services/localStorageService';
import { calculateTotal } from '../services/calculationService';
import { useFavorites } from '../context/FavoritesContext';
import { authService } from '../services/authService';

const Travels = () => {
  // States initialization
  const [regularTours, setRegularTours] = useState<Tour[]>([]);
  const [discountedTours, setDiscountedTours] = useState<Tour[]>([]);
  const [leavingSoonTours, setLeavingSoonTours] = useState<Tour[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  
  const navigate = useNavigate();
  const location = useLocation();
  const { toggleFavorite, isFavorite } = useFavorites();

  // Categories list
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

  // Fetch all tours data
  useEffect(() => {
    const loadAllTours = async () => {
      try {
        setLoading(true);
        const [regular, discounted, leavingSoon] = await Promise.all([
          fetchTours(),
          fetchDiscountedTours(),
          fetchLeavingSoonTours().then(res => res.items)
        ]);

        setRegularTours(regular);
        setDiscountedTours(discounted);
        setLeavingSoonTours(leavingSoon);
        setError('');
      } catch (err) {
        console.error('Error loading tours:', err);
        setError('Failed to load tours. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    loadAllTours();
  }, []);

  // Combine all tours and remove duplicates
  const allTours = React.useMemo(() => {
    const combined = [...regularTours, ...discountedTours, ...leavingSoonTours];
    return combined.filter((tour, index, self) =>
      index === self.findIndex(t => t.id === tour.id)
    );
  }, [regularTours, discountedTours, leavingSoonTours]);

  // Handle page change
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handle authentication requirement
  const requireAuth = (action: () => void) => {
    if (!authService.isAuthenticated()) {
      if (window.confirm('You need to login first. Do you want to login now?')) {
        navigate('/login', { state: { from: location.pathname } });
      }
      return false;
    }
    action();
    return true;
  };

  // Handle adding to favorites
  const handleFavorite = (tour: Tour) => {
    requireAuth(() => {
      const isCurrentlyFavorite = isFavorite(tour.id);
      toggleFavorite({
        ...tour,
        image: tour.imageUrls[0] || `${API_BASE_URL}/default-tour.jpg`
      });
      
      const interaction: UserInteraction = {
        id: tour.id.toString(),
        type: 'travel',
        checkout: 0,
        favourite: !isCurrentlyFavorite,
        booked: false,
        total: 0
      };
      
      interaction.total = calculateTotal(interaction);
      saveInteraction(interaction);
    });
  };

  // Handle viewing tour details
  const handleSeeDetails = (tour: Tour) => {
    const interaction: UserInteraction = {
      id: tour.id.toString(),
      type: 'travel',
      checkout: 0,
      favourite: isFavorite(tour.id),
      booked: false,
      total: 0
    };
    
    interaction.total = calculateTotal(interaction);
    saveInteraction(interaction);
    
    navigate('/travel-with-us', { state: { tour } });
  };

  // Handle booking
  const handleBookNow = (tour: Tour) => {
    requireAuth(() => {
      const interaction: UserInteraction = {
        id: tour.id.toString(),
        type: 'travel',
        checkout: 1,
        favourite: isFavorite(tour.id),
        booked: true,
        total: tour.price
      };
      
      saveInteraction(interaction);
      
      navigate('/payment', {
        state: {
          title: tour.title,
          price: tour.price,
          location: tour.destinationCity,
        },
      });
    });
  };

  // Filter tours based on search criteria
  const filteredTours = allTours.filter(tour => {
    // Search by title
    if (searchTerm && !tour.title.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }

    // Filter by price range
    const minPrice = priceRange.min ? Number(priceRange.min) : 0;
    const maxPrice = priceRange.max ? Number(priceRange.max) : Infinity;
    if (tour.price < minPrice || tour.price > maxPrice) {
      return false;
    }

    // Filter by categories if any selected
    if (selectedCategories.length > 0) {
      if (!tour.tags || !tour.tags.some(tag => selectedCategories.includes(tag))) {
        return false;
      }
    }

    return true;
  });

  // Pagination logic
  const totalItems = filteredTours.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentTours = filteredTours.slice(indexOfFirstItem, indexOfLastItem);

  const renderPagination = () => {
    if (totalPages <= 1) return null;

    const pageButtons = [];
    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - 2);
    let endPage = Math.min(totalPages, currentPage + 2);

    if (totalPages > maxVisiblePages) {
      if (currentPage <= 3) {
        endPage = maxVisiblePages;
      } else if (currentPage >= totalPages - 2) {
        startPage = totalPages - maxVisiblePages + 1;
      }
    }

    // Previous button
    pageButtons.push(
      <button
        key="prev"
        onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        className={`px-3 py-1 mx-1 border rounded ${currentPage === 1 ? 'bg-gray-200 cursor-not-allowed' : 'hover:bg-gray-100'}`}
      >
        <ChevronLeft size={16} />
      </button>
    );

    // First page
    if (startPage > 1) {
      pageButtons.push(
        <button
          key={1}
          onClick={() => handlePageChange(1)}
          className={`px-3 py-1 mx-1 border rounded ${1 === currentPage ? 'bg-orange-500 text-white' : 'hover:bg-gray-100'}`}
        >
          1
        </button>
      );
      if (startPage > 2) {
        pageButtons.push(<span key="start-ellipsis" className="px-2">...</span>);
      }
    }

    // Page numbers
    for (let i = startPage; i <= endPage; i++) {
      pageButtons.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`px-3 py-1 mx-1 border rounded ${i === currentPage ? 'bg-orange-500 text-white' : 'hover:bg-gray-100'}`}
        >
          {i}
        </button>
      );
    }

    // Last page
    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pageButtons.push(<span key="end-ellipsis" className="px-2">...</span>);
      }
      pageButtons.push(
        <button
          key={totalPages}
          onClick={() => handlePageChange(totalPages)}
          className={`px-3 py-1 mx-1 border rounded ${totalPages === currentPage ? 'bg-orange-500 text-white' : 'hover:bg-gray-100'}`}
        >
          {totalPages}
        </button>
      );
    }

    // Next button
    pageButtons.push(
      <button
        key="next"
        onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        className={`px-3 py-1 mx-1 border rounded ${currentPage === totalPages ? 'bg-gray-200 cursor-not-allowed' : 'hover:bg-gray-100'}`}
      >
        <ChevronRight size={16} />
      </button>
    );

    return (
      <div className="flex justify-center mt-8">
        {pageButtons}
      </div>
    );
  };

  // Helper functions
  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch {
      return dateString;
    }
  };

  const calculateDuration = (startDate: string, endDate: string) => {
    try {
      const start = new Date(startDate);
      const end = new Date(endDate);
      const diffDays = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
      return `${diffDays} days, ${diffDays - 1} nights`;
    } catch {
      return '';
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
        <p className="mt-4 text-lg">Loading tours...</p>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8 text-center">
        <div className="text-red-500 text-lg mb-4">{error}</div>
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600"
        >
          Try Again
        </button>
      </div>
    );
  }

  // Main render
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filters Section */}
        <div className="lg:w-1/4">
          <div className="bg-white rounded-lg shadow p-6 sticky top-4">
            <h2 className="text-xl font-bold mb-6">Filters</h2>
            
            {/* Search Filter */}
            <div className="mb-6">
              <label className="block font-medium mb-2">Search</label>
              <div className="relative">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setCurrentPage(1);
                  }}
                  placeholder="Search tours..."
                  className="w-full p-2 border rounded-lg pl-4 pr-10"
                />
                <span className="absolute right-3 top-2.5">🔍</span>
              </div>
            </div>

            {/* Price Filter */}
            <div className="mb-6">
              <label className="block font-medium mb-2">Price Range (EGP)</label>
              <div className="flex gap-2">
                <input
                  type="number"
                  placeholder="Min"
                  value={priceRange.min}
                  onChange={(e) => {
                    setPriceRange({...priceRange, min: e.target.value});
                    setCurrentPage(1);
                  }}
                  className="w-full p-2 border rounded"
                />
                <input
                  type="number"
                  placeholder="Max"
                  value={priceRange.max}
                  onChange={(e) => {
                    setPriceRange({...priceRange, max: e.target.value});
                    setCurrentPage(1);
                  }}
                  className="w-full p-2 border rounded"
                />
              </div>
            </div>

            {/* Categories Filter */}
            <div className="mb-6">
              <label className="block font-medium mb-2">Categories</label>
              <div className="space-y-2">
                {categories.map((category) => (
                  <div key={category} className="flex items-center">
                    <input
                      type="checkbox"
                      id={`category-${category}`}
                      checked={selectedCategories.includes(category)}
                      onChange={() => {
                        if (selectedCategories.includes(category)) {
                          setSelectedCategories(selectedCategories.filter(c => c !== category));
                        } else {
                          setSelectedCategories([...selectedCategories, category]);
                        }
                        setCurrentPage(1);
                      }}
                      className="mr-2"
                    />
                    <label htmlFor={`category-${category}`}>{category}</label>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={() => {
                setSearchTerm('');
                setPriceRange({ min: '', max: '' });
                setSelectedCategories([]);
                setCurrentPage(1);
              }}
              className="w-full py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
            >
              Reset All Filters
            </button>
          </div>
        </div>

        {/* Tours List */}
        <div className="lg:w-3/4">
          {filteredTours.length === 0 ? (
            <div className="text-center py-12">
              <h3 className="text-xl font-semibold mb-2">
                {allTours.length === 0 ? 'No tours available' : 'No matching tours found'}
              </h3>
              <p className="text-gray-600">
                {allTours.length === 0
                  ? 'There are currently no tours available.'
                  : 'Try adjusting your search filters.'}
              </p>
            </div>
          ) : (
            <>
              <div className="space-y-6">
                {currentTours.map((tour) => {
                  const isDiscounted = discountedTours.some(t => t.id === tour.id);
                  const isLeavingSoon = leavingSoonTours.some(t => t.id === tour.id);

                  return (
                    <div key={tour.id} className="bg-white rounded-lg shadow overflow-hidden hover:shadow-md transition-shadow">
                      <div className="flex flex-col md:flex-row">
                        {/* Tour Image */}
                        <div className="md:w-1/3 relative">
                          <img
                            src={
                              tour.imageUrls && tour.imageUrls.length > 0
                                ? tour.imageUrls[0].startsWith('http')
                                  ? tour.imageUrls[0]
                                  : `${API_BASE_URL}${tour.imageUrls[0]}`
                                : `${API_BASE_URL}/default-tour.jpg`
                            }
                            alt={tour.title}
                            className="w-full h-48 object-cover"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = `${API_BASE_URL}/default-tour.jpg`;
                            }}
                          />
                          {/* Badges */}
                          {(isDiscounted || isLeavingSoon) && (
                            <div className="absolute top-2 left-2 flex gap-2">
                              {isDiscounted && (
                                <span className="bg-green-500 text-white text-xs px-2 py-1 rounded">
                                  Discounted
                                </span>
                              )}
                              {isLeavingSoon && (
                                <span className="bg-red-500 text-white text-xs px-2 py-1 rounded">
                                  Leaving Soon
                                </span>
                              )}
                            </div>
                          )}
                        </div>

                        {/* Tour Details */}
                        <div className="md:w-2/3 p-6 relative">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleFavorite(tour);
                            }}
                            className="absolute top-4 right-4 p-2"
                          >
                            <Heart
                              size={28}
                              className={
                                isFavorite(tour.id)
                                  ? 'text-red-500 fill-current'
                                  : 'text-gray-400 hover:text-red-500'
                              }
                            />
                          </button>

                          <div className="flex items-baseline justify-between mb-2">
                            <div className="flex items-center gap-4">
                              <h3 className="text-xl font-bold">{tour.title}</h3>
                              <span className="text-orange-500 font-semibold text-lg">
                                {tour.price.toLocaleString()} EGP
                              </span>
                            </div>
                            
                            {tour.rating && (
                              <div className="flex items-center bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">
                                <Star className="fill-current mr-1" size={14} />
                                {tour.rating.toFixed(1)}
                              </div>
                            )}
                          </div>

                          <div className="flex items-center text-gray-600 mb-3">
                            <MapPin size={16} className="mr-1" />
                            <span>{tour.destinationCity}</span>
                          </div>

                          <div className="flex items-center text-gray-600 mb-3">
                            <CalendarDays size={16} className="mr-1" />
                            <span>
                              {tour.startDate && tour.endDate
                                ? `${formatDate(tour.startDate)} - ${formatDate(tour.endDate)}`
                                : 'Flexible dates'}
                            </span>
                          </div>

                          <div className="flex items-center text-gray-600 mb-4">
                            <Clock size={16} className="mr-1" />
                            <span>
                              {tour.startDate && tour.endDate
                                ? calculateDuration(tour.startDate, tour.endDate)
                                : 'Duration varies'}
                            </span>
                          </div>

                          <div className="flex justify-end space-x-4">
                            <button
                              className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleSeeDetails(tour);
                              }}
                            >
                              View Details
                            </button>
                            <button
                              className={`px-4 py-2 text-white rounded ${
                                tour.availableSeats > 0
                                  ? 'bg-orange-500 hover:bg-orange-600'
                                  : 'bg-gray-400 cursor-not-allowed'
                              }`}
                              onClick={(e) => {
                                e.stopPropagation();
                                if (tour.availableSeats > 0) {
                                  handleBookNow(tour);
                                }
                              }}
                              disabled={tour.availableSeats <= 0}
                            >
                              {tour.availableSeats > 0 ? 'Book Now' : 'Sold Out'}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Pagination */}
              {renderPagination()}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Travels;