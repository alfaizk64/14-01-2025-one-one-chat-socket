import express from "express";
import path from "path";
import cors from "cors";
import {app,server} from './socket/socket.js'
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import userRoute from './Routes/user.routes.js'
import messageRoute from './Routes/chat.routes.js'
import connectDb from "./Config/db.js"
dotenv.config();
const PORT = process.env.PORT || 4040;

const __dirname = path.resolve();
console.log(__dirname);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())
const corsOptions = {
  origin: "https://one4-01-2025-one-one-chat-socket.onrender.com", 
  credentials: true, // Allow cookies

};
app.use(cors(corsOptions));

// routes
app.use("/api/v1/user", userRoute);
app.use("/api/v1/message",messageRoute)

// Serve static files from the React app
app.use(express.static(path.join(__dirname, "/client/dist")));


app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/client/dist", "index.html"));
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
