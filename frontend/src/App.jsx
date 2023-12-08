import React from "react";
import Home from "./pages/Home";
import { Route, Routes } from "react-router-dom";
import Predict from "./pages/Predict";
import SingleCrop from "./pages/SingleCrop";
import Navbar from "./components/Navbar";
import Community from "./pages/Community";

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/predict' element={<Predict />} />
        <Route path='/community' element={<Community />} />
        <Route path='/crop/:id' element={<SingleCrop />} />
      </Routes>
    </>
  );
};

export default App;
