import React, { useState } from "react";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { Link } from "react-router-dom";

const Navbar = ({ sections }) => {
  const [nav, setNav] = useState(false);

  // Smooth scroll function
  const scrollToSection = (ref) => {
    ref.current.scrollIntoView({ behavior: "smooth" });
    setNav(false); // Close menu after navigation
  };

  return (
    <div className="max-w-[1640px] mx-auto flex justify-between items-center p-4 bg-white shadow-md sticky top-0 z-20">
      {/* Left Side */}
      <div className="flex items-center">
        <div
          onClick={() => setNav(!nav)}
          className="cursor-pointer hover:bg-gray-100 p-2 rounded-full transition-all duration-300"
        >
          <AiOutlineMenu className="text-3xl text-blue-700 font-bold" />
        </div>
        <h1 className="text-2xl sm:text-3xl lg:text-4xl px-4 font-extrabold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
          GYM <span className="text-blue-700">ENJOYERS</span>
        </h1>
      </div>

      {/* Side Drawer Menu */}
      <div
        className={`fixed top-0 left-0 w-[300px] h-screen bg-white z-20 duration-300 shadow-xl ${
          nav ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
            GYM ENJOYERS
          </h2>
          <AiOutlineClose
            onClick={() => setNav(!nav)}
            className="text-blue-700 cursor-pointer hover:bg-gray-100 p-1 rounded-full"
            size={30}
          />
        </div>

        <nav className="p-4">
          <ul className="space-y-2">
            <li>
              <button
                onClick={() => scrollToSection(sections.hero)}
                className="flex items-center p-3 rounded-lg hover:bg-blue-50 text-gray-700 hover:text-blue-600 transition-all duration-200"
              >
                Hero Section
              </button>
            </li>
            <Link to='Login'>
              <button
                
                className="flex items-center p-3 rounded-lg hover:bg-blue-50 text-gray-700 hover:text-blue-600 transition-all duration-200"
              >
                Login
              </button>
            </Link>            

            <li>
              <button
                onClick={() => scrollToSection(sections.headlineCards)}
                className="flex items-center p-3 rounded-lg hover:bg-blue-50 text-gray-700 hover:text-blue-600 transition-all duration-200"
              >
                Headline Cards
              </button>
            </li>
            <li>
              <button
                onClick={() => scrollToSection(sections.offers)}
                className="flex items-center p-3 rounded-lg hover:bg-blue-50 text-gray-700 hover:text-blue-600 transition-all duration-200"
              >
                Offers Section
              </button>
            </li>
            <li>
              <button
                onClick={() => scrollToSection(sections.coaches)}
                className="flex items-center p-3 rounded-lg hover:bg-blue-50 text-gray-700 hover:text-blue-600 transition-all duration-200"
              >
                Coaches Section
              </button>
            </li>
            <li>
              <button
                onClick={() => scrollToSection(sections.promotions)}
                className="flex items-center p-3 rounded-lg hover:bg-blue-50 text-gray-700 hover:text-blue-600 transition-all duration-200"
              >
                Promotions Section
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
