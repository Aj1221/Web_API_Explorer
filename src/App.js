import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './Components/Home';
import ApiDetail from './Components/Apidetail';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/api/:providerName" element={<ApiDetail />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
