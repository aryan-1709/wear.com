import axios from "axios";

// const localpath = process.env.REACT_APP_LOCALHOST;
const localpath = process.env.REACT_APP_SERVER_URL;

const getOrders = async (uId) => {
    try {
        // console.log("Sending purchasedItems: ", uId);
        const res = await axios.post(`${localpath}/order/getOrders`, { uId: uId });
        // console.log("Received response: ", res.data);
        return res.data; // Return the fetched data
    } catch (error) {
        // console.error("Error fetching orders: ", error);
        return [];
    }
};

export { getOrders };
