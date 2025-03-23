import React from 'react';
import tiaraImage from '../assets/images/tiara.png'; // Import the tiara image

interface Tour {
  title?: string;
  location?: string;
  companyName?: string;
  companyLogo?: string;
  availableSeats?: number;
  price?: number;
}

interface TabContentProps {
  activeTab: string;
  tour: Tour;
}

const TabContent: React.FC<TabContentProps> = ({ activeTab, tour }) => {
  // Function to encode the location for the Google Maps URL
  const encodeLocation = (location: string) => {
    return encodeURIComponent(location);
  };

  return (
    <div className="mt-8 pb-8 relative">
      <div className="flex gap-8 max-w-6xl mx-auto">
        {/* Main Content */}
        <div className="flex-1">
          {activeTab === 'Information' && (
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
                <span className="text-gray-700 text-lg font-semibold">{tour.companyName}</span>
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
          )}

          {activeTab === 'Tour Plan' && (
            <div>
              <h2 className="text-4xl font-bold text-[#DF6951] mb-4">Tour Plan</h2>
              <div className="relative">
                {/* Vertical Timeline */}
                <div className="absolute left-4 h-full border-l-2 border-gray-300 border-dashed"></div>

                {/* Day 1 */}
                <div className="flex items-start mb-8">
                  <div className="w-10 h-10 flex items-center justify-center bg-[#DF6951] text-white rounded-full z-10">
                    <span className="text-sm font-bold">01</span>
                  </div>
                  <div className="ml-6 flex-1">
                    <h3 className="text-xl font-bold mb-2">Day 1: Departure</h3>
                    <p className="text-gray-700 mb-4">
                      Ullam Temporibus Voluptariae Qui Quia Commodi Rem Praesentium Alias. Ea Voluptates Officia Sed Molestiae Sint Et Voluptas Quae Qui Harum Repudiandae Collium Dolorem.
                    </p>
                    <ul className="text-gray-700 space-y-2">
                      <li>5 Star Accommodation</li>
                      <li>Breakfast</li>
                    </ul>
                  </div>
                </div>

                {/* Day 2 */}
                <div className="flex items-start mb-8">
                  <div className="w-10 h-10 flex items-center justify-center bg-[#DF6951] text-white rounded-full z-10">
                    <span className="text-sm font-bold">02</span>
                  </div>
                  <div className="ml-6 flex-1">
                    <h3 className="text-xl font-bold mb-2">Day 2: Visitin, Geneva And Zermatt</h3>
                    <p className="text-gray-700 mb-4">
                      Donec Quam Felis, Ultricies Nec, Pellentesque Eu, Pretium Quis, Sem. Nulla Consequat Massa Quis Enim. Donec Pede Justo, Fringilla Vel, Aliquet Nec, Vulputate Eget, Arcu. In Enim Justo, Rhoncus Ut, Imperdiet.
                    </p>
                    <ul className="text-gray-700 space-y-2">
                      <li>5 Star Accommodation</li>
                      <li>Breakfast</li>
                    </ul>
                  </div>
                </div>

                {/* Day 3 */}
                <div className="flex items-start mb-8">
                  <div className="w-10 h-10 flex items-center justify-center bg-[#DF6951] text-white rounded-full z-10">
                    <span className="text-sm font-bold">03</span>
                  </div>
                  <div className="ml-6 flex-1">
                    <h3 className="text-xl font-bold mb-2">Day 3: Rest</h3>
                    <p className="text-gray-700 mb-4">
                      Donec Quam Felis, Ultricies Nec, Pellentesque Eu, Pretium Quis, Sem. Nulla Consequat Massa Quis Enim. Donec Pede Justo, Fringilla Vel, Aliquet Nec, Vulputate Eget, Arcu. In Enim Justo, Rhoncus Ut, Imperdiet.
                    </p>
                    <ul className="text-gray-700 space-y-2">
                      <li>5 Star Accommodation</li>
                      <li>Breakfast</li>
                    </ul>
                  </div>
                </div>

                {/* Day 4 */}
                <div className="flex items-start mb-8">
                  <div className="w-10 h-10 flex items-center justify-center bg-[#DF6951] text-white rounded-full z-10">
                    <span className="text-sm font-bold">04</span>
                  </div>
                  <div className="ml-6 flex-1">
                    <h3 className="text-xl font-bold mb-2">Day 4: Historical Tour</h3>
                    <p className="text-gray-700 mb-4">
                      Donec Quam Felis, Ultricies Nec, Pellentesque Eu, Pretium Quis, Sem. Nulla Consequat Massa Quis Enim. Donec Pede Justo, Fringilla Vel, Aliquet Nec, Vulputate Eget, Arcu. In Enim Justo, Rhoncus Ut, Imperdiet.
                    </p>
                    <ul className="text-gray-700 space-y-2">
                      <li>5 Star Accommodation</li>
                      <li>Breakfast</li>
                    </ul>
                  </div>
                </div>

                {/* Day 5 */}
                <div className="flex items-start mb-8">
                  <div className="w-10 h-10 flex items-center justify-center bg-[#DF6951] text-white rounded-full z-10">
                    <span className="text-sm font-bold">05</span>
                  </div>
                  <div className="ml-6 flex-1">
                    <h3 className="text-xl font-bold mb-2">Day 5: Return</h3>
                    <p className="text-gray-700 mb-4">
                      Donec Quam Felis, Ultricies Nec, Pellentesque Eu, Pretium Quis, Sem. Nulla Consequat Massa Quis Enim. Donec Pede Justo, Fringilla Vel, Aliquet Nec, Vulputate Eget, Arcu. In Enim Justo, Rhoncus Ut, Imperdiet A, Venenatis Vitae, Justo. Nullam Dictum Felis Eu Pede Mollis Pretium.
                    </p>
                    <ul className="text-gray-700 space-y-2">
                      <li>5 Star Accommodation</li>
                      <li>Breakfast</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'Location' && (
            <div>
              <h2 className="text-4xl font-bold text-[#DF6951] mb-4">Location</h2>
              <div className="bg-gray-200 h-96 rounded-lg overflow-hidden">
                {/* Embedded Google Map */}
                {tour.location ? (
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
            </div>
          )}

          {activeTab === 'Gallery' && (
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
          )}
        </div>

        {/* Booking Form (Sticky to the Right) */}
        <div className="w-80 sticky top-8 self-start">
          <div className="bg-gray-100 p-6 rounded-lg h-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Book This Tour</h2>

            {/* Booking Form */}
            <form className="space-y-4">
              <input
                type="text"
                placeholder="Name"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#DF6951]"
              />
              <input
                type="email"
                placeholder="Email"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#DF6951]"
              />
              <input
                type="email"
                placeholder="Confirm Email"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#DF6951]"
              />
              <input
                type="tel"
                placeholder="Phone"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#DF6951]"
              />
              <input
                type="text"
                placeholder="Date (dd-mm-yy)"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#DF6951]"
              />
              <input
                type="number"
                placeholder="Number of tickets"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#DF6951]"
              />
              <textarea
                placeholder="Message"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#DF6951]"
                rows={4}
              ></textarea>

              {/* Buttons */}
              <div className="flex space-x-4">
                <button
                  type="button"
                  className="flex-1 bg-[#DF6951] text-white py-3 rounded-lg hover:bg-[#C9563F] transition-colors"
                >
                  Check Availability
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition-colors"
                >
                  Book Now
                </button>
              </div>
            </form>
          </div>

          {/* Image under the booking container */}
          <div className="w-full px-0 mt-4">
            <img
              src={tiaraImage}
              alt="Tiara"
              className="w-full h-68 object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TabContent;