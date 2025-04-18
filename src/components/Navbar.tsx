import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Heart } from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  return (
    <nav className="bg-white shadow-md fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-bold text-orange-500">Travel</Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            
            <NavLink to="/about" active={location.pathname === "/about"}>About</NavLink>
            <NavLink to="/services" active={location.pathname === "/services"}>Services</NavLink>
            <NavLink to="/travels" active={location.pathname === "/travels"}>Travels</NavLink>
            <NavLink to="/companies" active={location.pathname === "/companies"}>Companies</NavLink>
            <NavLink to="/events" active={location.pathname === "/events"}>Events</NavLink>
            <NavLink to="/packages" active={location.pathname === "/packages"}>Upcoming Packages</NavLink>
            
            {/* Favorite Link with Heart Icon */}
            <Link
              to="/favorites"
              className={`flex items-center text-sm font-medium ${
                location.pathname === "/favorites" ? 'text-orange-500' : 'text-gray-700 hover:text-orange-500'
              }`}
            >
              <Heart size={18} className="mr-1" />
              Favorites
            </Link>
            
            <Link
              to="/signup"
              className="bg-orange-500 text-white px-6 py-2 rounded-md hover:bg-orange-600"
            >
              Sign Up
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white pb-4">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <MobileNavLink to="/" active={location.pathname === "/"}>Home</MobileNavLink>
            <MobileNavLink to="/about" active={location.pathname === "/about"}>About</MobileNavLink>
            <MobileNavLink to="/services" active={location.pathname === "/services"}>Services</MobileNavLink>
            <MobileNavLink to="/travels" active={location.pathname === "/travels"}>Travels</MobileNavLink>
            <MobileNavLink to="/companies" active={location.pathname === "/companies"}>Companies</MobileNavLink>
            <MobileNavLink to="/events" active={location.pathname === "/events"}>Events</MobileNavLink>
            
            
            {/* Mobile Favorite Link with Heart Icon */}
            <Link
              to="/favorites"
              className={`flex items-center px-3 py-2 rounded-md text-base font-medium ${
                location.pathname === "/favorites" ? 'text-orange-500' : 'text-gray-700 hover:text-orange-500'
              }`}
            >
              <Heart size={18} className="mr-2" />
              Favorites
            </Link>
            
            <Link
              to="/getintouch"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-orange-500"
            >
              Get in Touch
            </Link>
            
            <Link
              to="/signup"
              className="w-full text-left px-3 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600"
            >
              Sign Up
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

// NavLink component for desktop
const NavLink = ({ to, children, active }: { to: string; children: React.ReactNode; active?: boolean }) => (
  <Link
    to={to}
    className={`text-sm font-medium ${
      active ? 'text-orange-500' : 'text-gray-700 hover:text-orange-500'
    }`}
  >
    {children}
  </Link>
);

// MobileNavLink component for mobile
const MobileNavLink = ({ to, children, active }: { to: string; children: React.ReactNode; active?: boolean }) => (
  <Link
    to={to}
    className={`block px-3 py-2 rounded-md text-base font-medium ${
      active ? 'text-orange-500' : 'text-gray-700 hover:text-orange-500'
    }`}
  >
    {children}
  </Link>
);

export default Navbar;