import axios from "axios";
const localpath = process.env.REACT_APP_SERVER_URL;

const getProducts = async () => {
  try {
    const data = await axios.get(`${localpath}/user/get`);
    return data;
  } catch (error) {
    return { error: error };
  }
};

export { getProducts };
