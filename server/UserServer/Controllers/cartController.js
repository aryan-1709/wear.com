const Item = require("../Schemas/cartSchema");
const User = require("../Schemas/UserSchema");

const cartController = async (userId, object, qty) => {
    try {
        const item = new Item({
            products: object,
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

const deleteItem = async ({userId, object, qty}) => {
    try {
        // console.log(userId, object, qty);
        await User.findById(userId).then( async (user)=>{
            const cart = user.cart;
            // console.log(cart)
            const ref = cart.find((products._id).toString()==(object._id).toString());
            console.log(ref);
        }); 
        // await User.findByIdAndUpdate(
        //     userId,
        //     { $pull: { cart: {products: object } } },
        //     { new: true }, // To return the updated document
        //     function(err, updatedUser) {
        //         if (err) {
        //             console.error("Error removing item from cart:", err);
        //         } else {
        //             console.log("Item removed from cart successfully:", updatedUser);
        //         }
        //     }
        // );
    } catch (error) {
        return "test";
    }
}



module.exports =  {cartController, deleteItem};