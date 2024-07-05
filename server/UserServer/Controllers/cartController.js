const Item = require("../Schemas/cartSchema");
const User = require("../Schemas/UserSchema");

const cartController = async (userId, objectId, qty) => {
    try {
        console.log(userId," ",objectId," ", qty);
        const item = new Item({
            product_id: objectId,
            quantity: qty
        });
        //I am not saving this product to items
        // await item.save();
        await User.findById(userId).then( async user => {
          user.cart.push(item); 
          await user.save();
        });
        return "Item saved to cart";
    } catch (error) {
        return {"Cannot save Item": error};
    }
    
}

module.exports =  cartController;