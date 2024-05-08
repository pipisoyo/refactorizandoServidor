import express from "express";
import mongoose from "mongoose";
import { Server } from 'socket.io';
import config from "../config.js";

const app = express();
const PORT = config.port;
const DB_URL = config.mongo_url;

const connectMongoDB = async () => {
  const dataBase = 'ecommerce';
  try {
    await mongoose.connect(DB_URL, { dbName: dataBase });
    console.log("Conectado a la base de datos 'ecommerce'");
  } catch (error) {
    console.error("No se pudo conectar a la base de datos", error);
    process.exit();
  }
}

connectMongoDB()

const server = app.listen(PORT, () => console.log("Server listening in", PORT))
const io = new Server(server)
console.log("config",config)
export { app, io };