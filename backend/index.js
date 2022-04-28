require('dotenv').config();
const express = require("express");
const cors = require("cors");
const path = require('path');
// const cookieParser = require("cookie-parser");
const session = require("express-session");
const bodyParser = require("body-parser");


//DATABASE CONNECTION
const database = require("./config/database");

const app = express();

//Middleware
app.use(express.json());
app.use(cors({
    origin: "http://localhost:3000", // location to react app
    optionsSuccessStatus: 200,
    credentials: true,
}));

// app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({
    extended: false
}));

app.use('/public', express.static(path.join(__dirname, 'public')));
// app.use("/public", express.static("public"));

//Main Route
app.get("/", function (req,res) {
    res.redirect('/index');
});

//Sign Up Route
var auth = require('./routes/auth');
app.use('/auth', auth);

//Verify Account Route
var verify = require('./routes/verify');
app.use('/verify', verify);

//Partner Route
var partner = require('./routes/partner');
app.use('/partner', partner);

//SpiceIN Route
var spicein = require('./routes/spicein');
app.use('/spicein', spicein);

//Opportunity Route
var opportunity = require('./routes/opportunity');
app.use('/opportunity', opportunity);

//Home Route
var home = require('./routes/home');
app.use('/home', home);

//FAQ Route
var faq = require('./routes/faq');
app.use('/faq', faq);

//Contact Route
var contact = require('./routes/contact');
app.use('/contact', contact);

//Settings Route
var settings = require('./routes/settings');
app.use('/settings', settings);

//Dashboard Route
var dashboard = require('./routes/dashboard');
app.use('/dashboard', dashboard);

//USER-DashboardProfile
var dashboardUserProfile = require('./routes/dashboardUserProfile');
app.use('/dashboardUserProfile', dashboardUserProfile);

//USER-Application
var userApplication = require('./routes/userApplication');
app.use('/userApplication', userApplication);

//USER-Interview
var userInterview = require('./routes/userInterview');
app.use('/userInterview', userInterview);



//EMPLOYER-DashboardProfile
var dashboardEmployerProfile = require('./routes/dashboardEmployerProfile');
app.use('/dashboardEmployerProfile', dashboardEmployerProfile);

//EMPLOYER-Interview
var employerInterview = require('./routes/employerInterview');
app.use('/employerInterview', employerInterview);

//EMPLOYER-Application
var employerApplication = require('./routes/employerApplication');
app.use('/employerApplication', employerApplication);


//Resume Route
var resume = require('./routes/resume');
app.use('/resume', resume);


//ADMIN Route
var zomAdminDashboard = require('./routes/zomAdminDashboard');
app.use('/zomAdminDashboard', zomAdminDashboard);

//ADMIN USER Route
var zomAdminUser = require('./routes/zomAdminUser');
app.use('/zomAdminUser', zomAdminUser);

//STUDENT USER Route
var zomAdminStudent = require('./routes/zomAdminStudent');
app.use('/zomAdminStudent', zomAdminStudent);

//EMPLOYER USER Route
var zomAdminEmployer = require('./routes/zomAdminEmployer');
app.use('/zomAdminEmployer', zomAdminEmployer);


//PARTNER USER Route
var zomAdminPartner = require('./routes/zomAdminPartner');
app.use('/zomAdminPartner', zomAdminPartner);

//PARTNER APPLICATION Route
var zomAdminPartnerApplication = require('./routes/zomAdminPartnerApplication');
app.use('/zomAdminPartnerApplication', zomAdminPartnerApplication);

//PARTNER SAVED APPLICATION Route
var zomAdminPartnerSavedApplication = require('./routes/zomAdminPartnerSavedApplication');
app.use('/zomAdminPartnerSavedApplication', zomAdminPartnerSavedApplication);


//OPPORTUNITY
//OPPORTUNITY JOB VACANCY Route
var zomAdminJobVacancy = require('./routes/zomAdminJobVacancy');
app.use('/zomAdminJobVacancy', zomAdminJobVacancy);

//OPPORTUNITY JOB APPLICATION Route
var zomAdminJobApplication = require('./routes/zomAdminJobApplication');
app.use('/zomAdminJobApplication', zomAdminJobApplication);

//SPICE IN
//SPICE IN Route
var zomAdminSpiceIN = require('./routes/zomAdminSpiceIN');
app.use('/zomAdminSpiceIN', zomAdminSpiceIN);



//Meta Route
var meta = require('./routes/meta');
app.use('/meta', meta);

//Basic Info Route
var basicinfo = require('./routes/basicinfo');
app.use('/basicinfo', basicinfo);







//Port Route
const protocol = process.env.HTTPS === 'true' ? 'https' : 'http';
const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`);
});