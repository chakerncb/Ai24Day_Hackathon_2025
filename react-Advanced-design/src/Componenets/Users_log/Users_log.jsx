import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext'; // Assuming you have the auth context
import { toast } from 'react-toastify';
import { FiRefreshCw, FiClock, FiUser, FiActivity } from 'react-icons/fi';

const Users_log = () => {
  const { user } = useAuth();
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchUserLogs = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/user-logs'); // Your API endpoint
      setLogs(response.data);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch user logs');
      toast.error(err.response?.data?.message || 'Failed to fetch user logs');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Only fetch if admin (chaker@gmail.com)
    if (user?.email === 'chaker@gmail.com') {
      fetchUserLogs();
    }
  }, [user]);

  if (user?.email !== 'chaker@gmail.com') {
    return (
      <div className="p-6 text-center text-red-500">
        <h2>Access Denied</h2>
        <p>Only admin users can view this page</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <FiRefreshCw className="animate-spin text-2xl text-blue-500" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 text-center text-red-500">
        <p>{error}</p>
        <button 
          onClick={fetchUserLogs}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">User Activity Logs</h2>
        <button
          onClick={fetchUserLogs}
          className="flex items-center px-4 py-2 bg-gray-100 rounded hover:bg-gray-200"
        >
          <FiRefreshCw className="mr-2" /> Refresh
        </button>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <div className="flex items-center">
                  <FiUser className="mr-2" /> Username
                </div>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <div className="flex items-center">
                  <FiClock className="mr-2" /> Time
                </div>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <div className="flex items-center">
                  <FiActivity className="mr-2" /> Action
                </div>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {logs.length > 0 ? (
              logs.map((log, index) => (
                <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {log.username}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(log.timestamp).toLocaleString()}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      log.action.includes('login') 
                        ? 'bg-green-100 text-green-800' 
                        : log.action.includes('delete') 
                          ? 'bg-red-100 text-red-800' 
                          : 'bg-blue-100 text-blue-800'
                    }`}>
                      {log.action}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="px-6 py-4 text-center text-sm text-gray-500">
                  No activity logs found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users_log;