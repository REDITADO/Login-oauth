const express = require('express')
const passport = require('passport')
const path = require('path')
const passportG = require('passport-google-oauth20');
const session = require('express-session')

const app = express();
require('./passport')

app.use(express.urlencoded({extended:true}))
app.use(express.static(path.join(__dirname, 'public')))
app.set("views", path.join(__dirname, 'public'))
app.engine('ejs', require('ejs').renderFile)
app.set('view engine', 'ejs')
app.use(session({ secret: 'keyboard cat', cookie: { maxAge: 60000 }}))

passport.serializeUser(async(user, done)=>{
     done(null, user)
})
passport.deserializeUser((user,done)=>{
    done(null,user)
})


app.use(passport.initialize());
app.use(passport.session());
app.use((req,res,next)=>{
    res.setHeader('Access-Control-Allow-Origin', '*')
    next()
})

app.get('/',(req,res)=>{
    res.render('views/index')
})

app.get('/face/auth',passport.authenticate('facebook',{scope:['user_likes', 'email'],session:true}))
app.get('/user/authenticate',passport.authenticate('google',{scope:'profile', session:true}))

app.get('/user',  passport.authenticate('google', { failureRedirect: '/user/authenticate', scope:'profile' , session:true}),(req,res)=>{
    res.setHeader('Access-Control-Allow-Origin', '*');
    console.log(req.user._json.picture)
    res.render('views/logado.ejs',{username:req.user.displayName, image:req.user._json.picture})
})

app.get('/face',passport.authenticate('facebook',{failureRedirect: '/face/auth', session:true}),(req,res)=>{
    //console.log(req.user._json.picture.data.url)
    res.render('views/logado.ejs',{username:req.user.displayName, image:req.user._json.picture.data.url})
    
})

app.post('/login',passport.authenticate('local', {failureRedirect:'/'}),(req,res)=>{
    console.log(req.user)
    res.render('views/logado.ejs',{username:req.user.username})
})

app.listen(6060, ()=>{
 console.log('server no ar ')
})

