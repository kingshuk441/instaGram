const authRouter = require("express").Router();
const passport = require("passport");


// for login with oAuth
authRouter
    .route("/google")
    .get( passport.authenticate( 'google' , {scope:['email' , 'profile']} ) , function(req, res){
        //res.send("Logged in");
    });

//for oAuth callback
authRouter
    .route("/callback")
    .get( passport.authenticate('google'), function(req,res){
        res.redirect("http://localhost:3000");
    });

// check Auth
authRouter
    .route("/checkAuth")
    .get(function(req , res){
        if(req.user){
            res.json({
                isAuth:true,
                user:req.user
            });
        }
        else{
            res.json({
                isAuth:false
            });       
         }
    });

//logout
authRouter.route("/destroyCookie").get(function(req , res){
    req.session = null;
    res.json({
      messaged:"LOGGED OUT"
    })
  });


module.exports = authRouter;