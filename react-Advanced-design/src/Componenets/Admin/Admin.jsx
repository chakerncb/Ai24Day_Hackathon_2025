import React from 'react';
import { Link } from 'react-router-dom';

const Admin = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar Navigation - Fixed width */}
      <div className="fixed inset-y-0 left-0 w-64 bg-gray-800 text-white">
        <div className="flex items-center justify-center h-16 border-b border-gray-700">
          <Link to="/admin" className="flex items-center justify-center">
            <div className="text-xl font-bold">Admin Panel</div>
          </Link>
        </div>
        
        <nav className="mt-6">
          
          <Link
            to="/Users"
            className="flex items-center px-4 py-3 hover:bg-gray-700"
          >
            <span className="w-6 text-center">U</span>
            <span className="ml-3">Users</span>
          </Link>
          <Link
            to="/reception"
            className="flex items-center px-4 py-3 hover:bg-gray-700"
          >
            <span className="w-6 text-center">R</span>
            <span className="ml-3">Reception</span>
          </Link>
          <Link
            to="/coach"
            className="flex items-center px-4 py-3 hover:bg-gray-700"
          >
            <span className="w-6 text-center">C</span>
            <span className="ml-3">Coach</span>
          </Link>
          <Link
            to="/settings"
            className="flex items-center px-4 py-3 hover:bg-gray-700"
          >
            <span className="w-6 text-center">S</span>
            <span className="ml-3">Settings</span>
          </Link>
        </nav>
      </div>

      {/* Main content area */}
      <div className="flex-1 flex flex-col overflow-hidden ml-64"> {/* Added ml-64 to account for sidebar width */}
        {/* Top Header */}
        <header className="bg-white shadow-sm z-10">
          <div className="flex items-center justify-between h-16 px-4">
            <Link to="" className="text-xl font-semibold text-blue-600">
              Admin Dashboard
            </Link>
            <div className="flex items-center space-x-4">
              <Link to="/admin/notifications" className="relative p-1 rounded-full hover:bg-gray-200">
                <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
                <span>🔔</span>
              </Link>
              <Link to="/admin/profile" className="hover:text-blue-600">
                Admin User
              </Link>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-4">
          <div className="bg-white rounded-lg shadow p-6 h-full">
            {/* Your content will go here */}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Admin;