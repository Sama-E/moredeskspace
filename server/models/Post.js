import mongoose from 'mongoose';

const PostSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required:true,
            minLength: 5
        },
        subtitle: {
            type: String,
            required:true,
            minLength: 5,
        },
        category: {
            type: String,
            required:true,
            minLength: 3
        },
        subcategory: {
            type: String,
            required:true,
            minLength: 3
        },
        tag: {
            type: String,
            required:true,
            minLength: 3
        },
        type: {
            type: String,
            required:true,
            minLength: 3
        },
        body: {
            type: String,
            required:true,
            minLength: 50,
        },
        author: {
            type: String,
        },
        selectedFile: {
            type: String,
        },
        likeCount: {
            type: Number,
            default: 0
        }
    }, {timestamp: true});

const Post = mongoose.model("Post", PostSchema);

export default Post;