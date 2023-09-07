// createPost.js

const mongoose = require('mongoose');
const { Schema, Types } = mongoose;

// const post_schema = require('../../models/Post.ts')
// const UserDocument = require('@/models/User')

// Replace with your actual MongoDB Atlas connection string
const MONGODB_URI = 'mongodb+srv://user:antra12345@development-cluster.ndab89r.mongodb.net/?retryWrites=true&w=majority';

// Define the Post schema
const PostSchema = new Schema({

    title: {
        type: String,
        required: true
    },

    content: {
        type: String,
        required: true
    },

    category: {
        type: String,
        required: true,
        default: 'General Discussion'
    },

    user_name: {
        type: String
    },

    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },

    createdAt: {
        type: Date,
        required: false,
        default: Date.now
    },

    updatedAt: {
        type: Date,
        default: Date.now
    },

    attachments: [
        {
            id: {
                type: Schema.Types.ObjectId,
                // default: () => new Schema.Types.ObjectId() // create new instance
            },
            fileName: {
                type: String
            },
            fileType: {
                type: String
            },
            url: {
                type: String
            }
        }
    ],

    poll: [
        {
            option: {
                type: String
            },
            votes: [
                {
                    type: Schema.Types.ObjectId,
                    ref: 'User'
                }
            ]
        }
    ],

    likes: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    ],

    comments: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Comment'
        }
    ]

});

// Create a model with a custom collection name
const Post = mongoose.model('Post', PostSchema, 'posts'); // Specify your custom collection name here

// Connect to MongoDB Atlas
mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
        // Create a new post
        const newPost = new Post({
            title: 'Another Awesome Post',
            content: 'This is an awesome post',
            category: 'Programming',
            user_name: 'JT',

            attachments: [{
                fileName: 'code.png',
                fileType: 'image/png',
                url: 'https://example.com/code.png'
            }],

            poll: [{
                option: 'React',
                votes: [] // sample user ids
            }],

            likes: [],

            comments: []

        });

        // Save the new post to the custom collection using Promises
        return newPost.save();
    })
    .then((savedPost) => {
        console.log('New post created:', savedPost);
    })
    .catch((err) => {
        console.error('Error creating post:', err);
    })
    .finally(() => {
        // Close the MongoDB connection
        mongoose.connection.close();
    });