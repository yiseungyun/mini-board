const { User } = require("../models/User");

let auth = (req, res, next) => {
    // 인증처리를 하는 곳
    // client 쿠키에서 token 가져옴
    let token = req.cookies.x_auth;
    // token을 복호화해서 user를 찾음
    User.findByToken(token, (err, user) => {
        if (err) throw err;
        if (!user) return res.json({ isAuth: false, error: true })
        
        req.token = token;
        req.user = user;
        next();
    })
    // user가 있으면 인증 okay

    // user가 없으면 인증 no
}

module.exports = { auth };