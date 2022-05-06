import "./App.css";
import Home from "./pages/Home";
import React from 'react';
import About from "./pages/About";
import { Routes, Route } from 'react-router-dom';

function App() {
  return ( 
   <Routes> 
     <Route index element={<Home />} />
     <Route path="InfoPage/:siteNum" element={<About />} />
    </Routes>
  );
};

export default App;