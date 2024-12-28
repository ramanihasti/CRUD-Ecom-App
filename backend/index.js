const express = require("express");
const dotenv = require("dotenv");
const connect = require("./db/connect");
const categoryRouter = require("./router/CategoryRouter");
const server = express();
dotenv.config();
const fileUpload = require("express-fileupload");
const subCategoryRouter = require("./router/SubCategoryRouter");
const productRouter = require("./router/ProductRouter");
const pageRouter = require("./router/PageRouter");
const cors = require("cors");

// server.use(express.json);
server.use(cors());
server.use(fileUpload());
server.use("/uploads", express.static("uploads")); // upload path pe aana wali koi bhi req ko handle karna hain

server.use("/categories", categoryRouter);
server.use("/subCategories", subCategoryRouter);
server.use("/product", productRouter);
server.use("/page", pageRouter);

const start = async () => {
  try {
    await connect();
    console.log("Successfully connected to the database.");
    server.listen(process.env.PORT, () => {
      console.log(`Server is listeing on port ${process.env.PORT}.`);
    });
  } catch (error) {
    console.log("Failed to connected database." + error);
  }
};

start();
