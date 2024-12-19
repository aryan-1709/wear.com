const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded());
app.use(cors());
app.use(bodyParser.json());

//Routes
const userLogin = require("./Routes/userLogin");
const signupRoute = require("./Routes/signupRoute");
const loadProducts = require("./Routes/Products/loadProducts");
const loadSingleProduct = require("./Routes/Products/loadSingleProduct")
const cartRoute = require("./Routes/CartRoutes/cartControllerRoute");
const support = require("./Routes/Support/enquiry");
const checkout = require('./Routes/Orders/checkout')
const validate = require('./Routes/Orders/validate')

//env variables
const PORT = process.env.PORT || 3000;
const URL = process.env.MONGO_URL;

//Connect to MongoDB
try {
  mongoose.connect(URL).then(console.log("Connected"));
} catch (error) {
  console.log("Error Connecting DB");
}

app.use("/user", userLogin);
app.use("/user", signupRoute);
app.use("/user", loadProducts);
app.use("/user", loadSingleProduct);
app.use("/user", cartRoute);
app.use("/user", support);
app.use('/order', checkout);
app.use('/order', validate)

app.listen(process.env.PORT, () => {
  console.log(`Server Started http://localhost:${PORT}`);
});
