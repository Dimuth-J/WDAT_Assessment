import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import './global.css'


import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Desktop from './components/Desktop/Desktop';
import AllTaskView from './components/AllTaskView/AllTaskView';
import Trash from './components/Trash/Trash'


function App() {

  return (
    <Router>
        {/* <Toaster
          position="top-center"
          toastOptions={{ duration: 3000 }}
        ></Toaster>
        <ToastContainer position="top-right" autoClose={3000} /> */}

        <Routes>
          
          <Route
            path="/" element={<Desktop />}
          />
          <Route
            path="/AllTaskView" element={<AllTaskView />}
          />
          <Route
            path="/Trash" element={<Trash />}
          />
          
        </Routes>
      </Router>
  )
}

export default App
