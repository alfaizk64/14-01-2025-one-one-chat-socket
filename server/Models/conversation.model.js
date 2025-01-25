const mongoos = require("mongoose");

const conversationModel = new mongoos.Schema({
  participants: [
    {
      type: mongoos.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  messages: [
    {
      type: mongoos.Schema.Types.ObjectId,
      ref: "Message",
    },
  ],
},
{
  timestamps:true
});

const conversation = mongoos.model("Conversation", conversationModel);
module.exports = conversation;
