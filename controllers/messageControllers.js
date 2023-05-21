import Message from "../models/Message.js"

// send message
export const newMessage = async(req, res)=>{
    const newMessage = new Message(req.body)
    try{
        const saveMessage = await newMessage.save()
        res.status(201).json(saveMessage)
    }
    catch(error){
        res.status(500).josn(error.message)  
    }
}

// get message

export const getMessage = async(req, res)=>{
    
    try{
        const messages = await Message.find({
            conversationId: req.params.conversationId
        })
        res.status(201).json(messages)
    }
    catch(error){
        res.status(500).josn(error.message)
    }
}

export const getLastMessage = async(req, res)=>{
    
    try{
        const messages = await Message.find({
            conversationId: req.params.conversationId
        }).sort({createdAt: -1}).limit(1)
        res.status(201).json(...messages)
    }
    catch(error){
        res.status(500).josn(error.message)
    }
}