//import express from 'express';
// express 모듈을 가져옴 -> 새로운 express 앱을 만듦
const express = require('express')
const app = express()
const config = require('./config/key')
const cookieParser = require('cookie-parser'); 
const { auth } = require('./middleware/auth');
// mongoose를 이용해 애플리케이션과 몽고db 연결
const mongoose = require('mongoose')
mongoose.connect(config.mongoURI)
.then(() => console.log('MongoDB Connected...')).catch(err => console.log(err))


// 루트 디렉토리에 'Hello World!'를 출력하게 함
/*app.get('/', (req, res) => res.send('Hello World!'))
app.get('/api/hello', (req, res) => {
    res.send("안녕하세요!") // front에 전달
})*/

// 회원가입
const { User } = require("./models/User");
const { Post } = require("./models/Post");
const bodyParser = require('body-parser');

// application/x-www-form-urlencoded 분석해서 가져옴
app.use(bodyParser.urlencoded({extended: true}));
// application/json 분석해서 가져옴
app.use(bodyParser.json());
app.use(cookieParser());

app.post("/api/users/register", (req, res) => {
    // 회원가입할 때 필요한 정보들을 client에서 가져오면
    // 그것들을 데이터베이스에 넣어줌

    const user = new User(req.body)

    user.save((err, userInfo) => {
        if (err) return res.json({ success: false, err })
        return res.status(200).json({
            success: true
        })
    }) // 정보들이 user 모델에 저장됨
})

// 작성한 게시물 post 모델에 저장 -> 저장할 때 key가 중복되면 하나만 저장됨
// unique한 키를 만들어줘야 함
app.post("/api/posts", (req, res) => {
    // 정보를 client에서 가져와서
    // 그것들을 데이터베이스에 넣어줌
    const post = new Post(req.body)

    post.save((err, postInfo) => {
        if (err) return res.json({ success: false, err })
        return res.status(200).json({
            success: true
        })
    }) // 정보들이 post 모델에 저장됨
})

// post를 가져와서 client로 보내줌
app.get('/api/posts', (req, res) => {
    Post.find(function (err, posts) {
        if (err) return console.error(err)
        console.log(posts)
        res.status(200).json(posts);
    })
});

// post 원하는 data 삭제 기능
app.delete('/api/posts/:userKey', (req, res) => { 
    Post.findOneAndRemove({userKey: req.params.userKey}, (err, post) => {
        if (err) return res.status(400).json({ success: false, err });
        res.status(200).json({ success: true })
    });
})

// post 원하는 data 수정 기능
app.put('/api/posts/:userKey', (req, res) => { 
    const { title, content, user } = req.body
    if (!title || !content || !user) {
        return res.status(400).json({ success: false, error: "title, content are required" });
    }
    Post.findOneAndUpdate({userKey: req.params.userKey}, { $set: 
        { title, content, user } }, (err, post) => {
        if (err) return res.status(400).json({ success: false, err });
        res.status(200).json({ success: true });
      });
    });

// login 기능
app.post('/api/users/login', (req, res) => {
    // 요청된 이메일을 데이터베이스에 있는지 찾음
    User.findOne({ email: req.body.email }, (err, user) => {
        if (!user) {
            return res.json({
                loginSuccess: false,
                message: "제공된 이메일에 해당하는 유저가 없습니다."
            })
        }
    
        // 데이터베이스에 있다면 비밀번호가 맞는 비밀번호인지 확인
        user.comparePassword(req.body.password, (err, isMatch) => {
            if (!isMatch) return res.json({ loginSuccess: false, message: "비밀번호가 틀렸습니다." })
            // 비밀번호가 맞다면 token 생성
            user.generateToken((err, user) => {
                if (err) return res.status(400).send(err);
                // 토큰을 저장 -> 어디? 쿠키, 로컬스토리지 등..
                // 쿠키에 저장
                    res.cookie("x_auth", user.token)
                    .status(200)
                    .json({ loginSuccess: true, userId: user._id });
          })
        })
    })
    // 비밀번호가 같다면 유저를 위한 token 생성
})

app.get('/api/users/auth', auth, (req, res) => {
    // 여기까지 미들웨어를 통과해 왔다는 얘기는 Authentication이 True라는 말
    // user 정보 client에게 전달해줌
    res.status(200).json({
        _id: req.user._id,
        isAdmin: req.user.role === 0 ? false : true, // role = 0 일반 유저, 0이 아니면 admin
        isAuth: true,
        email: req.user.email,
        name: req.user.name,
        lastname: req.user.lastname,
        role: req.user.role,
        image: req.user.image
    })
})

// 로그아웃 기능
app.get('/api/users/logout', auth, (req, res) => {
    // user 모델 가져와 user 찾아 정보 업데이트, token 지워줌
    User.findOneAndUpdate({ _id: req.user._id }, 
        { token: "" }, 
        (err, user) => {
            if (err) return res.json({ success: false, err });
            return res.status(200).send({ success: true })
        } )
})

const port = 5000

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
// 브라우저에서 localhost:3000/ 을 치면 Hello World!가 출력됨