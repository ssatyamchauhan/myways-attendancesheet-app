const express = require("express");
const bodyParser = require('body-parser');
const cors = require('cors')
// const db = require('./database')();
const app = express();


app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json())


// routes are goes here
app.use(require('./lib/routes/users'))
app.use(require('./lib/routes/status'))


app.listen(5000, () => {
    console.log(`listening port ${5000}`)
})