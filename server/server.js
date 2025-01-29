const express = require("express");
const cors = require("cors");
const {app,server} = require('./socket/socket')
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const userRoute = require("./Routes/user.routes");
const messageRoute = require("./Routes/chat.routes");
const connectDb = require("./Config/db");
dotenv.config();
const PORT = process.env.PORT || 4040;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())
const corsOptions = {
  origin: "http://localhost:5173", 
  credentials: true, // Allow cookies

};
app.use(cors(corsOptions));

// routes
app.use("/api/v1/user", userRoute);
app.use("/api/v1/message",messageRoute)


server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
