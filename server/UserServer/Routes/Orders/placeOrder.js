const express = require('express');
const router = express.Router();
const {handlePlaceOrder} = require('../../Controllers/PaymentHandler/placeOrder')

router.post('/placeOrder', async (req, res)=>{
    try {
        const {formData, products} = req.body;
        console.log("At router ",formData, products)
        const resp = await handlePlaceOrder({formData, products});
        res.json(resp);
    } catch (error) {
        console.log(error);
        res.status(500).send("Error");
    }
})

module.exports = router;