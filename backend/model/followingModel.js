let {mongoose} = require("./db");


let followingSchema = mongoose.Schema({
    uid:{
        type:String,
        required:true
    },
    followId:{
        type:String,
        required:true
    },
    isAccepted:{
        type:Boolean,
        default:true
    }
});

followingSchema.index({
    uid: 1,
    followId:1,
},
{
    unique:true,
});


let followingModel= mongoose.model('following' , followingSchema);

module.exports = followingModel;