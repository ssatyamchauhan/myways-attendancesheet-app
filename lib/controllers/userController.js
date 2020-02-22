const User = require('../../database')().users;
const jwt = require('../auth/jwt')

exports.store = (req, res) => {

    const newUser = new User({
        name: req.body.name,
        role: req.body.role,
        email: req.body.email,
        password: req.body.password
    })

    if (!newUser) return res.json(newUser)

    newUser.save((err, user) => {
        if (err) return res.json({ status: 500, message: err })
        return res.json({ status: 200, user: user })
    })
}

exports.find = (req, res) => {

    // Looking for user in database
    User.findOne({ email: req.body.email }, function (err, user) {
        
        // if something error or the user does not exists
        if (err || !user) return res.json({ status: 200, message: "Email does not exists!", error: err });

        // Matching password
        user.comparePassword(req.body.password, function (err, isMatch) {

            // error during matching the hash
            if (err) return res.json({ status: 404, message: "Password is incorrect!", error: err });

            // status of the matched password is in isMatch
            (isMatch) ? jwt.sign(req, res, user) 
            : res.json({status: 404, message: "password is incorrect!"})
        });

    });

}

