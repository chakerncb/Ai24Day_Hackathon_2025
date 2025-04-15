import { useState, useEffect } from 'react';
import { FiUser, FiPhone, FiMail, FiCalendar, FiTrash2, FiEdit2, FiX } from 'react-icons/fi';

const Coach = () => {
  const [coaches, setCoaches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [currentCoach, setCurrentCoach] = useState(null);
  const [formData, setFormData] = useState({
    full_name: '',
    gender: 'm',
    age: '',
    phone_number: '',
    email_address: ''
  });

  useEffect(() => {
    const fetchCoaches = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/coach');
        if (!response.ok) {
          throw new Error('Failed to fetch coaches');
        }
        const data = await response.json();
        setCoaches(data.coach);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchCoaches();
  }, []);

  const deleteCoach = async (id) => {
    try {
      const response = await fetch(`http://localhost:8000/api/coach/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete coach');
      }

      setCoaches((prevCoaches) => prevCoaches.filter(coach => coach.id_coach !== id));
    } catch (err) {
      console.error(err.message);
      setError('Failed to delete coach');
    }
  };

  const openUpdateModal = (coach) => {
    setCurrentCoach(coach);
    setFormData({
      full_name: coach.full_name,
      gender: coach.gender,
      age: coach.age,
      phone_number: coach.phone_number,
      email_address: coach.email_address
    });
    setIsUpdateModalOpen(true);
  };

  const closeUpdateModal = () => {
    setIsUpdateModalOpen(false);
    setCurrentCoach(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const updateCoach = async () => {
    try {
      const response = await fetch(`http://localhost:8000/api/coach/${currentCoach.id_coach}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error('Failed to update coach');
      }

      const updatedCoach = await response.json();
      
      setCoaches(prevCoaches => 
        prevCoaches.map(coach => 
          coach.id_coach === currentCoach.id_coach ? updatedCoach : coach
        )
      );
      
      closeUpdateModal();
    } catch (err) {
      console.error(err.message);
      setError('Failed to update coach');
    }
  };

  const filteredCoaches = coaches.filter((coach) =>
    coach.full_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getGenderLabel = (genderCode) => {
    return genderCode === 'f' ? 'Female' : genderCode === 'm' ? 'Male' : 'Other';
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-red-500 text-lg">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Coaches Management</h1>
            <p className="text-gray-600 mt-2">View and manage all coaching staff</p>
          </div>
          <div className="relative w-full md:w-64 mt-4 md:mt-0">
            <input
              type="text"
              placeholder="Search coaches..."
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCoaches.map((coach) => (
            <div
              key={coach.id_coach}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <div
                    className={`p-3 rounded-full mr-4 ${
                      coach.gender === 'f'
                        ? 'bg-pink-100 text-pink-600'
                        : coach.gender === 'm'
                        ? 'bg-blue-100 text-blue-600'
                        : 'bg-purple-100 text-purple-600'
                    }`}
                  >
                    <FiUser className="text-xl" />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-gray-800">
                      {coach.full_name}
                    </h2>
                    <p className="text-gray-600">
                      {coach.age} years • {getGenderLabel(coach.gender)}
                    </p>
                  </div>
                </div>

                <div  className="space-y-3">
                  <div className="flex items-center">
                    <FiPhone className="text-gray-500 mr-3" />
                    <span className="text-gray-700">{coach.phone_number}</span>
                  </div>
                  <div className="flex items-center">
                    <FiMail className="text-gray-500 mr-3" />
                    <span className="text-gray-700">{coach.email_address}</span>
                  </div>
                  <div className="flex items-center">
                    <FiCalendar className="text-gray-500 mr-3" />
                    <span className="text-gray-700">Coach ID: {coach.id_coach}</span>
                  </div>
                  <div className="flex space-x-2 mt-4">
                    <button
                      className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300 flex items-center"
                      onClick={() => openUpdateModal(coach)}
                    >
                      <FiEdit2 className="inline mr-2" />
                      Edit
                    </button>
                    <button
                      className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition duration-300 flex items-center"
                      onClick={() => deleteCoach(coach.id_coach)}
                    >
                      <FiTrash2 className="inline mr-2" />
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredCoaches.length === 0 && (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium text-gray-700">
              {coaches.length === 0
                ? 'No coaches available'
                : 'No matching coaches found'}
            </h3>
            <p className="text-gray-500 mt-2">
              {coaches.length === 0
                ? 'Add new coaches to get started'
                : 'Try a different search term'}
            </p>
          </div>
        )}
      </div>

      {/* Update Coach Modal */}
      {isUpdateModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md">
            <div className="flex justify-between items-center border-b p-4">
              <h3 className="text-xl font-semibold text-gray-800">Update Coach</h3>
              <button onClick={closeUpdateModal} className="text-gray-500 hover:text-gray-700">
                <FiX className="text-xl" />
              </button>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-700 mb-2">Full Name</label>
                  <input
                    type="text"
                    name="full_name"
                    value={formData.full_name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-gray-700 mb-2">Gender</label>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="m">Male</option>
                    <option value="f">Female</option>
                    <option value="o">Other</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-gray-700 mb-2">Age</label>
                  <input
                    type="number"
                    name="age"
                    value={formData.age}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-gray-700 mb-2">Phone Number</label>
                  <input
                    type="tel"
                    name="phone_number"
                    value={formData.phone_number}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-gray-700 mb-2">Email Address</label>
                  <input
                    type="email"
                    name="email_address"
                    value={formData.email_address}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={closeUpdateModal}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition duration-300"
                >
                  Cancel
                </button>
                <button
                  onClick={updateCoach}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300"
                >
                  Update Coach
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Coach;