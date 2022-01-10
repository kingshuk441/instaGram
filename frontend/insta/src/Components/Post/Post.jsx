import React, { Component } from 'react';
import "./Post.css";
import axios from "axios";
import {Link} from "react-router-dom";

class Post extends Component {
    state = { 
        userPhoto:"",
        username:"",
        caption:"",
        postImage:"",
        comments:[],
        likes:[],
        commentInput:"",
        postUser:null,
        user:null,
        destination:"",
        isLiked:false
     };

     componentDidMount(){
         let postUserUid = this.props.post.uid;
        //  console.log(postUserUid);
         let post = this.props.post;
         let user = this.props.user;
         let uid = user["_id"];
         axios.get(`/api/user/${postUserUid}`).then(obj=>{
            for(let i=0 ; i< post.likes.length ; i++){
                if(post.likes[i]===uid){
                    this.setState({
                        isLiked:true
                    });
                    break;
                }
            }
            let postUser = obj.data.user;
            let isLiked = this.state.isLiked;
            this.setState({
                userPhoto: postUser.profilePic,
                username:postUser.username,
                caption: post.caption,
                postImage: post.postImage,
                comments: post.comments,
                likes: post.likes,
                commentInput:"",
                postUser,
                user,
                isLiked
            });
         });
     }

     onclickHandler=(postUser)=>{
        console.log("Inside on clicked handler");
        let clickedUser =  postUser;
        let user = this.props.user;
        let destination = this.state.destination;
        if(user["_id"]===clickedUser["_id"]){
            destination="/profile";
        }
        else{
            destination="/userProfile";
        }
        this.props.UserClickedHandler(clickedUser);
        this.setState({
            clickedUser,
            destination
        })
     }


     onLikeHandler = () =>{
        let pid = this.props.post["_id"];
        let uid = this.props.user["_id"];
        console.log(pid);
        console.log(uid);
        axios.get(`api/post/like/${uid}/${pid}`).then(obj=>{
            let updatePost = obj.data.updatedPost;
            console.log(updatePost);
            if(this.state.isLiked===true){
                this.setState({
                    isLiked:false
                })
            }
            else{
                this.setState({
                    isLiked:true
                })
            }
            this.setState({
                likes:updatePost.likes
            });

        });
     };

     onCommentTypeHandler = (value) =>{
        this.setState({
            commentInput:value
        })
    };

     onPostCommentHandler = ()=>{
        let pid = this.props.post["_id"];
        let uid = this.props.user["_id"];
        let comment = this.state.commentInput;
        let commentObj = {uid, pid, comment};
        axios.post(`api/post/comment/${uid}/${pid}` , commentObj).then(obj=>{
            let updatedPost = obj.data.updatedPost;
            this.setState({
                comments:updatedPost.comments,
                commentInput:""
            });
        });
     };

     deleteMyComment = (commentId) =>{
        console.log("Inside delete comment from my post function");
        let pid = this.props.post["_id"];
        let uid = this.props.user["_id"];
        axios.delete(`/api/post/comment//${pid}/${commentId}`).then(obj=>{
            let updatedPost = obj.data.updatedPost;
           this.setState({
                comments:updatedPost.comments
            });
        })

     }



    render() { 
        let {username, userPhoto , caption, postImage, comments, likes, postUser, user} = this.state;
        let destination= this.state.destination;
        return ( 
        <div className="post">
            <div className="post-header">
                <div className="user-photo" onClick = {()=>this.onclickHandler(postUser)}>
                <Link to={destination} style={{ textDecoration: 'none' }}><img src={userPhoto} alt=""/></Link>
                </div>
                <Link to={destination} style={{ textDecoration: 'none' }}>
                <div className="username"  onClick = {()=>this.onclickHandler(postUser)} >{username}</div>
                </Link>
            </div>
            <div className="post-image">
                <img src={postImage} alt=""/>
            </div>
            <div className="post-footer">
                <div className="reactions">
                    <div className="icons">
                        {
                            this.state.isLiked===true ? 
                            <div className="active-icon" onClick={this.onLikeHandler} ><i class="fab fa-gratipay"></i></div>
                            : <div className="like-icon" onClick={this.onLikeHandler} ><i class="fab fa-gratipay"></i></div>

                        }
                    </div>
                    <div className="numbers">
                        <div className="like-no" >{likes.length} Likes</div>
                        <div className="comment-no">{comments.length} Comments</div>
                    </div>
                </div>
                <div className="caption-info">
                        <div className="username">{username}</div>
                        <div className="caption">{caption}</div>
                </div>
                <div className="comment-box">
                    <div className="comment-list">
                            {
                                comments.length ?(
                                    this.state.comments.map(commentInfo=>{
                                    return <div className="comment-info" key={commentInfo["_id"]}>
                                                <div className="user-commented username">{commentInfo.user}</div>
                                                <div className="comment">{commentInfo.comment}</div>
                                                {
                                                    user["_id"]===commentInfo.uid
                                                    ?
                                                    <div className="remove-comment">
                                                        <i class="fas fa-minus-circle" onClick={() =>{this.deleteMyComment(commentInfo["_id"])}}></i>
                                                    </div>
                                                    :
                                                    <div></div>
                                                }
                                            </div>
                                    })
                                )
                                :
                                <div className="comment-info">

                                </div>
                            }
                    </div>
                    <div className="comment-input">
                        <input type="text" placeholder="Add a comment" value={this.state.commentInput} onChange={ (e) => {this.onCommentTypeHandler(e.target.value)}}/>
                        <div className="add-comment" onClick={this.onPostCommentHandler} >POST</div>
                    </div>
                </div>
            </div>
        </div>
         );
    }
}
 
export default Post;