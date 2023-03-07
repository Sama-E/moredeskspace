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
            minLength: 5,
        },
        category: {
            type: String,
            required:true,
            minLength: 3
        },
        subcategory: {
            type: String,
            minLength: 2
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
            minLength: 5,
        },
        author: {
            type: String,
        },
        picturePath: {
            type: String,
        },
        userPicturePath: String,
        likes: {
            type: Map,
            of: Boolean,
        },
        comments: {
            type: Array,
            default: [],
        },
    }, {timestamp: true});

const Post = mongoose.model("Post", PostSchema);

export default Post;