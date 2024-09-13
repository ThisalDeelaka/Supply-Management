import React, { useState, useEffect } from 'react';
import './makeOrder.css';

const MakeOrder = () => {
  const [supplierName, setSupplierName] = useState('');
  const [orderDate, setOrderDate] = useState('');
  const [items, setItems] = useState([{ itemName: '', quantity: 1, description: '' }]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [suppliers, setSuppliers] = useState([]);


  useEffect(() => {
    const fetchSuppliers = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/suppliers'); 
        const data = await response.json();
        setSuppliers(data.suppliers); 
      } catch (error) {
        console.error('Failed to fetch suppliers:', error);
      }
    };

    fetchSuppliers();
  }, []);

  const handleAddItem = () => {
    setItems([...items, { itemName: '', quantity: 1, description: '' }]);
  };

  const handleItemChange = (index, field, value) => {
    const newItems = [...items];
    newItems[index][field] = value;
    setItems(newItems);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    const orderData = {
      supplierName,
      orderDate,
      items,
    };

    try {
      const response = await fetch('http://localhost:5000/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });

      if (response.ok) {
        setMessage('Order created successfully!');
        setSupplierName('');
        setOrderDate('');
        setItems([{ itemName: '', quantity: 1, description: '' }]); 
      } else {
        setMessage('Error creating order');
      }
    } catch (error) {
      setMessage('Failed to connect to the server');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="make-order-container">
      <h1 className="form-title">Make an Order</h1>

      <form onSubmit={handleSubmit}>
        {/* Supplier Dropdown */}
        <div className="form-group">
          <label className="form-label">Supplier Name</label>
          <select
            value={supplierName}
            onChange={(e) => setSupplierName(e.target.value)}
            className="form-input"
            required
          >
            <option value="" disabled>Select a supplier</option>
            {suppliers.map((supplier) => (
              <option key={supplier._id} value={supplier.name}>
                {supplier.name}
              </option>
            ))}
          </select>
        </div>

        {/* Order Date */}
        <div className="form-group">
          <label className="form-label">Order Date</label>
          <input
            type="date"
            value={orderDate}
            onChange={(e) => setOrderDate(e.target.value)}
            className="form-input"
            required
          />
        </div>

        {/* Items */}
        <h2 className="items-title">Items</h2>
        {items.map((item, index) => (
          <div key={index} className="item-group">
            {/* First Row - Item Name and Quantity */}
            <div className="item-row">
              <input
                type="text"
                value={item.itemName}
                onChange={(e) => handleItemChange(index, 'itemName', e.target.value)}
                className="form-input item-name"
                placeholder="Item Name"
                required
              />
              <input
                type="number"
                value={item.quantity}
                onChange={(e) => handleItemChange(index, 'quantity', e.target.value)}
                className="form-input item-quantity"
                placeholder="Quantity"
                min="1"
                required
              />
            </div>
            {/* Second Row - Description */}
            <div className="description-row">
              <input
                type="text"
                value={item.description}
                onChange={(e) => handleItemChange(index, 'description', e.target.value)}
                className="form-input item-description"
                placeholder="Description"
              />
            </div>
          </div>
        ))}

        {/* Add Another Item Button */}
        <button
          type="button"
          onClick={handleAddItem}
          className="add-item-button"
        >
          Add Another Item
        </button>

        {/* Submit Button */}
        <button
          type="submit"
          className="submit-button"
        >
          {loading ? 'Submitting...' : 'Submit Order'}
        </button>
      </form>

      {/* Status Message */}
      {message && <p className="status-message">{message}</p>}
    </div>
  );
};

export default MakeOrder;
