const Item = require("../../Schemas/cartSchema");
const User = require("../../Schemas/UserSchema");
const Product = require("../../../OwnerServer/schemas/productModel");

//to save item into cart
const cartController = async (userId, objectId, qty, size, color) => {
  try {
    const item = new Item({
      products: objectId,
      qty: qty,
      size: size,
      color: color,
    });
    //I am not saving this product to items ---> But now I am Guess Why
    const user = await User.findById(userId);
    if (!user) return { msg: "User not found" };
    user.cart.push(item);
    await user.save();
    return { msg: "Item saved to cart", data: item };
  } catch (error) {
    return { "Cannot save Item": error };
  }
};

//to delete single item from the cart
const deleteItem = async ({ userId, objectId, qty }) => {
  try {
    await User.findById(userId).then(async (user) => {
      const new_cart = user.cart.filter(
        (item) => item.products._id.toString() !== objectId.toString()
      );
      user.cart = new_cart;
      await user.save();
    });
    return "Sucess";
  } catch (error) {
    return { msg: "Something went Wrong", error: error };
  }
};

//to clear cart
const clearCart = async ({ userId }) => {
  try {
    await User.findById(userId).then(async (user) => {
      user.cart = [];
      await user.save();
      return "Cart Cleared";
    });
  } catch (error) {
    return { msg: "Something went Wrong", error: error };
  }
};

//to add Image
const addOrUpdateImage = async ({ userId, cartId, imgUrl }) => {
  try {
    const user = await User.findById(userId);
    const cartItem = user.cart.find(
      (item) => item._id.toString() === cartId.toString()
    );
    if (cartItem) {
      cartItem.imageToPrint = imgUrl;
      await user.save();
      return { status: 200, msg: "Added ImageUri" };
    } else {
      return { status: 200, msg: "Not found in cart" };
    }
  } catch (error) {
    return { status: 500, error: error };
  }
};

module.exports = { cartController, deleteItem, clearCart, addOrUpdateImage };
