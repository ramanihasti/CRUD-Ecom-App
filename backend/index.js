const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const connect = require("./db/connect");
const fileUpload = require("express-fileupload");
const categoryRouter = require("./router/CategoryRouter");
const subCategoryRouter = require("./router/SubCategoryRouter");
const productRouter = require("./router/ProductRouter");
const pageRouter = require("./router/PageRouter");
const cors = require("cors");
const homePageRouter = require("./router/HomePageRouter");
const server = express();
const authRouter = require("./router/AuthRouter");

// server.use(express.json);
server.use(cors());
server.use(fileUpload());
server.use("/uploads", express.static("uploads")); // upload path pe aana wali koi bhi req ko handle karna hain

server.use("/categories", categoryRouter);
server.use("/subCategories", subCategoryRouter);
server.use("/products", productRouter);
server.use("/pages", pageRouter);
server.use("/homepages", homePageRouter);
server.use("/auth", authRouter);

const start = async () => {
  try {
    await connect();
    console.log("Successfully connected to the database.");
    server.listen(process.env.PORT, () => {
      console.log(`Server is listeing on port ${process.env.PORT}.`);
    });
  } catch (error) {
    console.log("Failed to connected the database." + error.message);
  }
};

start();
