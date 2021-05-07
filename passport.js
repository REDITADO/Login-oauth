const passport = require('passport')
const passportG = require('passport-google-oauth20').Strategy
const FacebookStrategy = require('passport-facebook').Strategy;
const localStrategy = require('passport-local')
const user ={
  username:'jose',
 password:'02022005'
}
passport.use(new passportG({
    clientID: "your client is",
    clientSecret: "your client secret",
    callbackURL: "http://localhost:6060/user",
    profileFields: ['id', 'displayName', 'photos', 'email']
},
function(accessToken, refreshToken, profile, cb) {
    //console.log(profile)
    return cb(null,profile)
  }

))


passport.use(new FacebookStrategy({
  clientID: "your client is",
  clientSecret: "your client secret",
    callbackURL: "http://localhost:6060/face",
    profileFields: ['id', 'displayName', 'photos', 'email','friends']
  },
  function(accessToken, refreshToken, profile, done) {
    console.log(accessToken+":::::::"+ refreshToken)
   return done(null,profile)
  }
));

passport.use(new localStrategy(
 function(username, password, done) {
  if(user.username == username&&user.password==password){
    
  //console.log(password,username)
  return done(null, user)
   
  }else{
    return done(null,false)
  }
  
  
}
))