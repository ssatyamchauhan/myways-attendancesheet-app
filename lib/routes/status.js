const express = require('express')
const router = express.Router();
const Status = require('../controllers/statusController');

router.route('/status')

    // get all 
    .get((req, res) => {
        Status.findAll(req, res)
    })


router.route('/update')

    // update specific data
    .put((req,res) => {
        Status.update(req,res)
    })

module.exports = router;