import React, { useEffect } from "react";
import Home from "./pages/Home";
import { Route, Routes } from "react-router-dom";
import AboutUs from "./pages/AboutUs";
import Predict from "./pages/Predict";
import SingleCrop from "./pages/SingleCrop";
import Navbar from "./components/Navbar";
import Community from "./pages/Community";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

var firebaseConfig = {
  apiKey: "AIzaSyDlfJUkRgoMzevsCnhybHJTVZcMkCGj6A4",
  authDomain: "crop-prediction-52f6c.firebaseapp.com",
  projectId: "crop-prediction-52f6c",
  storageBucket: "crop-prediction-52f6c.appspot.com",
  messagingSenderId: "680279219599",
  appId: "1:680279219599:web:411b7560e566b30771bffa",
};

// Initialize Firebase
// export const auth = getAuth(app);
// export default app;
const App = () => {
  useEffect(() => {
    initializeApp(firebaseConfig);
  }, []);
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
