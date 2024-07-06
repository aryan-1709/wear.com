import axios from "axios";
const locaPath = "http://localhost:5000";

const getProducts = async () => {
  try {
    const data = await axios.get(`${locaPath}/user/get`);
    return data;
  } catch (error) {
    return error;
  }
};

export { getProducts };
