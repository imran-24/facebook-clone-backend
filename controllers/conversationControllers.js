import Conversation from "../models/Converstation.js"


// create conversation
export const createConversation = async(req, res)=>{
    const newConvo = new Conversation({
        members: [req.body.senderId, req.body.receiverId]
    })
    try{
        const saveConvo = await newConvo.save()
        res.status(201).json(saveConvo)
    }
    catch(error){
        req.status(500).json(error.message)
    }
}

// get conversation
export const getConversation = async(req, res)=>{
   
    try{
        const connvo = await Conversation.find({
            members: {$in: [req.params.userId]}
        })
        res.status(200).json(connvo)
    }
    catch(error){
        req.status(500).json(error.message)
    }
}