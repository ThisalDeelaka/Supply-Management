import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import MakeOrder from './components/MakeOrder';
import OrderList from './components/OrderList';
import Sidebar from './components/Sidebar';
import Header from './components/Header'; // Import the Header component
import Footer from './components/Footer'; // Import the Footer component
import RegisterSupplier from './components/RegisterSupplier';

import './App.css';


function App() {
  return (
    <Router>
      <div className="app-container">
        
        {/* Header */}
        <Header />

        <div className="content-container">
          {/* Sidebar */}
          <Sidebar />

          {/* Main Content Area */}
          <div className="main-content">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/make-order" element={<MakeOrder />} />
              <Route path="/order-list" element={<OrderList />} />
              <Route path="/supplier" element={<RegisterSupplier />} />
              
            </Routes>
          </div>
        </div>
        <Footer /> 
      </div>
    </Router>
  );
}

export default App;
