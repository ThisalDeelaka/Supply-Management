import React from 'react';
import { NavLink } from 'react-router-dom';
import './sidebar.css';
import { FaTachometerAlt, FaShoppingCart, FaList } from 'react-icons/fa'; 

const Sidebar = () => {
  return (
    <div className="sidebar">
      {/* Navigation Links */}
      <nav className="nav-links">
        <NavLink
          exact
          to="/"
          className={({ isActive }) =>
            `nav-link ${isActive ? 'active' : ''}`
          }
        >
          <FaTachometerAlt className="nav-icon" /> Dashboard
        </NavLink>
        <NavLink
          to="/supplier"
          className={({ isActive }) =>
            `nav-link ${isActive ? 'active' : ''}`
          }
        >
          <FaList className="nav-icon" /> Supplier
        </NavLink>
        <NavLink
          to="/make-order"
          className={({ isActive }) =>
            `nav-link ${isActive ? 'active' : ''}`
          }
        >
          <FaShoppingCart className="nav-icon" /> Make Order
        </NavLink>

        <NavLink
          to="/order-list"
          className={({ isActive }) =>
            `nav-link ${isActive ? 'active' : ''}`
          }
        >
          <FaList className="nav-icon" /> Order List
        </NavLink>
      </nav>
    </div>
  );
};

export default Sidebar;
