const jwt = require('jsonwebtoken')
require('dotenv').config('/home/react/home/nodeReact/')

exports.sign = (req, res, user) => {

    let token = {
        id: user._id,
        email: user.email,
        password: user.password,
        role: user.role
    }
    // creating encrypted token of user credentials
    token = jwt.sign(token, process.env.SECRET, { expiresIn: '1h' }, (err, token) => {

        if (err) return res.json({ status: 400, message: "issue in being creation of jwtAuthentication" })

        // sending the token to the cookie // 
        res.cookie('token', `Bearer ${token}`)

        // sending login status
        return res.json({ status: 200, message: "You are logged in", credentials: token })
    })
}

exports.verify = async function(req, res) {

    // token from cookie, header-authorization or token
    let token = req.headers.cookie || req.headers.authorization || req.body.token;
    console.log('token',token.slice(7,token.length))
    token = token.slice(7,token.length)
    const verify = await jwt.verify(token, process.env.SECRET)
    console.log(verify);
    if(verify){
        return verify;
    }
    res.json({
        status : 400,
        message: "You do not have a valid token"
    })

}