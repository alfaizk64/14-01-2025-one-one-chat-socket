const mongoose = require('mongoose')



const messageModel = mongoose.Schema({
    senderId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    receiverId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    message:{
        type: String,
        required: true,
    },
},{
    timestamps:true
  }
)
const message = mongoose.model("Message",messageModel)
module.exports = message;