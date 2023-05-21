import express from 'express'
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs'
import User from '../models/User.js';
import Post from '../models/Post.js';
import Friends from '../models/Friend.js';


export const login = async (req, res) => {
   
    const { email, password} = req.body;
    
    try{

        if(!email || !password) 
        {
            return res.status(400).json({message: "Please fill out all the fields"})
        }

        const user = await User.findOne({email});
        if(user && await bcrypt.compare(password, user.password)){
            const {password: pass , ...others  } = user._doc
          
            return res.status(200).json({
                ...others,
                token: generateToken(user._id)
                })
        }
        res.status(401).json({message:"Wrong credentials!"})

        
    }
    catch(error){
        res.status(400).json(error.message);

    }
}

export const signup = async (req, res) => {
    const {username, fullname, email, password} = req.body;
    
    try{

        if(!username || !email || !password ) {
            return res.status(400).json({message: "Please fill out all the fields"})
        }
        const existing = await User.findOne({email});
        if(existing) return res.status(400).json({message:"Account already exists"})

        const salt = bcrypt.genSaltSync(10);
        const hashPass = bcrypt.hashSync(password, salt);

        const newUser = await User.create({
            username,
            email,
            fullname,
            password: hashPass,
        })
        const {password: pass , ...others  } = newUser._doc

        res.status(201).json({
            ...others,
            token: generateToken(newUser._id)
        })


    }
    catch(error){
        res.status(400).json(error.message);
    }
}
// UPDATE
export const updateUser = async (req, res) => {
   
    if(req.body.password){
        const salt = bcrypt.genSaltSync(10);
        const hashPass = bcrypt.hashSync(req.body.password, salt);
        req.body.password = hashPass
    }
    try{
        const updatedUser = await User.findByIdAndUpdate(req.params.id,{
            $set: req.body
        }, {new: true});
        const {password: pass , ...others  } = updatedUser._doc

        res.status(201).json({
            ...others,
            token: generateToken(updatedUser._id)
        })
    }
    catch(error){
        res.status.json(error)
    }
}

// DELETE
export const deleteUser = async (req, res) => {
    try{

        await User.findByIdAndDelete(req.params.id);
        res.status(200).json('User has been deleted')
           
    }

    catch(error){
        res.status(500).json(error);
    } 
}

// GET ALL USERS
export const getAllUser = async (req, res) => {
    const query = req.query.new;   // get the query 
    const qSearch = req.query.search;   // get the query 

    try{
        const users = await User.find();
        const search = users.filter(user => user.fullname.startsWith(qSearch))
        res.status(200).json(search)
    }

    catch(error){
        res.status(500).json(error);
    } 
}

// GET ALL USERS
export const getAllFriends = async (req, res) => {
   

    try{
        const friendList = await Friends.findOne({userId: req.params.id})   
        // console.log(friendList)
        const friends = await Promise.all(
            friendList.friends.map( friendId => {
            return User.findById(friendId) }))
        res.status(200).json(friends)
    }

    catch(error){
        res.status(500).json(error);
    } 
}





// GET 
export const getUserByName = async (req, res) => {
    try{
        const searchedUser = await User.find({username: req.params.username});
        res.status(200).json(...searchedUser)
           
    }

    catch(error){
        res.status(500).json(error);
    } 
}

// GET 
export const getUserById = async (req, res) => {
    console.log(req.params.userId)
    try{
        const searchedUser = await User.find({_id: req.params.userId});
        res.status(200).json(...searchedUser)     
    }
    catch(error){
        res.status(500).json(error);
    } 
}

const generateToken = (id) =>{
    return jwt.sign({ id }, ""+process.env.JWT_SECRET_KEY, {expiresIn: '1d'})
}
