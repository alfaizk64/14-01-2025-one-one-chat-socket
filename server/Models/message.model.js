import mongoose from 'mongoose'



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

export default message;