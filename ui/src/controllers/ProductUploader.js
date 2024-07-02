import axios from "axios";
const locapath = "http://localhost:5000";

const ProductUploader = async (file) =>{
    try {
        const res = await axios.post(`${locapath}/admin/list`, file);
        return res;
    } catch (error) {
        console.log("Product cannot be listed", error);
        return error;
    }
}

export {ProductUploader};
