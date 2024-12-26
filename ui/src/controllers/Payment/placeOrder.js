import { paymentHandler } from "./paymentHandler";
import axios from "axios";
const localpath = process.env.REACT_APP_SERVER_URL;

function getRandomHex() {
    return '#' + Math.floor(Math.random() * 16777215).toString(16);
}

const placeOrder = async ({formData, products, totalPrice, userInfo}) => {
    const resp = await paymentHandler({amount:totalPrice*100, receipt:getRandomHex(), userInfo})
    if(resp.data.msg === "success"){
        try {
            const res = await axios.post(`${localpath}/order/placeOrder`, {formData, products});
            return {data:res, msg:"success"};
        } catch (error) {
            return {error: error};
        }
    }
}

export {placeOrder};
