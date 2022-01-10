const requestRouter = require("express").Router();
const { request } = require("express");
const {
        sendRequest , 
        acceptRequest, 
        pendingRequest, 
        getAllFollowing, 
        getAllFollowers, 
        getAllSuggestions, 
        deleteFollowing, 
        deleteRequest, 
        deleteFollower, 
        cancelRequest, 
        getAllUsers,
        isRequestAccepted
    } = require("../controller/requestController");





requestRouter.route("").post(sendRequest).get(getAllUsers);
requestRouter.route("/accept").post(acceptRequest);
requestRouter.route("/isAccepted/:followId/:uid").get(isRequestAccepted);
requestRouter.route("/delete/:followId/:uid").delete(deleteRequest);
requestRouter.route("/cancel/:followId/:uid").delete(cancelRequest);
requestRouter.route("/:uid").get(pendingRequest);
requestRouter.route("/following/:uid").get(getAllFollowing);
requestRouter.route("/follower/:uid").get(getAllFollowers);
requestRouter.route("/suggestions/:uid").get(getAllSuggestions);
requestRouter.route("/delete/following/:uid/:followingId").delete(deleteFollowing);
requestRouter.route("/delete/follower/:uid/:followerId").delete(deleteFollower);


module.exports = requestRouter;