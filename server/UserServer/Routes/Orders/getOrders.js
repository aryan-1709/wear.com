const express = require('express');
const router = express.Router();
const Orders = require('../../../OwnerServer/schemas/orderModel');
const User = require('../../Schemas/UserSchema')

router.post('/getOrders', async (req, res) => {
    const uId = req.body.uId;
    let orders = []; // Expecting an array of order IDs
    try {
        const user = await User.findById(uId);
        if(user)    orders = user.purchasedItems;
        else{
            return {msg:"user not found"}
        }    
    } catch (error) {
        return {error:error};
    }

    const purchasedItems = [];
    
    try {
        // Use Promise.all to fetch orders in parallel
        await Promise.all(
            orders.map(async (oId) => {
                const orderedItem = await Orders.findById(oId);
                if (orderedItem) {
                    purchasedItems.push(orderedItem);
                }
            })
        );
        // console.log("Fetched items: ", purchasedItems);
        res.json(purchasedItems); // Send the fetched items back to the client
    } catch (error) {
        // console.error("Error fetching orders: ", error);
        res.status(500).json({ error: "An error occurred while fetching orders" });
    }
});

module.exports = router;
