import axios from "axios";
const localpath = "http://localhost:5000";

const cartHandler = ({product, userId, qty}) => {
    const res = axios.post(`${localpath}/user/addItem`, {userId:userId, product:product, qty:qty});
    return res;
}

const deleteItem = ({product, userId, qty}) => {
    console.log(product, userId, qty);
    const res = axios.post(`${localpath}/user/deleteItem`, {userId:userId, object:product, qty:qty});
    return res;
}

export {cartHandler, deleteItem};