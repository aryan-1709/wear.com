import axios from "axios";
const localpath = process.env.REACT_APP_SERVER_URL;

const placeOrder = async (formData, products) => {
    try {
        console.log(formData, products);
        const res = await axios.post(`${localpath}/order/placeOrder`, {formData, products});
        return res;
    } catch (error) {
        return {error: error};
    }
}

export {placeOrder};
