const Order = require('../../../OwnerServer/schemas/orderModel');

// name: '',
//     email: '',
//     phone: '',
//     address: '',
//     city: '',
//     state: '',
//     pincode: '',
//     paymentMethod: '',

const handlePlaceOrder = async ({formData, products}) => {
    console.log("placeOrder ", {formData, products});
    const newOrder = new Order({
        products:products,
        name:formData.name,
        number:formData.phone,
        add:formData.address,
        city:formData.city,
        state:formData.state,
        picode:formData.pincode,
        
    });
    const res = await newOrder.save();
    console.log(res);
    return res;
}

module.exports = {handlePlaceOrder};