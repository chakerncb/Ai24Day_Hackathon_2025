import { useState, useEffect } from "react";
import {
  FiUser,
  FiPhone,
  FiMail,
  FiCalendar,
  FiTrash2,
  FiEdit2,
  FiPlus,
  FiSearch
} from "react-icons/fi";

const TraineeManagement = () => {
  const [trainees, setTrainees] = useState([
    {
      id: 1,
      id_coach: 4,
      full_name: "mohamed",
      phone_number: 81304567890,
      age: 30,
      gender: "m",
      email_address: "zara.moore@example.com"
    }
  ]);
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    id_coach: '',
    full_name: '',
    phone_number: '',
    age: '',
    gender: 'm',
    email_address: ''
  });
  const [editingId, setEditingId] = useState(null);

  const filteredTrainees = trainees.filter((trainee) =>
    trainee.full_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getGenderLabel = (genderCode) => {
    return genderCode === "f" ? "Female" : "Male";
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (editingId) {
      // Update existing trainee
      setTrainees(trainees.map(trainee => 
        trainee.id === editingId ? { ...formData, id: editingId } : trainee
      ));
    } else {
      // Add new trainee
      const newTrainee = {
        ...formData,
        id: trainees.length > 0 ? Math.max(...trainees.map(t => t.id)) + 1 : 1
      };
      setTrainees([...trainees, newTrainee]);
    }
    
    resetForm();
    setIsModalOpen(false);
  };

  const handleEdit = (trainee) => {
    setFormData(trainee);
    setEditingId(trainee.id);
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    setTrainees(trainees.filter(trainee => trainee.id !== id));
  };

  const resetForm = () => {
    setFormData({
      id_coach: '',
      full_name: '',
      phone_number: '',
      age: '',
      gender: 'm',
      email_address: ''
    });
    setEditingId(null);
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
            <h1 className="text-3xl font-bold text-gray-800">
              Trainee Management
            </h1>
            <p className="text-gray-600 mt-2">
              View and manage all trainees
            </p>
          </div>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiSearch className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search trainees..."
                className="pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button
              onClick={() => { resetForm(); setIsModalOpen(true); }}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center"
            >
              <FiPlus className="mr-2" />
              Add Trainee
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTrainees.map((trainee) => (
            <div
              key={trainee.id}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <div
                    className={`p-3 rounded-full mr-4 ${
                      trainee.gender === "f"
                        ? "bg-pink-100 text-pink-600"
                        : "bg-blue-100 text-blue-600"
                    }`}
                  >
                    <FiUser className="text-xl" />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-gray-800">
                      {trainee.full_name}
                    </h2>
                    <p className="text-gray-600">
                      {trainee.age} years • {getGenderLabel(trainee.gender)}
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center">
                    <FiPhone className="text-gray-500 mr-3" />
                    <span className="text-gray-700">
                      {trainee.phone_number}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <FiMail className="text-gray-500 mr-3" />
                    <span className="text-gray-700">
                      {trainee.email_address}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <FiCalendar className="text-gray-500 mr-3" />
                    <span className="text-gray-700">
                      Coach ID: {trainee.id_coach}
                    </span>
                  </div>
                  <div className="flex space-x-2 mt-4">
                    <button
                      className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300 flex items-center"
                      onClick={() => handleEdit(trainee)}
                    >
                      <FiEdit2 className="mr-2" />
                      Edit
                    </button>
                    <button
                      className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition duration-300 flex items-center"
                      onClick={() => handleDelete(trainee.id)}
                    >
                      <FiTrash2 className="mr-2" />
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredTrainees.length === 0 && (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium text-gray-700">
              {trainees.length === 0
                ? "No trainees available"
                : "No matching trainees found"}
            </h3>
            <p className="text-gray-500 mt-2">
              {trainees.length === 0
                ? "Add new trainees to get started"
                : "Try a different search term"}
            </p>
          </div>
        )}

        {/* Modal for Add/Edit */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-800">
                  {editingId ? 'Edit Trainee' : 'Add New Trainee'}
                </h2>
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  &times;
                </button>
              </div>
              
              <form onSubmit={handleSubmit}>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Coach ID</label>
                    <input
                      type="number"
                      name="id_coach"
                      value={formData.id_coach}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                    <input
                      type="text"
                      name="full_name"
                      value={formData.full_name}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                    <input
                      type="tel"
                      name="phone_number"
                      value={formData.phone_number}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Age</label>
                    <input
                      type="number"
                      name="age"
                      value={formData.age}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                    <select
                      name="gender"
                      value={formData.gender}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="m">Male</option>
                      <option value="f">Female</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                    <input
                      type="email"
                      name="email_address"
                      value={formData.email_address}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                </div>
                
                <div className="mt-6 flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center"
                  >
                    {editingId ? (
                      <>
                        <FiEdit2 className="mr-2" />
                        Update
                      </>
                    ) : (
                      <>
                        <FiPlus className="mr-2" />
                        Add
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TraineeManagement;