const express = require('express');
const multer = require('multer');
const uploadImage = require('./uploadImage');
const Product = require('./productModel');

const app = express();
const upload = multer({ dest: 'uploads/' });

app.post('/upload', upload.single('file'), async (req, res) => {
  try {
    const result = await uploadImage(req.file.path);
    res.json({ url: result.Location });
  } catch (err) {
    res.status(500).json({ error: 'Failed to upload image' });
  }
});

app.post('/products', async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({ error: 'Failed to save product' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});




// const express = require("express");
// const mongoose = require('mongoose');
// const cors = require('cors');
// const dotenv = require('dotenv')
// const app = express();
// const { Server } = require("socket.io");
// const http = require("http");
// const bodyParser = require("body-parser")

// app.use(cors());
// const server = http.createServer(app);
// const io = new Server(server, {
//   cors: {
//     origin: "*",
//   },
// });
// app.use(bodyParser.json());
// app.get("/", (req, res) => {
//   res.send("check");
// });
// server.listen(5000, () => {
//     console.log("server started");
// });
// const url = "mongodb+srv://aryan:carboncopy@ownerserver.etxm4ay.mongodb.net/?retryWrites=true&w=majority&appName=OwnerServer";

// mongoose.connect(url).then((results) => console.log("connected"));

// io.on("connection", (socket)=>{
//     console.log("New socket Connected", socket.id);

//     socket.on("data", (formData) => {
//       const dataRec = formData;
//       console.log(formData);
//       socket.emit("catch", dataRec);
//     })

// });



