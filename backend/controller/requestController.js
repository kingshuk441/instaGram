const userModel = require("../model/userModel");
const followingModel = require("../model/followingModel");
const followerModel = require("../model/followerModel");

//completed
async function sendRequest(req, res) {
    try {
      console.log(req.body);
      let { uid, followId } = req.body;
      // isPublic
      let doc = await userModel.find({_id: followId }).exec();
      console.log(doc);
      if (doc[0].isPublic) {
        // isPublic = true
        await followingModel.create({
          uid,
          followId,
        });
        await followerModel.create({
          uid: followId,
          followerId: uid,
        });
        res.json({
          message: "Request sent and accepted !!",
        });
      } 
      else {
        // isPublic = false
        await followingModel.create({
          uid,
          followId,
          isAccepted: false,
        });
        res.json({
          message: "Request sent and pending !!",
        });
      }
    } catch (error) {
      res.json({
        message: "Failed to send request !!",
        error,
      });
    }
};

async function acceptRequest(req , res) {
  try {
    //console.log(req.body);
    let {uid, toBeAccepted} = req.body;
    //changes in following document
    let doc = await followingModel.find({uid:toBeAccepted , followId:uid}).exec();
    console.log(doc);
    doc[0].isAccepted = true;
    await doc[0].save();
    //add in follower collection
    await followerModel.create({
      uid: uid,
      followerId: toBeAccepted,
    });
    res.json({
      message: "Request accepted !!",
    });
    
  } catch (error) {
    res.json({
      message:"Failed to accept request",
      error,
    });
    
  }
};

async function pendingRequest(req , res){
  try {
    let uid = req.params.uid;
    console.log(uid);
    let docs = await followingModel.find({isAccepted:false , followId:uid }).exec();
    console.log(docs);   
    let requests = [];

    for(let i=0 ; i<docs.length ; i++){
      let uid = docs[i].uid;
      let user = await userModel.findById(uid);
      requests.push(user);
    }
    //console.log(requests);
    if(requests.length){
      res.json({
        message:"Successfully got the follow request list!!",
        requests
      });
    }
    else{
      res.json({
        message:"You have no follow requests!",
        requests
      });
    }
  } 
  catch (error) {
    res.json({
      message:"Failed to get request list!!",
      error
    });
    
  }
};

//completed by me
async function deleteRequest(req , res){
  // console.log("inside delete request function");
  try {
    let uid = req.params.uid;
    let followId = req.params.followId;
    let request = await followingModel.find({isAccepted:false , uid , followId}).exec();
    console.log(request); 
    let docId = request[0]["id"];
    let deletedRequest = await followingModel.findByIdAndDelete(docId);
    res.json({
      message:"Request deleted successfully",
      deletedRequest
    });
  } 
  catch (error) {
    res.json({
      message:"Failed to delete request!!",
      error
    });
  };
};

async function deleteFollower(req , res){
    //console.log("Inside delete follower function");
    try {
      let uid = req.params.uid;
      let followerId = req.params.followerId;
      let request = await followerModel.find({uid,followerId}).exec();
      //console.log(request);
      let docId = request[0]["id"];
      let deletedFollower = await followerModel.findByIdAndDelete(docId);
      res.json({
        message:"Follower deleted successfully",
        deletedFollower
      });
    } 
    catch (error) {
      res.json({
        message:"Failed to delete follower",
        error
      });
    };
};

async function deleteFollowing(req , res){
  //console.log("Inside delete following");
  try {
    let uid = req.params.uid;
    //console.log(uid);
    let followId = req.params.followingId;
    //console.log(followId);
    let request = await followingModel.find({ isAccepted:true, uid, followId}).exec();
    //console.log(request);
    let docId = request[0]["id"];
      let deletedFollowing = await followingModel.findByIdAndDelete(docId);
      res.json({
        message:"Following id deleted successfully",
        deletedFollowing
      });

  } catch (error) {
    res.json({
      message:"Couldn't delete following",
      error
    })
    
  }

};

async function cancelRequest(req , res){
  //console.log("inside cancel request function");
  try {
    let uid = req.params.uid;
      //console.log(uid);
      let followId = req.params.followId;
      //console.log(followId);
      let request = await followingModel.find({ isAccepted:false, uid, followId}).exec();
      //console.log(request);
      let docId = request[0]["id"];
      let cancelledRequest = await followingModel.findByIdAndDelete(docId);
      res.json({
        message:"Request cancelled successfully",
        cancelledRequest
      }); 
  } 
  catch (error) {
    res.json({
      message:"Failed to cancel request!!",
      error
    });
  };
};

