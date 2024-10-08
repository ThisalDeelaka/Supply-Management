const express = require('express');
const router = express.Router();
const Order = require('../models/Order');

router.get('/dashboard-summary', async (req, res) => {
    try {
        
        const completedOrders = await Order.countDocuments({ status: 'completed' });
       

        
        const pendingOrders = await Order.countDocuments({ status: { $ne: 'completed' } });
        

        
        const totalPaymentsData = await Order.aggregate([
            { $match: { isPaymentDone: true } },
            { $group: { _id: null, totalPayments: { $sum: '$paymentValue' } } }
        ]);
        const totalPayments = totalPaymentsData.length > 0 ? totalPaymentsData[0].totalPayments : 0;
        

       
        const completedPayments = await Order.countDocuments({ isPaymentDone: true });
       

       
        const duePayments = await Order.countDocuments({ isPaymentDone: false });
       

       
        res.status(200).json({
            completedOrders,
            pendingOrders,
            totalPayments,
            completedPayments,
            duePayments
        });
    } catch (error) {
        console.error('Error fetching dashboard summary:', error);
        res.status(500).json({ message: 'Error fetching dashboard summary', error });
    }
});

module.exports = router;
