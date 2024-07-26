import axios from "axios";
const localpath = process.env.REACT_APP_SERVER_URL;

const cartHandler = async ({ product, userId, qty }) => {
  try {
    const res = await axios.post(`${localpath}/user/addItem`, {
      userId: userId,
      product: product._id,
      qty: qty,
    });
    return res;
  } catch (error) {
    return { error: error };
  }
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
    return { error: error };
  }
};

const getProductById = async (cart) => {
  let myCart = [];
  await Promise.all(
    cart.map(async (item) => {
      try {
        const product = await axios.post(`${localpath}/user/getProductById`, {
          product_id: item.products,
        });
        myCart.push({ products: product.data, qty: 1 });
      } catch (error) {
        return { error: error };
      }
    })
  );
  return myCart;
};

export { cartHandler, deleteItem, getProductById, clearCartItems };
