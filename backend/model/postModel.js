let {mongoose} = require("./db");

let postSchema = mongoose.Schema({
    uid:{
        type:String,
        required:true
    },
    postImage:{
        type:String,
        required:true
    },
    caption:{
        type:String,
        required:true
    },
    createdOn: {
        type:Date ,
        default: Date.now
    },
    likes:[
        {type:String}
    ],

    comments:[
        {
            uid:String ,
            user:String,
            comment:String
        }
    ]
});

const postModel = mongoose.model('post' , postSchema);
module.exports = postModel;

//pid:""
//uid:""
//postImage:"" required
//caption:"" required
//likes:[uid, uid , uid]
//comments:[{uid:"" , comment:"" } , {}]
