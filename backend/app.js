// npm init -y
// npm i nodemon express mongoose
const express = require("express");
const cookie = require("cookie-session");
const passport = require("passport");
let GoogleStrategy = require("passport-google-oauth2").Strategy;
let {CLIENT_ID , CLIENT_PW} = require("../backend/config/secrets");
const userRouter = require("./router/userRouter");
const requestRouter = require("./router/requestRouter");
const postRouter = require("./router/postRouter");
const authRouter = require("./router/authRouter");
const userModel = require("../backend/model/userModel");


const app = express();
app.use(express.static("public"));
app.use(cookie({
    maxAge : 24*24*100,
    keys : ["ThatsWhatSheSaid!!"]  // userInfo + keys  => id cokkie save hoti hai => cookie id + keys => userInfo
}));

// dumps post data into req.body
app.use(express.json());

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
        callbackURL:"http://localhost:4000/auth/callback" , 
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




//for all the user related functions, navigate to userRouter
//localhost:4000/api/user  post method
app.use("/api/user" , userRouter);

// for all the request related functions
app.use("/api/request" , requestRouter);

//for all the post related functions
app.use("/api/post" , postRouter);

app.use("/auth" , authRouter);

app.listen(4000 , function(){
    console.log("app started at port 4000!!!");
})