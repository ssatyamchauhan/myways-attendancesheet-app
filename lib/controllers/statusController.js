const Users = require('../../database')().users;
const jwt = require('../auth/jwt')

exports.findAll = async (req, res, next) => {

    // jwt-atuh
    console.log('/createstory endpoint is here')
    const verfiedUser = await jwt.verify(req, res)
    console.log('outside')
    if (verfiedUser) {
        Users.find({ role: 'student' }, (err, result) => {
            if (err) return res.json({
                status: 200,
                message: "you are not a validate user"
            })

            return res.json({
                status: 200,
                message: "you are already logged in",
                role: verfiedUser.role,
                data: result
            })
        })
    }
    else {
        return res.json({
            status: 200,
            message: "you are not a validate user"
        })
    }

}

exports.update = async (req, res) => {

    const verfiedUser = await jwt.verify(req, res)

    if (verfiedUser) {
        let query = req.body.email
        console.log(verfiedUser)
        Users.findOneAndUpdate({ email: query }, { attendance: req.body.attendance }, { upsert: true, useFindAndModify: false }, function (err, result) {
            if (err) return res.json({ status: 400, message: "You have errors in backend", data: [] });
            Users.find({ role: 'student' }, (err, result) => {
                if (err) return res.json({
                    status: 200,
                    message: "you are not a validate user"
                })
                return res.json({
                    status: 200,
                    message: "you are already logged in",
                    role: verfiedUser.role,
                    data: result
                })
            })
        });
    }
    else {
        return res.json({
            status: 200,
            message: "you are not a validate user"
        })
    }

}