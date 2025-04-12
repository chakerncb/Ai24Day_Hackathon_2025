import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import ListItems from "./LIstItems";
;
const Home = () => {
  const [items, setItems] = useState([]);
  const [fetcherr, setfetcherror] = useState(null);
  const [loading, setLoading] = useState(true);
  const API_URL = "http://localhost:8000/api/tasks";

  useEffect(() => {
    const fetchDAta = async () => {
      try {
        const response = await axios.get(API_URL);
        const data = response.data;
        setItems(data.tasks);
        setLoading(false);
        setfetcherror(null);
      } catch (err) {
        console.error(err);
        setfetcherror(err.message);
        setLoading(false);
      }
    };
    fetchDAta();
  }, []);

  const Deleteitem = async (id) => {
    try {
      const response = await axios.delete(`${API_URL}/${id}`);
      const data = response.data;
      setItems(data);
      setfetcherror(null);
    } catch (err) {
      setfetcherror(err.message);
    }
  };

 
  return (
    <div>
      {loading && <h1>Loading...</h1>}
      {fetcherr && <h1>Error: {fetcherr}</h1>}

      {!loading && !fetcherr && (
        <ul>
          <ListItems items={items} Deleteitem={Deleteitem} />
        </ul>
      )}
    </div>
  );
};

export default Home;
