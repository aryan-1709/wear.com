const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const app = express();
const http = require("http");
const bodyParser = require("body-parser");
const uploadRoute = require("./Routes/routeUpload");
const listProduct = require("./Routes/listProduct");
const data = require("./Routes/loadProducts");

app.use(cors());
const server = http.createServer(app);

app.use(bodyParser.json());

server.listen(process.env.PORT_OWNER, () => {
  console.log(`server started at http://localhost:${process.env.PORT_OWNER}`);
});
(async function connectToMongoDB() {
  try {
    await mongoose
      .connect(process.env.MONGO_URL)
      .then((results) => console.log("connected"));
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
    process.exit(1);
  }
})();

app.get("/", (req, res) => {
  res.send("Hello");
});

app.use("/admin", data);
app.use("/admin", uploadRoute);
app.use("/admin", listProduct);
