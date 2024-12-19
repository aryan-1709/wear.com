import image from "../../images/hoodie.png";
const localpath = process.env.REACT_APP_LOCALHOST;
const RAZORPAY_KEY_ID = process.env.REACT_APP_RAZORPAY_KEY_ID;

const paymentHandler = async ({amount, receipt, userInfo}) => {
    // console.log("id:",RAZORPAY_KEY, " path ", localpath);
    // console.log("amount:",amount);
    const response = await fetch(`${localpath}/order/checkout`, {
      method: "POST",
      body: JSON.stringify({
        amount,
        currency:"INR",
        receipt,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const order = await response.json();
    // console.log("order",order);

    var options = {
      key: RAZORPAY_KEY_ID, // Enter the Key ID generated from the Dashboard
      amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency:"INR",
      name: "Carbon Copy", //your business name
      description: "Test Transaction",
      image: {image},
      order_id: order.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
      handler: async function (response) {
        const body = {
          ...response,
        };

        const validateRes = await fetch(
          `${localpath}/order/validate`,
          {
            method: "POST",
            body: JSON.stringify(body),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const jsonRes = await validateRes.json();
        // console.log(jsonRes);
      },
      prefill: {
        //We recommend using the prefill parameter to auto-fill customer's contact information, especially their phone number
        name: userInfo.name, //your customer's name
        email: userInfo.email,
        contact: "923200000", //Provide the customer's phone number for better conversion rates
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
      alert(response.error.code);
      alert(response.error.description);
      alert(response.error.source);
      alert(response.error.step);
      alert(response.error.reason);
      alert(response.error.metadata.order_id);
      alert(response.error.metadata.payment_id);
    });
    rzp1.open();
    // e.preventDefault();
  };

  export {paymentHandler};