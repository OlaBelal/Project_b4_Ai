import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

const Partners = () => {
  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-xl font-medium text-gray-600">Trusted by World-Leading Travel Companies</h2>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 items-center justify-items-center">
          {/* Emirates */}
          <Link to="/CompaniesPag"> {/* Link to CompaniesPage */}
            <div className="w-32 h-16 relative grayscale hover:grayscale-0 transition-all duration-300 transform hover:scale-110">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/d/d0/Emirates_logo.svg"
                alt="Emirates"
                className="w-full h-full object-contain"
              />
            </div>
          </Link>

          {/* Trivago */}
          <Link to="/CompaniesPag"> {/* Link to CompaniesPage */}
            <div className="w-32 h-16 relative grayscale hover:grayscale-0 transition-all duration-300 transform hover:scale-110">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/8/8a/Trivago.svg"
                alt="Trivago"
                className="w-full h-full object-contain"
              />
            </div>
          </Link>

          {/* Airbnb */}
          <Link to="/CompaniesPag"> {/* Link to CompaniesPage */}
            <div className="w-32 h-16 relative grayscale hover:grayscale-0 transition-all duration-300 transform hover:scale-110">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/6/69/Airbnb_Logo_B%C3%A9lo.svg"
                alt="Airbnb"
                className="w-full h-full object-contain"
              />
            </div>
          </Link>

          {/* Turkish Airlines */}
          <Link to="/CompaniesPag"> {/* Link to CompaniesPage */}
            <div className="w-32 h-16 relative grayscale hover:grayscale-0 transition-all duration-300 transform hover:scale-110">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/9/9c/Turkish_Airlines_Logo.svg"
                alt="Turkish Airlines"
                className="w-full h-full object-contain"
              />
            </div>
          </Link>

          {/* Swiss */}
          <Link to="/CompaniesPag"> {/* Link to CompaniesPage */}
            <div className="w-32 h-16 relative grayscale hover:grayscale-0 transition-all duration-300 transform hover:scale-110">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/f/f8/Swiss_International_Air_Lines_Logo_2011.svg"
                alt="Swiss Airlines"
                className="w-full h-full object-contain"
              />
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Partners;