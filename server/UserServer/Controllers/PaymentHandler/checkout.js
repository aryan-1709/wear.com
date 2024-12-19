const Razorpay = require('razorpay')

const checkout =  async (options) => {
    try {
        const razorpay = new Razorpay({
          key_id: process.env.RAZORPAY_KEY_ID,
          key_secret: process.env.RAZORPAY_SECRET,
        });
    
        // const options = req.body;
        // console.log(options);
        const order = await razorpay.orders.create(options);
    
        if (!order) {
          return {status:500, msg:"Error"}
        }
    
        return {status:200, order};
      } catch (err) {
        console.log(err);
        return {status:500, msg:"Error"};
      }
}

module.exports = {checkout};