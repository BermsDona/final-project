import React, { useState } from "react";
import Cart from "./Cart";
import { FaUserCircle, FaShoppingCart } from "react-icons/fa";

const Navbar = () => {
  const [isCartVisible, setCartVisible] = useState(false);

  const handleCartClick = () => setCartVisible(true);
  const handleCloseCart = () => setCartVisible(false);

  return (
    <>
      <header className="bg-white shadow-md fixed top-0 left-0 right-0 z-50">
        {/* Fixed Navbar */}
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <img
              src="/logo-removebg-preview.png" // Add your logo image path here
              alt="Pick N' Go Logo"
              className="h-12 w-12 mr-3"
            />
            <a
              href="/dashboard"
              className="text-4xl font-bold text-green-700 uppercase" // Updated text color
              style={{ fontFamily: "YourFontName" }} // Replace 'YourFontName' with the actual font name
            >
              PICK 'N GO
            </a>
          </div>

          {/* Search Bar */}
          <div className="flex-grow flex justify-center">
            <input
              type="text"
              placeholder="Search products or branches"
              className="w-72 h-10 px-4 py-1 rounded-md border border-gray-300 bg-gray-100 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500" // Updated background color
            />
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex md:space-x-8">
            <ul className="flex space-x-8">
              <li>
                <a
                  href="/branches"
                  className="text-lg text-green-700 font-semibold hover:text-green-500 uppercase" // Updated text color
                  style={{ fontFamily: "YourFontName" }}
                >
                  Branches
                </a>
              </li>
              <li>
                <span
                  className="text-lg text-green-700 font-semibold hover:text-green-500 cursor-pointer"
                  onClick={handleCartClick}
                >
                  <FaShoppingCart className="inline-block text-2xl" />
                </span>
              </li>
              <li>
                <a
                  href="/history"
                  className="text-lg text-green-700 font-semibold hover:text-green-500 uppercase" // Updated text color
                  style={{ fontFamily: "YourFontName" }}
                >
                  Purchases
                </a>
              </li>
              <li>
                <a
                  href="/"
                  className="text-lg text-green-700 font-semibold hover:text-green-500 uppercase" // Updated text color
                  style={{ fontFamily: "YourFontName" }}
                >
                  <FaUserCircle className="inline-block text-2xl" />
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Cart Modal */}
      {isCartVisible && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-11/12 md:w-1/2 p-6 relative max-h-[80vh] overflow-auto">
            <button
              onClick={handleCloseCart}
              className="absolute top-4 right-4 text-green-700 font-bold"
            >
              ✕
            </button>
            <Cart onClose={handleCloseCart} />
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;