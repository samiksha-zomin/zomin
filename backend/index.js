require('dotenv').config();
const express = require("express");
const app = express();
const bodyParser = require("body-parser");


//DATABASE CONNECTION
const database = require("./config/database");

const cors = require("cors");
const port = process.env.PORT || 3001;

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));
// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

var auth = require('./routes/auth');



app.get("/", function (req,res) {
    res.redirect('/Index');
});


app.use('/auth', auth);

app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`);
});