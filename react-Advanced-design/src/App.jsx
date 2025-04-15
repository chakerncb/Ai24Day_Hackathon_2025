import "./App.css";
import { Routes, Route } from "react-router-dom";
import Login from "./Componenets/Login";
import Home from "./Componenets/Home";
import { ToastContainer, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Admin from "./Componenets/Admin/Admin";
import Reception from "./Componenets/Reception/Reception";
import Trainers from "./Componenets/trainers/Trainers";
import Users from "./Componenets/Users/Users";

function App() {


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
        <Route path="/" element={<Home />} />
        <Route path="/Admin" element={<Admin />} />
        
        <Route path="/Reception" element={<Reception />} />
        <Route path="/Trainers" element={<Trainers />} />
        <Route path="/Users" element={<Users />} />
      </Routes>
    </>
  );
}

export default App;
