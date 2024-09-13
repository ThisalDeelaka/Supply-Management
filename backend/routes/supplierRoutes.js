const express = require('express');
const Supplier = require('../models/Supplier'); 
const router = express.Router();


router.post('/suppliers', async (req, res) => {
  const { name, contactInfo, address } = req.body;


  if (!name || !contactInfo.email || !contactInfo.phone || !address) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
  
    const newSupplier = new Supplier({
      name,
      contactInfo,
      address,
    });

   
    await newSupplier.save();

 
    res.status(201).json({ message: 'Supplier registered successfully', supplier: newSupplier });
  } catch (error) {
    console.error('Error registering supplier:', error);
    res.status(500).json({ message: 'Error registering supplier' });
  }
});


router.get('/suppliers', async (req, res) => {
  try {
    const suppliers = await Supplier.find({}); 
    res.status(200).json({ suppliers }); 
  } catch (error) {
    console.error('Error fetching suppliers:', error);
    res.status(500).json({ message: 'Error fetching suppliers' });
  }
});

module.exports = router;
