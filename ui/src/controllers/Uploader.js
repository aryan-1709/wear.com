import axios from "axios";
const localpath = "https://wear-com.onrender.com";

const Uploader = async (file) => {
  try {
    const res = await axios.post(`${localpath}/admin/upload`, file);
    return res;
  } catch (error) {
    console.error("Error Uploading file", error);
  }
};

export { Uploader };
