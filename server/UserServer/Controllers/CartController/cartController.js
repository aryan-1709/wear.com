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

// Delete item from the cart
const deleteItem = async ({ userId, objectId }) => {
  try {
    const user = await User.findById(userId);
    if (!user) return { msg: "User not found" };

    user.cart = user.cart.filter(
      (item) => item.products.toString() !== objectId.toString()
    );

    await user.save();
    return { msg: "Item deleted successfully", cart: user.cart };
  } catch (error) {
    return { msg: "Something went wrong", error: error };
  }
};

// Clear cart
const clearCart = async ({ userId }) => {
  try {
    const user = await User.findById(userId);
    if (!user) return { msg: "User not found" };

    user.cart = [];
    await user.save();
    return { msg: "Cart cleared successfully" };
  } catch (error) {
    return { msg: "Something went wrong", error: error };
  }
};

// Add or update image
const addOrUpdateImage = async ({ userId, cartId, imgUrl }) => {
  try {
    const user = await User.findById(userId);
    if (!user) return { msg: "User not found" };
    const cartItem = user.cart.find(
      (item) => item._id.toString() === cartId.toString()
    );
    if (cartItem) {
      cartItem.imageToPrint = imgUrl;
      await user.save();
      return { msg: "Image added/updated successfully", cart: user.cart };
    } else {
      return { msg: "Item not found in cart" };
    }
  } catch (error) {
    return { error: "Cannot add/update image", details: error };
  }
};

// Update quantity of a specific item in the cart
const updateItemQuantity = async ({userId, cartId, newQuantity}) => {
  try {
    const user = await User.findById(userId);
    if (!user) return { msg: "User not found" };

    const itemIndex = user.cart.findIndex(
      (item) =>
        item._id.toString() === cartId.toString()
    );
    if (itemIndex > -1) {
      user.cart[itemIndex].qty = newQuantity;

      if (newQuantity <= 0) {
        user.cart.splice(itemIndex, 1);
      }

      await user.save();
      return { msg: "Item quantity updated", cart: user.cart };
    } else {
      return { msg: "Item not found in cart" };
    }
  } catch (error) {
    return { error: "Cannot update item quantity", details: error };
  }
};


module.exports = {
  cartController,
  updateItemQuantity,
  deleteItem,
  clearCart,
  addOrUpdateImage,
};
