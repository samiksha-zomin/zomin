const passport = require("passport");

var GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL,
    passReqToCallback:true
    // userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo"
  },
  function(request,accessToken, refreshToken, profile, done) {
    console.log(profile);
    return done(null, profile);
  }
));