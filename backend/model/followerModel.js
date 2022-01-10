let {mongoose} = require("./db");


let followerSchema = mongoose.Schema({
    uid:{
        type:String,
        required:true
    },
    followerId:{
        type:String,
        required:true
    }
});

followerSchema.index({
    uid: 1,
    followerId:1,
},
{
    unique:true,
});

let followerModel= mongoose.model('follower' , followerSchema);

module.exports = followerModel;