// import axios from "axios";
// const localpath = process.env.REACT_APP_SERVER_RENDER;
const localpath = process.env.REACT_APP_LOCALHOST;

const getProductById = async (id) => {
  try {
    // const response = await axios.get(`${localpath}/user/get/${id}`);
    const response = await fetch(`${localpath}/user/get/${id}`);
    return await response.json();
  } catch (error) {
    return { error: "Failed to fetch product" };
  }
};

export { getProductById };
