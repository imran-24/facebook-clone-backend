import express from 'express'
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs'
import User from '../models/User.js';
import Post from '../models/Post.js';
import RelationShip from '../models/Friend.js';
import Friends from '../models/Friend.js';

export const getFriendList = async (req, res) => {

    try{
        const userFriendList = await Friends.findOne({userId: req.params.id})      
        res.status(200).json(userFriendList)
    }
    catch(error){
        res.status(500).json(error.message);
    }
}

export const getAllFollowers = async (req, res) => {
   

    try{
        const friendList = await Friends.findOne({userId: req.params.id})   
        // console.log(friendList)
        const followers = await Promise.all(
            friendList.received.map( friendId => {
            return User.findById(friendId) }))
         
        res.status(200).json(followers)
    }

    catch(error){
        res.status(500).json(error);
    } 
}


export const sendRequest = async (req, res) => {
   
    const { userId, receiverId} = req.body;
    try{
        let userFriendList = await Friends.findOne({userId})
        let receiverFriendList = await Friends.findOne({userId: receiverId})
        if(!userFriendList){
            userFriendList =   await Friends.create({
                userId
            })
        }
        if(!receiverFriendList){
            receiverFriendList =  await Friends.create({
                userId: receiverId
            })
        }
        if(!userFriendList.sent.includes(receiverId)){
            await userFriendList.updateOne({ $push: { sent: receiverId } })
        }
        if(!receiverFriendList.received.includes(userId)){
            await receiverFriendList.updateOne({ $push: { received: userId } })
        }      
        res.status(201).json("Friend requiest sent")
    }
    catch(error){
        res.status(400).json(error.message);

    }
}

// UPDATE
export const acceptRequest = async (req, res) => {
   
    const { userId, senderId} = req.body;
    try{
        const userFriendList = await Friends.findOne({userId})
        const senderFriendList = await Friends.findOne({userId: senderId})
        
        if(userFriendList.received.includes(senderId)){
            
            await userFriendList.updateOne({ $push: { friends: senderId } })
            await userFriendList.updateOne({ $pull: { received: senderId } })
        }  
        if(senderFriendList.sent.includes(userId)){
            await senderFriendList.updateOne({ $push: { friends: userId } })
            await senderFriendList.updateOne({ $pull: { sent: userId } })

        }
        res.status(200).json('Request Accepted')
        
        // res.status(500).json("Could not send request")
    }
    catch(error){
        res.status(500).json(error.message)
    }
}

// DELETE REQUEST
export const deleteRequest = async (req, res) => {
    const { userId, receiverId} = req.body;
    try{
        const userFriendList = await Friends.findOne({userId})
        const receiverFriendList = await Friends.findOne({userId: receiverId})
    
        if(userFriendList.sent.includes(receiverId)){
            await userFriendList.updateOne({ $pull: { sent: receiverId } })
        }
        if(receiverFriendList.received.includes(userId)){
            await receiverFriendList.updateOne({ $pull: { received: userId } })
        }
        res.status(200).json("Friend requiest canceled")
    }
    catch(error){
        res.status(500).json(error);
    } 
}

// DELETE
export const deleteFriend = async (req, res) => {
    const { person1, person2} = req.body;
    try{
        const person1FriendList = await Friends.findOne({userId: person1})
        const person2FriendList = await Friends.findOne({userId: person2})
        
        if(person1FriendList.friends.includes(person2)){
            await person1FriendList.updateOne({ $pull: {friends: person2} })
        }  
        if(person2FriendList.friends.includes(person1)){
            await person2FriendList.updateOne({ $pull: {friends: person1} })
        } 
        res.status(200).json('You unfriended him')
        
        // res.status(500).json("Could not send request")
    }

    catch(error){
        res.status(500).json(error);
    } 
}


// // GET ALL USERS
// export const getAllUser = async (req, res) => {
//     const query = req.query.new;   // get the query 
//     const qSearch = req.query.search;   // get the query 

//     try{
//         const users = await User.find();
//         const search = users.filter(user => user.fullname.startsWith(qSearch))
//         res.status(200).json(search)
//     }

//     catch(error){
//         res.status(500).json(error);
//     } 
// }

// // GET 
// export const getUser = async (req, res) => {
//     try{
//         const searchedUser = await User.find({username: req.params.username});
//         res.status(200).json(...searchedUser)     
//     }

//     catch(error){
//         res.status(500).json(error);
//     } 
// }

