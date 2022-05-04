import "./App.css";
import Home from "./pages/Home";
import About from "./pages/About";
import { Routes, Route } from 'react-router-dom';

function App() {
  return ( 
   <Routes> 
     <Route index element={<Home />} />
     <Route path="InfoPage" element={<About />} />
    </Routes>
  );
};

export default App;