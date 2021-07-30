require('dotenv').config();
const express = require("express");
const cors = require("cors");
const passport = require("passport");
//const passportLocal = require("passport-local").Strategy;
const cookieParser = require("cookie-parser");
const session = require("express-session");
const bodyParser = require("body-parser");

//REQUIRE PASSPORT SETUP
require("./setup/passport");



//DATABASE CONNECTION
const database = require("./config/database");

const app = express();

//Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({
    origin: "http://localhost:3000", // location to react app
    credentials: true,
}));
// app.use(session({ 
//     key: "userId",
//     secretsecret: "secretcode",
//     resave: false,
//     saveUninitialized: false,
//     cookie: {
//         expires: 60 * 60 * 24,
//     },
// }));
// app.use(cookieParser());
// app.use(passport.initialize());
// app.use(passport.session());
//require("./passportConfig")(passport);

app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));






//Main Route
app.get("/", function (req,res) {
    res.redirect('/Index');
});

//Sign Up Route
var auth = require('./routes/auth');
app.use('/auth', auth);

//Verify Account Route
var verify = require('./routes/verify');
app.use('/verify', verify);


//GOOGLE
app.get('/google',passport.authenticate('google', {scope: ['profile', 'email'] }));

//Port Route
const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`);
});