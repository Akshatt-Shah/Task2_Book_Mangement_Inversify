import "reflect-metadata";
import { InversifyExpressServer } from "inversify-express-utils";
import { Container } from "inversify";
import container from "./src/container/containerbind";

import express from "express";
import mongoose from "mongoose";
import { config } from "dotenv";
import cookieParser from "cookie-parser";


config();
const server = new InversifyExpressServer(container);
server.setConfig((app) => {
  app.use(express.json());
  app.use(cookieParser());
  //User routes
});

async function start() {
  let app = server.build();
  const port = process.env.PORT || 4000;
  const MongoUrl = process.env.MONGO_URL;
  if (MongoUrl !== undefined) {
    app.listen(port, () => {
      console.log("Server Running On this Port ", port);
    });
    await mongoose
      .connect(MongoUrl)
      .then(() => {
        console.log("MongoDB Connected");
      })
      .catch((err) => {
        console.error("MongoDB connection error:", err);
      });
  } else {
    console.log("Please Provide The MongoDB Url");
  }
}

start();
