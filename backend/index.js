const express = require("express");
const dotenv = require("dotenv");
const connect = require("./db/connect");
const categoryRouter = require("./router/CategoryRouter");
dotenv.config();
const server = express();

server.use(express.json());
server.use("/categories", categoryRouter);

const start = async () => {
  try {
    await connect();
    console.log("Successfully connect to the database.");
    server.listen(process.env.PORT, () => {
      console.log(`Server is listeing on port ${process.env.PORT}.`);
    });
  } catch (error) {
    console.log("Failed to connected the database." + error.message);
  }
};

start();
