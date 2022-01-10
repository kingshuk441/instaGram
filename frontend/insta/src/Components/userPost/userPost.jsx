import axios from 'axios';
import React, { Component } from 'react';
import './userPost.css';

class UserPost extends Component {
    state = { 
        caption:"",
        postImage:"",
        postId:"",
        likes:[],
        comments:[]
     }

     componentDidMount(){
        let caption = this.props.post.caption;
        let postImage = this.props.post.postImage;
        let postId = this.props.post["_id"];
        let likes = this.props.post.likes;
        let comments = this.props.post.comments;
        this.setState({
            postImage,
            caption,
            postId,
            likes,
            comments
        })
     }


     deleteCommentFromMyPost = (commentId) =>{
         console.log("Inside delete comment from my post function");
         let pid = this.props.post["_id"];
         axios.delete(`/api/post/comment/${pid}/${commentId}`).then(obj=>{
            let updatedPost = obj.data.updatedPost;
            this.setState({
                comments: updatedPost.comments
            })
         })
     }

    render() { 
        let {caption, postImage , likes, comments} = this.state;
        return (  
            <div className="profile-user-post">
                <img src={postImage} alt=""/>
                <div className="profile-caption-footer">
                    <div className="profile-post-reaction-tab">
                        <div className="post-likes">{likes.length} likes</div>
                        <div className="post-comments">{comments.length} comments</div>
                    </div>
                    <div className="profile-post-image-caption">{caption}</div>
                    <div className="profile-comments">
                    {
                         comments.length ?(
                            comments.map(commentInfo=>{
                            return <div className="profile-comment-info" key={commentInfo["id"]}>
                                        <div className="profile-user-commented username">{commentInfo.user}:</div>
                                        <div className="profile-comment">{commentInfo.comment}</div>
                                        <div className="remove-comment">
                                            <i class="fas fa-minus-circle" onClick={() =>{this.deleteCommentFromMyPost(commentInfo["_id"])}}></i>
                                        </div>
                                    </div>
                                })
                            )
                            :
                            <div className="profile-comment-info">

                            </div>
                    }
                    </div>
                </div>
            </div>
        );
    }
}
 
export default UserPost;