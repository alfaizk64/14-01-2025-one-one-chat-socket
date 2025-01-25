const mongoose = require('mongoose')
const dotenv = require("dotenv")
dotenv.config()

const URI = process.env.MONGO_URL



const dbConnect = mongoose.connect(URI)
.then(() => console.log("Connected to MongoDB"))
  .catch((err) => {
    console.log("db connection error: ");
    console.error(err);
    process.exit(1);
  });

  module.exports=dbConnect  