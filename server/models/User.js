const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        maxlength: 50
    },
    email: {
        type: String,
        trim: true,
        unique: 1
    },
    password: {
        type: String,
        minlength: 5
    },
    lastname: {
        type: String,
        maxlength: 50
    },
    role: {
        type: Number,
        default: 0
    },
    image: String,
    token: {
        type: String
    },
    tokenExp: {
        type: Number
    }
})

const bcrypt = require('bcrypt');
const saltRounds = 10; // salt의 글자 수

// 유저정보를 저장하기 전에 비밀번호를 암호화
userSchema.pre('save', function(next) {
    var user = this; // userschema를 가리킴
    if (user.isModified('password')) { // 비밀번호를 변경할 때만 암호화
        // 비밀번호를 암호화 시킴
        bcrypt.genSalt(saltRounds, function(err, salt) {
            if (err) return next(err)
            bcrypt.hash(user.password, salt, function (err, hash) {
                if (err) return next(err)
                user.password = hash
                next()
            })
        })
    } else {
        next()
    }
})
userSchema.methods.comparePassword = function(plainPassword, cb) {
    // plain password = 암호화되지 않은 비밀번호
    // 암호화되어 있으니 암호화 후 같은지 비교하면 됨 (복호화할 수 없기 때문에)
    bcrypt.compare(plainPassword, this.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch)
    })
}

userSchema.methods.generateToken = function(cb) {
    var user = this;
    // jsonwebtoken 이용해서 token을 생성하기
    var token = jwt.sign(user._id.toHexString(), 'secretToken')
    user.token = token
    user.save(function(err, user) {
        if (err) return cb(err);
        cb(null, user)
    })
}

userSchema.statics.findByToken = function (token, cb) {
    var user = this;
    // user._id + '' = token
    // token 복호화
    jwt.verify(token, 'secretToken', function (err, decoded) {
        // user id 이용해서 user를 찾은 다음에
        // client에서 가져온 token과 DB에 보관 token이 일치하는지 확인
        user.findOne({"_id": decoded, "token": token}, function (err, user) {
            if (err) return cb(err);
            cb(null, user);
        })
    })
}

const User = mongoose.model('User', userSchema)

module.exports = { User } // 다른 곳에서도 쓸 수 있게