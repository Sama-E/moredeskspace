import Post from "../models/Post.js";

export const getPosts = async (req, res) => {
    try {
        const Posts = await Post.find();

        res.status(200).json(Posts);
    }
    catch(error) {
        res.status(404).json({ msg: error.msg });
    }
}

export const createPost = async (req, res) => {
    const post = req.body;
    const newPost = new Post(post);

    try {
        await newPost.save();
        res.status(201).json(newPost);
    }
    catch(error) {
        res.status(409).json({ msg: error.msg });
    }
}