import "./App.css";
import Home from "./Home";
import { Route, Routes } from "react-router-dom";
import Updatelist from "./Updatelist";
import AddItem from "./AddItem";
function App() {

  return (
    <main>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/update/:id" element={<Updatelist/>} />
        <Route path="/add" element={<AddItem/>} />
      </Routes>
    </main>
  );
}

export default App;
