import React from 'react';
import { Link } from 'react-router-dom';
import { FiSend, FiInfo } from 'react-icons/fi';

const Navbar = ({ onInfoClick }) => {
  const handleShare = () => {
    const message = encodeURIComponent(
      "Hey there! I found this fantastic FFCS timetable generator that helps you easily create and manage your course schedule. Check it out: "
    );
    const url = encodeURIComponent(window.location.href);
    const whatsappUrl = `https://api.whatsapp.com/send?text=${message}${url}`;
    
    window.open(whatsappUrl, '_blank');
  };

  return (
    <nav className="bg-gray-900 p-4 shadow-md relative z-10">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center">
          <div className="flex-shrink-0">
            <Link to="/" className="text-white font-bold text-2xl hover:text-gray-300">FFCS Helper</Link>
          </div>
          <div className="flex items-center space-x-4">
            <button 
              onClick={onInfoClick} 
              className="flex items-center border-2 rounded-full px-4 py-2 border-gray-500 text-sm font-medium text-gray-500 hover:bg-gray-500 hover:text-white transition duration-300 ease-in-out transform hover:scale-105"
            >
              <FiInfo className="mr-2" />
              Info
            </button>
            <button 
              onClick={handleShare} 
              className="flex items-center border-2 rounded-full px-6 py-2 border-blue-500 text-sm font-medium text-blue-500 hover:bg-blue-500 hover:text-white transition duration-300 ease-in-out transform hover:scale-105"
            >
              <FiSend className="mr-2" />
              Share
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;