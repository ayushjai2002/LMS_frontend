import { useState } from 'react';
import { MenuIcon, XIcon } from '@heroicons/react/outline'; // Hamburger and close icons
import { Link, useNavigate } from 'react-router-dom';


const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <a href="/" aria-label="home">
              <img
                src="https://beritrave.com/wp-content/uploads/2024/03/Beritrave-Technologies-e1711177234523-1024x192.png"
                alt="Logo"
                className="h-10"
              />
            </a>
          </div>

          {/* Centered Navbar */}
          <div className="hidden md:flex items-center space-x-6">
            {["Home", "About", "Services", "Contact", "Blog"].map((label, index) => (
              <Link
                key={index}
                to={`/${label.toLowerCase()}`}
                className="text-black hover:text-customColor-light"
              >
                {label}
              </Link>
            ))}
          </div>

          {/* Right-side Buttons */}
          <div className="hidden md:flex space-x-4">
            <button
              onClick={() => navigate('/sign-in')}
              className="px-4 py-2 font-bold text-gray-700 hover:text-customColor-light"
            >
              Login
            </button>
            <button
              onClick={() => navigate('/sign-up')}
              className="px-4 py-2 rounded-md font-bold bg-customColor-light colorCode text-white hover:bg-customColor-light"
            >
              Start Free Trial
            </button>
          </div>

          {/* Hamburger Menu for Mobile */}
          <div className="flex md:hidden items-center">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-gray-700 focus:outline-none"
            >
              {menuOpen ? (
                <XIcon className="h-6 w-6" />
              ) : (
                <MenuIcon className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="md:hidden">
          <div className="space-y-2 px-2 pt-2 pb-3 sm:px-3">
            {["Home", "About", "Services", "Contact", "Blog"].map((label, index) => (
              <Link
                key={index}
                to={`/${label.toLowerCase()}`}
                className="block text-black hover:bg-gray-200 px-3 py-2 rounded-md text-base font-medium"
                onClick={() => setMenuOpen(false)}
              >
                {label}
              </Link>
            ))}

            <button
              onClick={() => { navigate('/sign-in'); setMenuOpen(false); }}
              className="block text-gray-700 px-3 py-2 rounded-md text-base font-medium"
            >
              Login
            </button>
            <button
              onClick={() => { navigate('/sign-up'); setMenuOpen(false); }}
              className="block text-white bg-customColor-light px-3 py-2 rounded-md font-bold"
            >
              Start Free Trial
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
