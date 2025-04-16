import "./App.css";
import { Routes, Route } from "react-router-dom";
import Login from "./Componenets/Login";
import Home from "./Componenets/Home";
import { ToastContainer, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Admin from "./Componenets/Admin/Admin";
import Reception from "./Componenets/Reception/Reception";
import Trainers from "./Componenets/trainers/Trainers";

import Caoch from "./Componenets/Caoch/Caoch";
import UpdateReception from "./Componenets/Reception/UpdateReception";
import Users_log from "./Componenets/Users_log/Users_log";
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
        <Route path="/Caoch" element={<Caoch />} />
        <Route path="/Update-reception/:id" element={<UpdateReception />} />
        <Route path="/Users-log" element={<Users_log />} />
      </Routes>
    </>
  );
}

export default App;
