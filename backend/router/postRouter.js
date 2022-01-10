//time: { type : Date , default: Date.now}
//createPost => caption, pImage , id, multer
//getAllMyFollowingPost => feeds posts
//updatePost => edit posts => caption only
//deletePost => delete post by id
//getAllMyPost => get only my posts => profile pic

const { createPost, getAllPosts, getMyPosts, deleteMyPost, commentOnPost, likePost, deleteComment, getAllMyFollowingPost } = require("../controller/postController");
const postRouter = require("express").Router();
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
    destination: function(req , file , cb){
        cb(null, 'public/images/posts');
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


postRouter.route("").post( upload.single('post') , createPost).get(getAllPosts);
postRouter.route("/feeds/:uid").get(getAllMyFollowingPost);
postRouter.route("/:uid").get(getMyPosts);
postRouter.route("/:pid").delete(deleteMyPost);
postRouter.route("/like/:uid/:pid").get(likePost);
postRouter.route("/comment/:uid/:pid").post(commentOnPost)
postRouter.route("/comment/:pid/:commentId").delete(deleteComment);


module.exports = postRouter;