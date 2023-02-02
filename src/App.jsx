import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "../src/components/login/login"
import MyCourses from './components/myCourses/myCourses';
import Overview from './components/overview/overview';
import TestPage from './components/test/testPage';
import Congrats from './components/congrats/congrats';
import HomePage from './components/homePage/homePage';
import Ongoing from './components/ongoing/ongoing';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/myCourses" element={<MyCourses />}></Route>
        <Route path="/overview" element={<Overview />}></Route>
        <Route path="/testPage" element={<TestPage />}></Route>
        <Route path="/congrats" element={<Congrats />}></Route>
        <Route path="/homePage" element={<HomePage />}></Route>
        <Route path="/ongoing" element={<Ongoing />}></Route>
      </Routes>
    </BrowserRouter>

  );
}

export default App;
