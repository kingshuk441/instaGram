const postModel = require("../model/postModel");
const userModel = require("../model/userModel");
const followingModel = require("../model/followingModel");
const { all } = require("../router/postRouter");

async function createPost(req , res){
    try {
        let postObject = req.body;
        if(req.file){
            let postPicPath = req.file.destination.substring(6) + "/" + req.file.filename;
            postObject.postImage = postPicPath;
        }        
        console.log(postObject);
        let postCreated = await postModel.create(postObject);
        res.json({
            message:"Post created successfully!!",
            postCreated
        });
    } 
    catch (error) {
        res.json({
            message:"Failed to create a post!",
            error
        });
    }
};

async function getAllPosts(req , res){
    try {
        let allPosts = await postModel.find();
        res.json({
            message:"Successfully got all posts",
            allPosts
        })
    } 
    catch (error) {
        res.json({
            messae:"Failed to get all posts",
            error
        });
    }
};

async function getAllMyFollowingPost(req, res){
    console.log("Inside get all my following posts");
    try {
        let uid = req.params.uid;
        let following = await followingModel.find({ uid: uid, isAccepted: true }).exec();
        let followingIds = following.map(ids =>{
            return ids.followId;
        })
        console.log(followingIds);
        followingIds.push(uid);
        let myFollowingPosts=[];
        for (let i = 0; i < followingIds.length; i++) {
            let post = await postModel.find({uid:followingIds[i]});
            if(post.length){
                for(let j=0 ; j<post.length; j++){
                    myFollowingPosts.push(post[j]);
                }
            }
          }

    res.json({
        message:"Successfully got all the feed posts",
        myFollowingPosts
        });
    } 
    catch (error) {
       res.json({
           message:"Failed to get all posts",
           error
       }) ;
    }
}


async function getMyPosts(req, res){
    try {
        let uid = req.params.uid;
        let myposts = await postModel.find({uid:uid}).exec();
        res.json({
            message:"Successfully got all posts",
            myposts
        });
    } 
    catch (error) {
        res.json({
            message:"Failed to get your posts",
            error
        })
        
    }
};

async function deleteComment(req, res){
    try {

        let commentId = req.params.commentId;
        let pid = req.params.pid;
    
        let post = await postModel.findById(pid);
        let comments= post.comments;
    
        let postComments = comments.filter(comment=>{
            return comment["_id"]!=commentId;
        })
    
        post.comments = postComments;
        
        let updatedPost = await post.save();
        res.json({
            message:"Successfully deleted the comment",
            updatedPost
        });
        
    } 
    catch (error) {
        res.json({
            message:"Couldn't delete the comment", 
            error
        });
    }
}

async function deleteMyPost(req, res){
    try {
        //console.log("inside deletemypost function");
        let pid = req.params.pid;
        let deletedPost = await postModel.findByIdAndDelete(pid);
        //console.log(deletedPost);
        res.json({
            message:"Post deleted successfully",
            deletedPost
        });
    } 
    catch (error) {
        res.json({
            message:"Failed to delete post",
            error
        });
    };
};

async function likePost(req , res){
    try {
        let uid = req.params.uid;
        let pid = req.params.pid;
        let likedPost = await postModel.findById(pid).exec();
        let isLiked = false;
        let i=0;
        if(likedPost.likes.length){
            for( ; i<likedPost.likes.length ; i++){
                if(likedPost.likes[i]===uid){
                    isLiked = true;
                    break;
                }
            }
            if(isLiked){
                likedPost.likes.splice(i, 1);            }
            else{
                likedPost.likes.push(uid);
            }
        }
        else{
            likedPost.likes.push(uid);
        }
        let updatedPost = await likedPost.save();
        res.json({
            message:"post liked successfully",
            updatedPost
        });
    } 
    catch (error) {
        res.json({
            message:"Failed to like post",
            error
        });
    };
};

async function commentOnPost(req, res){
    try {
        console.log("Inside comment on post function");
        let commentInfo = req.body;
        let uid = commentInfo.uid;
        let comment = commentInfo.comment;
        let pid = commentInfo.pid;
        let commentedUser = await userModel.findById(uid).exec();
        let commentedPost = await postModel.findById(pid).exec();
        let user = commentedUser.username;
        commentedPost.comments.push({uid, user, comment});
        let updatedPost = await commentedPost.save();
        res.json({
            message:"Commented on post successfully",
            updatedPost
        });
    } 
    catch (error) {
        res.json({
            message:"Failed to comment on the post",
            error
        });
    };

};

module.exports.getAllMyFollowingPost = getAllMyFollowingPost;
module.exports.deleteComment = deleteComment;
module.exports.commentOnPost = commentOnPost;
module.exports.likePost = likePost;
module.exports.deleteMyPost = deleteMyPost;
module.exports.getMyPosts = getMyPosts;
module.exports.getAllPosts = getAllPosts;
module.exports.createPost = createPost;