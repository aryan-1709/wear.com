import {Uploader} from "../Uploader"
import { getProductById } from "../Products/getSingleProduct";
import axios from "axios";
const localpath = process.env.REACT_APP_SERVER_URL;
// const localpath = process.env.REACT_APP_SERVER_URL;
// const localpath = process.env.REACT_APP_LOCALHOST;

const cartHandler = async ({ product, userId, qty, size, color }) => {
  try {
    const res = await axios.post(`${localpath}/user/addItem`, {
      userId: userId,
      product: product._id,
      qty: qty,
      size: size,
      color: color
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

const getProducts = async (cart) => {
  let myCart = [];
  await Promise.all(
    cart.map(async (item) => {
      try {
        const product = await getProductById(item.products)
        if(product.error) console.log(product.error)
        else
          myCart.push({ products: product.data, qty: item.quantity,  color:item.color, size:item.size, _id:item._id, imageToPrint:item.imageToPrint });
      } catch (error) {
        return { error: error };
      }
    })
  );
  return myCart;
};

//adding Images
const addOrUpdateImageController = async ({userId, cartId, formData}) => {
  try {
    const img = await Uploader(formData);
    const imgUrl = img.data;
    const res = await axios.post(`${localpath}/user/addOrUpdateImage`, {userId, cartId, imgUrl});
    return res;
  } catch (error) {
    return error;
  }
}

export { cartHandler, deleteItem, getProducts, clearCartItems, addOrUpdateImageController};
