import React from 'react';

const RomanticDestination = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Romantic Tropical Destinations</h2>
            <p className="text-gray-600 mb-8">
              Et labore harum non nobis ipsum eum molestias mollitia et corporis praesentium a laudantium internos. Non quis eius quo eligendi corrupti et fugiat nulla qui soluta recusandae in maxime quasi.
            </p>
            <button className="bg-orange-500 text-white px-8 py-3 rounded-md hover:bg-orange-600">
              View Packages
            </button>
          </div>
          <div className="relative">
            <img 
              src="https://images.unsplash.com/photo-1578530332818-6ba472e67b9f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
              alt="Romantic destination"
              className="rounded-lg shadow-xl"
            />
            <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-lg shadow-lg">
              <div className="flex items-center space-x-4">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80"
                  alt="Tourist"
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div>
                  <h4 className="font-semibold text-gray-900">Jenny Wilson</h4>
                  <p className="text-gray-600">Tourist</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RomanticDestination;