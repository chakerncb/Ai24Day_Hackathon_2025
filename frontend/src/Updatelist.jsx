import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const API_URL = "/api/tasks";

const UpdateList = () => {
  const { id } = useParams(); // Correctly extract `id` from useParams
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('');
  const [deadline, setDeadline] = useState('');
  const [fetchError, setFetchError] = useState(null);

  const getTask = async () => {
    try {
      const response = await axios.get(`${API_URL}/${id}`); // Use `id` from useParams
      const data = response.data.task;
      console.log("Fetched task:", data);
      setTitle(data.title);
      setDescription(data.description);
      setStatus(data.status);
      setDeadline(data.deadline.split('T')[0]); // Format deadline to "yyyy-MM-dd"
      setFetchError(null);
    } catch (err) {
      console.error(err);
      setFetchError(err.message);
    }
  };

  useEffect(() => {
    if (id) {
      getTask(); // Fetch task data when `id` is available
    }
  }, [id]);

  const updateItem = async (e) => {
    e.preventDefault();
    try {
      const updatedItem = {
        title,
        description,
        status,
        deadline,
      };

      const response = await axios.put(`${API_URL}/${id}`, updatedItem);
      console.log("Updated item:", response.data);
      setFetchError(null);
    } catch (err) {
      setFetchError(err.message);
    }
  };

  return (
    <div>
      <h1>Update List</h1>
      {fetchError && <p>Error: {fetchError}</p>}
      <form onSubmit={updateItem}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type="text"
          placeholder="Status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        />
        <input
          type="datetime-local"
          placeholder="Deadline"
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
        />
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default UpdateList;