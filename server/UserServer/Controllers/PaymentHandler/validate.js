const crypto = require('crypto')

const validate = async ({ razorpay_order_id, razorpay_payment_id, razorpay_signature }) => {
  const sha = crypto.createHmac("sha256", process.env.RAZORPAY_SECRET);
  //order_id + "|" + razorpay_payment_id
  sha.update(`${razorpay_order_id}|${razorpay_payment_id}`);
  const digest = sha.digest("hex");
  if (digest !== razorpay_signature) {
    return {status:400, msg:"Transaction is not legit!"}
  }

  return {
    msg: "success",
    orderId: razorpay_order_id,
    paymentId: razorpay_payment_id,
  };
};

module.exports = {validate};