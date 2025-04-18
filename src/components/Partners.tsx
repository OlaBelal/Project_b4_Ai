//C:\Users\olabe\Downloads\SecandDemo\src\components\Partners.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import tirhalLogo from "../assets/images/tirhalLogo.jpg";
const Partners = () => {
  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-xl font-medium text-gray-600">Trusted by World-Leading Travel Companies</h2>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 items-center justify-items-center">
          {/* Emirates */}
          <Link to="/companies/1">
            <div className="w-32 h-16 relative grayscale hover:grayscale-0 transition-all duration-300 transform hover:scale-110">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/d/d0/Emirates_logo.svg"
                alt="Emirates"
                className="w-full h-full object-contain"
              />
            </div>
          </Link>

          {/* Trivago */}
          <Link to="/companies/2">
            <div className="w-32 h-16 relative grayscale hover:grayscale-0 transition-all duration-300 transform hover:scale-110">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMq-bIS89cSw6yhakD-CGrwpxatWHscH7I6A&s"
                alt="Trivago"
                className="w-full h-full object-contain"
              />
            </div>
          </Link>

          {/* Tirhal */}
          <Link to="/companies/4">
            <div className="w-32 h-16 relative grayscale hover:grayscale-0 transition-all duration-300 transform hover:scale-110">
              <img
                src= {tirhalLogo} // Replace with actual Tirhal logo
                alt="Tirhal"
                className="w-full h-full object-contain"
              />
            </div>
          </Link>

          {/* Airbnb */}
          <Link to="/companies/3">
            <div className="w-32 h-16 relative grayscale hover:grayscale-0 transition-all duration-300 transform hover:scale-110">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/6/69/Airbnb_Logo_B%C3%A9lo.svg"
                alt="Airbnb"
                className="w-full h-full object-contain"
              />
            </div>
          </Link>

          {/* Swiss */}
          <Link to="/companies/5">
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