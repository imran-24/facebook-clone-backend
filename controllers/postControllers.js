
import Friends from '../models/Friend.js';
import Post from '../models/Post.js';
import User from '../models/User.js';


// CREATE
export const createPost = async (req, res) => {
    const {userId, img, video, caption} = req.body;
    try{
        
        if(!img && !caption && !video) {
            return res.status(400).json({message: "Please fill out all the fields"})
        }
        const user = await User.findById(userId)
        const newPost = await Post.create({
            userId,
            profilePicture: user?.profilePicture,
            img, 
            video,
            caption, 
            fullname: user?.fullname
        })
        res.status(201).json(newPost)
    }
    catch(error){
        res.status(400).json(error.message);
    }
}


// UPDATE
export const updatePost = async (req, res) => {
    
    const {userId, fullname, img, caption} = req.body;
    
    try{
        const updatedPost = await Post.findByIdAndUpdate(req.params.id,{
            $set: req.body
        }, {new: true});
        res.status(200).json(updatedPost)
    }
    catch(error){
        res.status(500).json(error)
    }
}

// LIKE
export const likePost = async (req, res) => {
    
    
    try{
        const post = await Post.findById(req.params.id)
        
        if(!post) return res.status(404).json('Not found')
        
        if(post.likes.includes((req.body.userId))){
            await post.updateOne({ $pull: { likes: req.body.userId } });
            
            res.status(200).json('This post has been unliked')

        }
        else{
            await post.updateOne({ $push: { likes: req.body.userId } });
            
            res.status(200).json('This post has been liked')
        }
        
        
    }
    catch(error){
        res.status(500).json(error)
    }
}

// COMMENT
export const commentPost = async (req, res) => {
    
    const {fullname, profilePicture, comment} = req.body;
    
    try{
        const updatedPost = await Post.findByIdAndUpdate(req.params.id,
            { $push: { comments: {
                fullname, profilePicture, comment
            }}}, {new: true});
        res.status(200).json(updatedPost)    
        
        
    }
    catch(error){
        res.status(500).json(error)
    }
}




// DELETE
export const deletePost = async (req, res) => {
    try{
        const deletedPost =  await Post.findByIdAndDelete(req.params.id);
        res.status(200).json(deletedPost)      
    }
    catch(error){
        res.status(500).json(error);
    }
}

// GET 
export const getPost = async (req, res) => {
    try{

        const searchedPost = await Post.findById(req.params.id);
        res.status(200).json(searchedPost)
           
    }

    catch(error){
        res.status(500).json(error);
    } 
}


// GET timeline Post
export const getAllPost = async (req, res) => {
    try{
        const friendList = await Friends.findOne({userId: req.params.id})   
        const posts = await Post.find({userId: req.params.id}).sort({createdAt: -1}).limit(10)
        const friendPosts = await Promise.all(
            friendList.friends.map( friendId => {
                return Post.find({userId: friendId}).sort({createdAt: -1}).limit(10)
            })
        );
        
        res.status(200).json(posts.concat(...friendPosts))
    }
    catch(error){
        res.status(500).json(error);
    } 
}

// GET All Post
export const getUsersPost = async (req, res) => {
   
    try{
        const user = await User.findOne({ username: req.params.username });
        const posts = await Post.find({userId: user?._id}).sort({createdAt: -1})
        console.log(posts)
        res.status(200).json(posts) 
    }
    catch(error){
        res.status(500).json(error);
    } 
}

