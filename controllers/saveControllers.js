import express from 'express'
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs'
import User from '../models/User.js';
import Post from '../models/Post.js';
import Save from '../models/Save.js';

// export const createSave = async (req, res) => {
//     const {userId} = req.body;
//     try{
//         const newSave = await Save.create({
//             userId,
//         })
//         res.status(201).json(newSave)
//     }
//     catch(error){
//         res.status(400).json(error.message);
//     }
// }

// update save
export const updateSave = async (req, res) => {
    
    const {id, userId} = req.body;
    try{
        const userSaved = await Save.find({userId: userId})
        if(userSaved.length === 0){
            const newSave = await Save.create({
            userId,
            saved: id
            })
            res.status(200).json(newSave.saved)   
        }
        if(userSaved[0]?.saved.includes((req.body.id))){
             await userSaved[0].updateOne({ $pull: { saved: req.body.id } });
            res.status(200).json(id)
        }
        else{
            const updatedList = await userSaved[0].updateOne({ $push: { saved: req.body.id } }); 
            res.status(200).json(id)
        } 
    }
    catch(error){
        res.status(500).json(error.message)
    }
}

// GET ALL saved 
export const getAllSave = async (req, res) => {
    console.log(req.params.id)
    try{
        
        const currentUserSaved = await Save.find({userId: req.params.id})
        // const saved = []
        // const posts = await Promise.all(
        //     currentUser.saved.map( postId =>  Post.find({_id: postId})
        // )); 
        res.status(200).json(...currentUserSaved)
    }

    catch(error){
        res.status(500).json(error);
    } 
}

