import React, { Component } from 'react';
import axios from "axios";
import "./Profile.css";
import UserPost from '../userPost/userPost';
import Follow from '../Follow/Follow';

class Profile extends Component {
    state = { 
        view:"POSTS",
        posts:[],
        followers:[],
        following:[]
     };

     componentDidMount(){
         let uid = this.props.user["_id"];
         console.log(uid);
         let posts=[];
         let followers=[];
         let following=[];

         axios.get(`/api/post/${uid}`).then(obj=>{
            // console.log(obj);
            let Myposts = obj.data.myposts;
            console.log(Myposts);
            if(Myposts){
                posts= Myposts;
                let sortedPosts = posts.sort( (a,b)=>{
                    return new Date(b.createdOn) - new Date(a.createdOn) ;
                })
                posts= sortedPosts;
            }
            let followerObjecPromise = axios.get(`/api/request/follower/${uid}`);
            return followerObjecPromise;
         })
         .then(obj=>{
            let Myfollowers = obj.data.myFollowers;
            if(Myfollowers){
                followers = Myfollowers;
            }
            let followingObjecPromise = axios.get(`/api/request/following/${uid}`);
            return followingObjecPromise;
         })
         .then(obj=>{
            let Myfollowing = obj.data.myFollowing;
            if(Myfollowing){
                following = Myfollowing;
            }
            this.setState({
                posts,
                followers,
                following
            });
         });
     }

     onPostClickHandler=()=>{
         this.setState({
             view:"POSTS"
         });
     };

     onFollowerClickHandler=()=>{
         this.setState({
             view:"FOLLOWERS"
         });
     };

     onFollowingClickHandler=()=>{
        this.setState({
            view:"FOLLOWING"
        });
    }

    onDeletePostHandler=(post)=>{
        let pid = post["_id"];
        axios.delete(`/api/post/${pid}`).then( obj => {
            //console.log(obj);
            if(obj.data.deletedPost){
                console.log("deleted post successfully");
                this.componentDidMount();
            }     
        });
    };

    onRemoveFollowerHandler=(follower)=>{
        //console.log("Inside remove follower handler");
        // console.log(uid);
        let followerId = follower["_id"];
        //console.log(followerId);
        let uid = this.props.user["_id"];

        axios.delete(`api/request/delete/follower/${uid}/${followerId}`).then(obj=>{
            if(obj.data.deletedFollower){
                console.log("Follower removed successfully");
                this.componentDidMount();
            }
        });
    };

    onUnfollowHandler=(following)=>{
        let followingId = following["_id"];
        let uid = this.props.user["_id"];
        axios.delete(`api/request/delete/following/${uid}/${followingId}`).then(obj=>{
            if(obj.data.deletedFollowing){
                console.log("Unfollowed user successfully");
                this.componentDidMount();
            }
        });

    };



    render() { 
        let {name, username, profilePic, bio} = this.props.user;
        let followerAction = "Remove";
        let followingAction = "Unfollow";
        return ( 
            <div className="profile">
                <div className="profile-user-info">
                    <div className="profile-user-image">
                        <img src={profilePic} alt=""/>
                    </div>
                    <div className="profile-user-detail-info">
                        <div className="profile-user-details">
                            <div className="profile-user-username">{username}</div>
                            <div className="profile-user-name">{name}</div>
                            <div className="profile-user-bio">{bio}</div>
                        </div>
                        <div className="profile-stats">
                            <div className="no-of-posts" onClick={()=>{ this.onPostClickHandler()}} ><strong>{this.state.posts.length}</strong> Posts</div>
                            <div className="no-of-followers" onClick={()=>{this.onFollowerClickHandler()}} ><strong>{this.state.followers.length}</strong> Followers</div>
                            <div className="no-of-following" onClick={()=>{this.onFollowingClickHandler()}} ><strong>{this.state.following.length}</strong> Following</div>
                        </div>
                    </div>
                </div>
                <div className="profile-user-view-info">
                    <div className="profile-view-head">{this.state.view}</div>
                    {
                        this.state.view === "POSTS" && (
                            this.state.posts.length ? 
                            <div className="profile-view-body">
                            {
                                this.state.posts.map( post =>{
                                return <div className="post-entity">
                                    <UserPost post={post} key={post["_id"]} user={this.props.user}/>
                                    <div className="profile-post-delete" onClick={()=>this.onDeletePostHandler(post)}>Delete</div>
                                </div>
                                })
                            }
                            </div>
                            : <div className="profile-view-body">SORRY! You have no post!</div>    
                        )
                    }
                    {
                        this.state.view === "FOLLOWERS" && (
                            this.state.followers.length ? 
                            <div className="follow-view-body">
                                <div className="follow-view-list">
                                    {
                                    this.state.followers.map( follower =>{
                                    return <div className="follow-entity">
                                        <Follow follow={follower} key={follower["_id"]}  UserClickedHandler={this.props.UserClickedHandler} />
                                        <div className="follow-action-btn">
                                            <div className="follow-action" onClick={()=>this.onRemoveFollowerHandler(follower)} >{followerAction}</div>
                                        </div>
                                    </div>
                                    })
                                    }
                                </div>
                            </div>
                            : <div className="follow-view-body">You have no follower!</div>    
                        )
                    }
                    {
                        this.state.view === "FOLLOWING" && (
                            this.state.following.length ? 
                            <div className="follow-view-body">
                                <div className="follow-view-list">
                                    {
                                        this.state.following.map( following =>{
                                        return <div className="follow-entity">
                                            <Follow follow={following} key={following["_id"]} UserClickedHandler={this.props.UserClickedHandler}  />
                                            <div className="follow-action-btn">
                                                <div className="follow-action" onClick={()=>this.onUnfollowHandler(following)} >{followingAction}</div>
                                            </div>
                                        </div>
                                        })
                                        }
                                    </div>
                            </div>
                            : <div className="follow-view-body">You do not follow any user!</div>    
                        )
                    }
                   </div>
            </div>
         );
    }
}
 
export default Profile;