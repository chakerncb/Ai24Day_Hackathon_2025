import { useState, useEffect } from 'react';
import { FiUser, FiPhone, FiCalendar, FiClock, FiDollarSign } from 'react-icons/fi';

const Users = () => {
  const [trainers, setTrainers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  // Mock data fetch - replace with your actual API call
  useEffect(() => {
    const fetchTrainers = async () => {
      try {
        // Replace this with your actual API call
        const mockData = [
          {
            id_trainer: 1,
            full_name: 'John Smith',
            phone_number: '555-123-4567',
            age: 32,
            session_numbers: 24,
            start_membership: '2023-01-15',
            end_membership: '2023-12-15'
          },
          {
            id_trainer: 2,
            full_name: 'Sarah Johnson',
            phone_number: '555-987-6543',
            age: 28,
            session_numbers: 36,
            start_membership: '2023-03-10',
            end_membership: '2024-03-10'
          },
          // Add more mock data as needed
        ];
        
        setTrainers(mockData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchTrainers();
  }, []);

  const filteredTrainers = trainers.filter(trainer =>
    trainer.full_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const calculateRemainingDays = (endDate) => {
    const today = new Date();
    const end = new Date(endDate);
    const diffTime = end - today;
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-4 md:mb-0">Trainer Dashboard</h1>
          <div className="relative w-full md:w-64">
            <input
              type="text"
              placeholder="Search trainers..."
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="absolute left-3 top-2.5 text-gray-400">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTrainers.map((trainer) => (
            <div key={trainer.id_trainer} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <div className="bg-blue-100 p-3 rounded-full mr-4">
                    <FiUser className="text-blue-600 text-xl" />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-gray-800">{trainer.full_name}</h2>
                    <p className="text-gray-600">{trainer.age} years old</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center">
                    <FiPhone className="text-gray-500 mr-3" />
                    <span className="text-gray-700">{trainer.phone_number}</span>
                  </div>
                  <div className="flex items-center">
                    <FiClock className="text-gray-500 mr-3" />
                    <span className="text-gray-700">{trainer.session_numbers} sessions</span>
                  </div>
                  <div className="flex items-center">
                    <FiCalendar className="text-gray-500 mr-3" />
                    <span className="text-gray-700">Joined: {formatDate(trainer.start_membership)}</span>
                  </div>
                  <div className="flex items-center">
                    <FiCalendar className="text-gray-500 mr-3" />
                    <span className="text-gray-700">Membership ends: {formatDate(trainer.end_membership)}</span>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-gray-200">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-500">Days remaining</span>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      calculateRemainingDays(trainer.end_membership) < 30 
                        ? 'bg-red-100 text-red-800' 
                        : 'bg-green-100 text-green-800'
                    }`}>
                      {calculateRemainingDays(trainer.end_membership)} days
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredTrainers.length === 0 && (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium text-gray-700">No trainers found</h3>
            <p className="text-gray-500 mt-2">Try adjusting your search query</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Users;