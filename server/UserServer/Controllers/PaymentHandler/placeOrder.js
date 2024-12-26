const Order = require('../../../OwnerServer/schemas/orderModel');
const User = require('../../Schemas/UserSchema');

const handlePlaceOrder = async ({formData, products}) => {
    const newOrder = new Order({
        products:products,
        name:formData.name,
        number:formData.phone,
        add:formData.address,
        city:formData.city,
        state:formData.state,
        picode:formData.pincode,
        cId:formData.cId,
        pImg:formData.pImg
    });
    const res = await newOrder.save();
    try {
        const user = await User.findById(formData.cId);
        if(user){
            user.purchasedItems.push(newOrder);
            await user.save();
            // console.log("user updated");
        }
        else{
            // console.log("No user found")
            return {error: "Could't find user"};
        }
    } catch (error) {
        // console.log("Error occured", error);
        return {error: error};
    }
    return res;
}

module.exports = {handlePlaceOrder};