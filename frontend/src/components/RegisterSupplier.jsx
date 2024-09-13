import React, { useState } from 'react';
import './RegisterSupplier.css';

const RegisterSupplier = () => {
  const [supplierData, setSupplierData] = useState({
    name: '', 
    contactInfo: {
      email: '',
      phone: '',
    },
    address: '',
  });
  const [message, setMessage] = useState('');


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'email' || name === 'phone') {
      setSupplierData((prevState) => ({
        ...prevState,
        contactInfo: { ...prevState.contactInfo, [name]: value },
      }));
    } else {
      setSupplierData({ ...supplierData, [name]: value });
    }
  };

 
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/suppliers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(supplierData),
      });

      if (response.ok) {
        setMessage('Supplier registered successfully!');
        setSupplierData({
          name: '',
          contactInfo: { email: '', phone: '' },
          address: '',
        });
      } else {
        setMessage('Error registering supplier.');
      }
    } catch (error) {
      console.error('Failed to register supplier:', error);
      setMessage('Failed to register supplier.');
    }
  };

  return (
    <div className="register-supplier-container">
      <h2 className="form-title">Register Supplier</h2>
      <form className="supplier-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Supplier Name</label>
          <input
            type="text"
            name="name"
            value={supplierData.name}
            onChange={handleInputChange}
            required
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={supplierData.contactInfo.email}
            onChange={handleInputChange}
            required
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label>Phone</label>
          <input
            type="tel"
            name="phone"
            value={supplierData.contactInfo.phone}
            onChange={handleInputChange}
            required
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label>Address</label>
          <input
            type="text"
            name="address"
            value={supplierData.address}
            onChange={handleInputChange}
            required
            className="form-input"
          />
        </div>

        <button type="submit" className="submit-button">
          Register Supplier
        </button>
      </form>
      {message && <p className="form-message">{message}</p>}
    </div>
  );
};

export default RegisterSupplier;
