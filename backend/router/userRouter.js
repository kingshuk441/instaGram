const multer = require("multer");
const path = require("path");
const {
        createUser,
        getAllUsers, 
        getUserById, 
        updateUserById, 
        deleteUserById 
    } = require("../controller/userController");

const userRouter = require("express").Router();

const storage = multer.diskStorage({
    destination: function(req , file , cb){
        cb(null, 'public/images/users');
    },
    filename: function(req , file, cb){
        //console.log("Inside multer");
        //console.log(file);
        cb(null , Date.now()+ path.extname(file.originalname));
    }
});

const fileFilter = function(req, file, cb){
    if(file.mimetype == 'image/jpeg' || file.mimetype == 'image.png' || file.mimetype == 'image.jpg'){
        cb(null, true); //accepts file only when true is passed
    }
    else{
        cb(null,  false); // file rejected
    }
};

const upload = multer({storage:storage , fileFilter : fileFilter});


// "localhost:3000/api/user"
userRouter.route("")
.get(getAllUsers)
.post(upload.single('user'), createUser);

//"localhost:3000/api/user/60355f2f044b6e2124ccb37b"
userRouter
.route("/:id")
.get(getUserById)
.patch(upload.single('user'), updateUserById)
.delete(deleteUserById);


module.exports = userRouter;