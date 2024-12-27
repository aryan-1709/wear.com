// const localpath = process.env.REACT_APP_LOCALHOST;
const localpath = process.env.REACT_APP_SERVER_URL;
const RAZORPAY_KEY_ID = process.env.REACT_APP_RAZORPAY_KEY_ID;

const paymentHandler = async ({amount, receipt, userInfo}) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(`${localpath}/order/checkout`, {
        method: "POST",
        body: JSON.stringify({
          amount,
          currency: "INR",
          receipt,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const order = await response.json();
      console.log(order)
      var options = {
        key: RAZORPAY_KEY_ID,
        amount,
        currency: "INR",
        name: "Carbon Copy",
        description: "Test Transaction",
        image: "https://res.cloudinary.com/dc7cojpvn/image/upload/v1734935432/slqzoezdocdczzwzh2fg.png",
        order_id: order.id,
        handler: async function (response) {
          try {
            const validateRes = await fetch(
              `${localpath}/order/validate`,
              {
                method: "POST",
                body: JSON.stringify(response),
                headers: {
                  "Content-Type": "application/json",
                },
              }
            );
            const jsonRes = await validateRes.json();
            resolve({ success: true, data: jsonRes });
          } catch (error) {
            reject({ success: false, error: "Payment validation failed" });
          }
        },
        prefill: {
          name: userInfo.name,
          email: userInfo.email,
          contact: "923200000",
        },
        notes: {
          address: "Razorpay Corporate Office",
        },
        theme: {
          color: "#3399cc",
        },
      };

      var rzp1 = new window.Razorpay(options);
      rzp1.on("payment.failed", function (response) {
        reject({
          success: false,
          error: response.error.description,
          errorData: response.error
        });
      });
      rzp1.open();
    } catch (error) {
      reject({ success: false, error: "Failed to initialize payment" });
    }
  });
};

export { paymentHandler };