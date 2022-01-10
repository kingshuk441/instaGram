// npm i express nodemon passport passport-google-oauth2 cookie-session
const express = require("express");
const app = express();
const passport = require("passport");
let GoogleStrategy = require("passport-google-oauth2").Strategy;
let {CLIENT_ID , CLIENT_PW} = require("./config/secret");
let cookie = require("cookie-session");

// db import
let {mongoose} = require("../../../backend/model/db");
let userModel = require("../../../backend/model/userModel"); // {name, username, bio, email ,pw};


// to use public folder
app.use(express.static("public"));
app.use(cookie({
    maxAge : 24*24*100,
    keys : ["That's what she said!!"]  // userInfo + keys  => id cokkie save hoti hai => cookie id + keys => userInfo
}));

// middleware
app.use(passport.initialize());
app.use(passport.session());


// serialize
passport.serializeUser(function(user, done){
    console.log("Inside serialize function");
    console.log(user); // information sent by done function
    done(null , user);
});

// deserialize
passport.deserializeUser(function(user, done){
    console.log("Inside deserialize user");
    done(null , user);
});


//setup passport
passport.use(
    new GoogleStrategy( 
    { 
        clientID:CLIENT_ID , 
        clientSecret : CLIENT_PW , 
        callbackURL:"http://localhost:3000/auth/callback" , 
        passReqToCallback:true 
    } , 
    async function(request, accessToken, refreshToken, profile, done){
        
        try {
   
            // console.log(profile);
            console.log("INSIDE PASSPORT CALLBACK FUNCTION!!!");
            // check if user exists
            let email = profile.email;
            let data = await userModel.find({email:email}).exec();
            if(data.length){
                    // if yes => continue
                    console.log("Inside already signed up");
                    done(null , data[0]); // next function ko call laga deta hai => continue => proceed to serialize
                }
             else{
                    // if no => create new user => signup
                    let userObject = {
                        name: profile.displayName,
                        username: profile.email,
                        bio:"This is my bio",
                        email: profile.email,
                        password:"123456789"
                    };
                    let userCreated = await userModel.create(userObject);
                    console.log("Inside signup");
                    //console.log(userCreated);
                    done(null , userCreated);
                }
        } 
        catch (error) {
           done(error); 
        }
        }
    )
);

// for login with oAuth
app.get("/auth/google" , passport.authenticate( 'google' , { scope:['email' , 'profile'] } ) , function(req, res){
    // res.send("LOGGED IN !");
});

//for oAuth callback
app.get("/auth/callback" , passport.authenticate('google') , function(req,res){
    res.redirect("/");
});

// check Auth
app.get("/checkAuth" , function(req , res){
    if(req.user){
        res.send("Logged in! Welcome " + req.user.name);
    }
    else{
        res.send("You are not logged in.");
    }
});



app.listen(3000, function(){
    console.log("App started at port 3000!");
});