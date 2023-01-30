const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    userKey: {
        type: String,
        unique: true
    },
    title: {
        type: String,
        maxlength: 50,
        required: true
    },
    content: {
        type: String,
        required: true // content 항목 존재하지 않으면 저장 X, title도 마찬가지
    },
    name: {
        type: String,
        maxlength: 50
    },
    token: {
        type: String
    },
    tokenExp: {
        type: Number
    }
})

const Post = mongoose.model('Post', postSchema)

module.exports = { Post } // 다른 곳에서도 쓸 수 있게