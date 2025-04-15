import { useState, useEffect } from 'react';
import {
  FiUser, FiPhone, FiMail, FiCalendar,
  FiTrash2, FiEdit2, FiX
} from 'react-icons/fi';

const Reception = () => {
  const [receptions, setReceptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [currentReception, setCurrentReception] = useState(null);
  const [updating, setUpdating] = useState(false);

  const [formData, setFormData] = useState({
    full_name: '',
    gender: 'm',
    age: '',
    phone_number: '',
    email_address: ''
  });

  useEffect(() => {
    const fetchReceptions = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/reception');
        if (!response.ok) throw new Error('Failed to fetch reception staff');
        const data = await response.json();
        setReceptions(data.reception);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchReceptions();
  }, []);

  const deleteReception = async (id) => {
    try {
      const response = await fetch(`http://localhost:8000/api/reception/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Failed to delete reception staff');

      setReceptions(prev => prev.filter(r => r.id_reception !== id));
    } catch (err) {
      console.error(err.message);
      setError('Failed to delete reception staff');
    }
  };

  const openUpdateModal = (reception) => {
    setCurrentReception(reception);
    setFormData({
      full_name: reception.full_name,
      gender: reception.gender,
      age: reception.age,
      phone_number: reception.phone_number,
      email_address: reception.email_address
    });
    setIsUpdateModalOpen(true);
  };

  const closeUpdateModal = () => {
    setIsUpdateModalOpen(false);
    setCurrentReception(null);
    setFormData({
      full_name: '',
      gender: 'm',
      age: '',
      phone_number: '',
      email_address: ''
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const updateReception = async () => {
    if (!currentReception) return;
    setUpdating(true);
  
    try {
      const response = await fetch(`http://localhost:8000/api/reception/${currentReception.id_reception}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      if (!response.ok) throw new Error('Failed to update reception staff');
  
      // Optional: you can still log the response
      const updatedReception = await response.json();
      console.log('Updated:', updatedReception);
  
      closeUpdateModal();
    } catch (err) {
      console.error(err.message);
      setError('Failed to update reception staff');
    } finally {
      setUpdating(false);
    }
  };
  

  const filteredReceptions = receptions.filter(r =>
    r.full_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getGenderLabel = (genderCode) =>
    genderCode === 'f' ? 'Female' : genderCode === 'm' ? 'Male' : 'Other';

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
            <h1 className="text-3xl font-bold text-gray-800">Reception Staff Management</h1>
            <p className="text-gray-600 mt-2">View and manage all reception staff</p>
          </div>
          <div className="relative w-full md:w-64 mt-4 md:mt-0">
            <input
              type="text"
              placeholder="Search reception staff..."
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredReceptions.map((reception) => (
            <div
              key={reception.id_reception}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <div
                    className={`p-3 rounded-full mr-4 ${
                      reception.gender === 'f'
                        ? 'bg-pink-100 text-pink-600'
                        : reception.gender === 'm'
                        ? 'bg-blue-100 text-blue-600'
                        : 'bg-purple-100 text-purple-600'
                    }`}
                  >
                    <FiUser className="text-xl" />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-gray-800">
                      {reception.full_name}
                    </h2>
                    <p className="text-gray-600">
                      {reception.age} years • {getGenderLabel(reception.gender)}
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center">
                    <FiPhone className="text-gray-500 mr-3" />
                    <span className="text-gray-700">{reception.phone_number}</span>
                  </div>
                  <div className="flex items-center">
                    <FiMail className="text-gray-500 mr-3" />
                    <span className="text-gray-700">{reception.email_address}</span>
                  </div>
                  <div className="flex items-center">
                    <FiCalendar className="text-gray-500 mr-3" />
                    <span className="text-gray-700">Reception ID: {reception.id_reception}</span>
                  </div>
                  <div className="flex space-x-2 mt-4">
                    <button
                      className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300 flex items-center"
                      onClick={() => openUpdateModal(reception)}
                    >
                      <FiEdit2 className="inline mr-2" />
                      Edit
                    </button>
                    <button
                      className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition duration-300 flex items-center"
                      onClick={() => deleteReception(reception.id_reception)}
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

        {filteredReceptions.length === 0 && (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium text-gray-700">
              {receptions.length === 0
                ? 'No reception staff available'
                : 'No matching reception staff found'}
            </h3>
            <p className="text-gray-500 mt-2">
              {receptions.length === 0
                ? 'Add new reception staff to get started'
                : 'Try a different search term'}
            </p>
          </div>
        )}
      </div>

      {/* Update Modal */}
      {isUpdateModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md">
            <div className="flex justify-between items-center border-b p-4">
              <h3 className="text-xl font-semibold text-gray-800">Update Reception Staff</h3>
              <button onClick={closeUpdateModal} className="text-gray-500 hover:text-gray-700">
                <FiX className="text-xl" />
              </button>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {['full_name', 'age', 'phone_number', 'email_address'].map((field) => (
                  <div key={field}>
                    <label className="block text-gray-700 mb-2 capitalize">{field.replace('_', ' ')}</label>
                    <input
                      type={field === 'age' ? 'number' : field === 'email_address' ? 'email' : 'text'}
                      name={field}
                      value={formData[field]}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                ))}
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
              </div>
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={closeUpdateModal}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition duration-300"
                >
                  Cancel
                </button>
                <button
                  onClick={updateReception}
                  disabled={updating}
                  className={`px-4 py-2 text-white rounded-lg transition duration-300 ${
                    updating ? 'bg-blue-300 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'
                  }`}
                >
                  {updating ? 'Updating...' : 'Update Staff'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Reception;
