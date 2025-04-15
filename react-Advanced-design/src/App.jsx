import "./App.css";

import { Routes, Route } from "react-router-dom";
import Login from "./Componenets/Login";
import Home from "./Componenets/Home";
import { ToastContainer, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  // Define refs for each section

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        transition={Bounce}
      />
      <Routes>
        <Route path="/Login" element={<Login />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </>
  );
}

export default App;
