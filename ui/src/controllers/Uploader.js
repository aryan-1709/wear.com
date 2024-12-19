import axios from "axios";
const localpath = process.env.REACT_APP_LOCALHOST_OWNER;

const Uploader = async (file) => {
  try {
    const res = await axios.post(`${localpath}/admin/upload`, file);
    return res;
  } catch (error) {
    console.error("Error Uploading file", error);
  }
};

export { Uploader };
