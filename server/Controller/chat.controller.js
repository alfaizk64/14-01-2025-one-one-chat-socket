import conversationSchema from '../Models/conversation.model.js'
import messageSchema from '../Models/message.model.js'
import {io,getReceiverSocketId} from "../socket/socket.js"


export const sendMessage = async (req, res) =>{
    try {
        const senderId = req.user.userId;
        const receiverId = req.params.id;
           if(!senderId || !receiverId){
            return res.status(400).json({ message: "Receiver ID and Sender ID is required.", success : false });
           }
        const{message} =req.body;
                 
        if(!message){
            return res.status(400).json({ message: "Message field is required." });
        }
        let getConversation = await conversationSchema.findOne({participants:{$all:[senderId,receiverId]}})
            
            
        if(!getConversation){
            getConversation = await conversationSchema.create({participants:[senderId,receiverId]});
        }
           const newMessage = await messageSchema.create({
            senderId,
            receiverId,
            message
           })
            
        
           if(newMessage){
            getConversation.messages.push(newMessage._id)
    }
    // await getConversation.save()
    // await newMessage.save()
    await Promise.all([getConversation.save(),newMessage.save()])
            // SOCKET IO
            const recierSocketId = getReceiverSocketId(receiverId)
            if(recierSocketId){
                io.to(recierSocketId).emit('newMessage', newMessage);
            }
            res.status(201).json({
               newMessage    
            });
    } catch (error) {
        console.error("Message sending error:", error.message);
         
    }
}


export const getMessage = async (req, res) => {
    try {
         const reciveriId = req.params.id 
         const senderId = req.user.userId  
              if(!reciveriId || !senderId){
                return res.status(400).json({ message: "Receiver ID and Sender ID is required." });
              }
         const conversation = await conversationSchema.findOne({
            participants: { $all: [senderId, reciveriId] },
         }).populate("messages")
          
         res.status(200).json({ message:
            conversation?.messages
            });

    } catch (error) {
        res.status(error.message).json({ message:
            "Server Error"
        });
        console.log("Message getting error:", error.message);
        
    }
}