async function getAllUsers(req, res){
 try {
   let allUsers = await userModel.find();
   res.json({
    message:"Successfully got all users",
    allUsers
   })
 } 
 catch (error) {
   res.json({
     message:"Failed to get all users",
     error
   });
 }
};

async function isRequestAccepted(req , res){
  // console.log("Inside is request accepted function");
  try {
    let uid = req.params.uid;
    let followId = req.params.followId;
    let requestStatus = await followingModel.find({isAccepted:false , followId , uid}).exec();
    // console.log(requestStatus);
    if(requestStatus.length){
      res.json({
        message:"Request pending",
        requestStatus
      });
    }
    else{
      res.json({
        message:"Request accepted",
        requestStatus
      })
    }
  } 
  catch (error) {
    res.json({
      message:"Failed to get request status",
      error
    })
  }

};

///completed
async function getFollowingHelper(uid) {
  try {
    let following = await followingModel.find({ uid: uid, isAccepted: true }).exec();
    let myFollowing = [];
    for (let i = 0; i < following.length; i++) {
      let user = await userModel.findById(following[i].followId);
      myFollowing.push(user);
    }
    console.log(myFollowing);
    return myFollowing;
  } catch (error) {
    return error;
  }
};

async function getAllFollowing(req, res) {
  try {
    let uid = req.params.uid;
    let myFollowing = await getFollowingHelper(uid);
    if (myFollowing.length) {
      res.json({
        message: "Succesfully got all following !",
        myFollowing,
      });
    } else {
      res.json({
        message: "You dont have any following !",
      });
    }
  } catch (error) {
    res.json({
      message: "Failed to get all following",
      error,
    });
  }
};

async function getAllFollowers(req, res) {
  try {
    let uid = req.params.uid;
    let followerIds = await followerModel.find({ uid: uid });
    // console.log(followerIds);
    if (followerIds.length) {
      let myFollowers = [];
      for (let i = 0; i < followerIds.length; i++) {
        let user = await userModel.findById(followerIds[i].followerId);
        myFollowers.push(user);
      }
      res.json({
        message: "Succesfully got all Followers",
        myFollowers,
      });
    } else {
      res.json({
        message: "You dont have any follower !",
      });
    }
  } catch (error) {
    res.json({
      message: "Failed to get all followers",
      error,
    });
  }
};

async function getAllSuggestions(req, res) {
  try {
    let uid = req.params.uid;
    let myFollowing = await getFollowingHelper(uid);
    console.log(myFollowing);
    let checkList = myFollowing.map( function(user){
        return user["_id"]+"";
    });

    // let followerIds = await followerModel.find({ uid: uid });
    // if (followerIds.length) {
    //   let myFollowers = [];
    //   for (let i = 0; i < followerIds.length; i++) {
    //     let user = await userModel.findById(followerIds[i].followerId);
    //     myFollowers.push(user);
    //   }
    // }
    // for(let i=0; i<myFollowing.length; i++){
    //   checkList.push(myFollowing[i]["_id"]+"");
    // }

    checkList.push(uid);
    let suggestions = [];
    for(let i=0 ; i<myFollowing.length ; i++){
        let followingOfMyFollowings = await getFollowingHelper(myFollowing[i]["_id"]);
        console.log(followingOfMyFollowings);
        for(let j=0 ; j<followingOfMyFollowings.length ; j++){
            if(!checkList.includes(followingOfMyFollowings[j]["_id"]+"")){
                suggestions.push(followingOfMyFollowings[j]);
                checkList.push(followingOfMyFollowings[j]["_id"]+"");
            }
        }
    }
    // for(let i=0; i<myFollowers.length ; i++){
    //   if(!checkList.includes(myFollowers[i]["_id"]+"")){
    //     suggestions.push(myFollowers[i]);
    //     checkList.push(myFollowers[i]["_id"]+"");
    //   }
    // }
    // console.log("sugegstions");
    // console.log(suggestions);
    // console.log(checkList);
    res.json({
        message:"Succesfully got all suggestions !",
        suggestions
    });
  } catch (error) {
    res.json({
      message: "Failed to get suggestions !",
      error,
    });
  }
};



module.exports.isRequestAccepted = isRequestAccepted;
module.exports.getAllUsers = getAllUsers;
module.exports.sendRequest = sendRequest;
module.exports.acceptRequest = acceptRequest;
module.exports.pendingRequest = pendingRequest;
module.exports.deleteRequest = deleteRequest;
module.exports.cancelRequest = cancelRequest;
module.exports.deleteFollower = deleteFollower;
module.exports.deleteFollowing = deleteFollowing;
module.exports.getAllFollowing = getAllFollowing;
module.exports.getAllFollowers = getAllFollowers;
module.exports.getAllSuggestions = getAllSuggestions;