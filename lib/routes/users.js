const express = require('express')
const router = express.Router();
const User = require('../controllers/userController')


router.route('/signup')

    // Creates a new user with HTTP POST http://localhost:5000/users
    .post((req,res) => {
        User.store(req,res)
    })

router.route('/login')

    // Login existing user with HTTP GET http://localhost:5000/login
    .post((req,res) => {
        User.find(req,res)
    })

module.exports = router;

