import axios from "axios";
const localpath = "http://localhost:5000";

const cartHandler = async ({ product, userId, qty }) => {
  const res = await axios.post(`${localpath}/user/addItem`, {
    userId: userId,
    product: product._id,
    qty: qty,
  });
  return res;
};

const deleteItem = async ({ product, userId, qty }) => {
  const res = await axios.post(`${localpath}/user/deleteItem`, {
    userId: userId,
    objectId: product._id,
    qty: qty,
  });
  return res;
};

const clearCartItems = async ({ userId }) => {
  try {
    const res = await axios.post(`${localpath}/user/clearCart`, {
      userId: userId,
    });
    return res;
  } catch (error) {
    console.log("Error occured Axios");
  }
};

const getProductById = async (cart) => {
  let myCart = [];
  await Promise.all(
    cart.map(async (item) => {
      const product = await axios.post(`${localpath}/user/getProductById`, {
        product_id: item.products,
      });
      myCart.push({ products: product.data, qty: 1 });
    })
  );
  return myCart;
};

export { cartHandler, deleteItem, getProductById, clearCartItems };
