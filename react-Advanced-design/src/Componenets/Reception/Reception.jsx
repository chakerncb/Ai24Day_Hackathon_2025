import { useState, useEffect } from "react";
import {
  FiUser,
  FiPhone,
  FiMail,
  FiCalendar,
  FiTrash2,
  FiEdit2,
} from "react-icons/fi";
import { Link } from "react-router-dom";
const Reception = () => {
  const [receptions, setReceptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchReceptions = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/reception");
        if (!response.ok) {
          throw new Error("Failed to fetch reception staff");
        }
        const data = await response.json();
        setReceptions(data.reception);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchReceptions();
  }, []);

  const deleteReception = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:8000/api/reception/${id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete reception staff");
      }

      setReceptions((prevReceptions) =>
        prevReceptions.filter((reception) => reception.id_reception !== id)
      );
    } catch (err) {
      console.error(err.message);
      setError("Failed to delete reception staff");
    }
  };

  const filteredReceptions = receptions.filter((reception) =>
    reception.full_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getGenderLabel = (genderCode) => {
    return genderCode === "f"
      ? "Female"
      : genderCode === "m"
      ? "Male"
      : "Other";
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
              Reception Staff Management
            </h1>
            <p className="text-gray-600 mt-2">
              View and manage all reception staff
            </p>
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
                      reception.gender === "f"
                        ? "bg-pink-100 text-pink-600"
                        : reception.gender === "m"
                        ? "bg-blue-100 text-blue-600"
                        : "bg-purple-100 text-purple-600"
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
                    <span className="text-gray-700">
                      {reception.phone_number}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <FiMail className="text-gray-500 mr-3" />
                    <span className="text-gray-700">
                      {reception.email_address}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <FiCalendar className="text-gray-500 mr-3" />
                    <span className="text-gray-700">
                      Reception ID: {reception.id_reception}
                    </span>
                  </div>
                  <div className="flex space-x-2 mt-4">
                    <Link to={`/Update-reception/${reception.id_reception}`}>
                      <button
                        className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300 flex items-center"
                        
                      >
                        <FiEdit2 className="inline mr-2" />
                        Edit
                      </button>
                    </Link>
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
                ? "No reception staff available"
                : "No matching reception staff found"}
            </h3>
            <p className="text-gray-500 mt-2">
              {receptions.length === 0
                ? "Add new reception staff to get started"
                : "Try a different search term"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Reception;
