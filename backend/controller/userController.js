const userModel = require("../model/userModel");
const fs = require('fs');

// createUser
// get all users
// get by id
// update user by id
// delete by id


async function createUser(req , res){
    try {
        let userObject = req.body;
        console.log(userObject);
        if(req.file){
            let profilePicPath = req.file.destination.substring(6) + "/" + req.file.filename;
            userObject.profilePic = profilePicPath;
            console.log(userObject);
        }
            let userCreated = await userModel.create(userObject);
            res.json({
                message:"User created successfully!!",
                userCreated
            });
    } 
    catch (error) {
        res.json({
            message:"Failed to create user!!",
            error
        })
    }

};

async function getAllUsers(req , res){
    try {
        let allUsers = await userModel.find();
        console.log(allUsers);
        res.json({
            message:"Successfully got all users!",
            allUsers
        });
    } catch (error) {
        res.json({
            message:"Failed to get all users!",
            error
        });
    }
};

async function getUserById(req , res){
    try {
        let id = req.params.id;
        let user = await userModel.findById(id);
        res.json({
            message:"Successfully got user!",
            user
        })
    } catch (error) {
        res.json({
            message:"Failed to get user!",
            error
        })
    }
};

async function updateUserById(req , res){
    try {
        //console.log(req.body);
        let updateObject = req.body;
        let id = req.params.id;
        let user = await userModel.findById(id);
        // let oldProfilePicPath = user.profilePic;
        // console.log(oldProfilePicPath);

        for(let key in updateObject){
            user[key] = updateObject[key];
        }
        if(req.file){
            let profilePicPath = req.file.destination.substring(6) + "/" + req.file.filename;
            user.profilePic = profilePicPath;
            // fs.unlink("" + oldProfilePicPath, function (err) {            
            //     if (err) {                                                 
            //         console.error(err);                                    
            //     }                                                          
            //    console.log('File has been Deleted');                           
            // });    
        }

        let updatedUser = await user.save();
        console.log(updatedUser)
        res.json({
            message:"User updated successfully!!",
            updatedUser
        });

    } catch (error) {
        res.json({
            message:"Update failed!!",
            error
        });
    }
};

async function deleteUserById(req , res){
    try {
        let id = req.params.id;
        let deletedUser = await userModel.findByIdAndDelete(id);
        //console.log(deletedUser);
        res.json({
            message:"User deleted successfully!!",
            deletedUser
        });
    } catch (error) {
        res.json({
            message:"User deletion unsuccessful!!",
            error
        });
    }
    //607b3ba72e72680998f82c60
};


module.exports.createUser = createUser;
module.exports.getAllUsers = getAllUsers;
module.exports.getUserById = getUserById;
module.exports.updateUserById = updateUserById;
module.exports.deleteUserById = deleteUserById;

