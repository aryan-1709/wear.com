import axios from "axios";
const localpath = "http://localhost:5000";

const Uploader = async (file) => {
  try {
    const res = await axios.post(`${localpath}/admin/upload`, file);
    return res;
  } catch (error) {
    console.error("Error Uploading file", error);
  }
};

export { Uploader };
