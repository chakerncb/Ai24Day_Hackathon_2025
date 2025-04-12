import React from "react";
import { Link } from "react-router-dom";

const ListItems = ({ items, Deleteitem }) => {
  return (
    <ul>
      {items.map((item) => (
        <li key={item.id}>
          <h4>{item.title}</h4>
          <p>{item.description}</p>
          <p>{item.status}</p>
          <p>{item.user_id}</p>
          <p>{item.deadline}</p>
          <button onClick={() => Deleteitem(item.id)}>Delete</button>
          <Link to={`/update/${item.id}`}>Update</Link>
        </li>
      ))}
    </ul>
  );
};

export default ListItems;