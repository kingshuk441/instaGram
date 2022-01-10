import React, { Component } from 'react';
import './UserProfile.css';
import axios from "axios";
import UserPost from '../userPost/userPost';
import Follow from '../Follow/Follow';


class UserProfile extends Component {
    state = { 
        isRequestAcccepted:false,
        isFollowed:false,
        isPublic:false,
        view:"POSTS",
        posts:[],
        followers:[],
        following:[]
    }


    componentDidMount(){
        console.log("inside user profile");
        console.log(this.props);
        let pid = this.props.profileUser["_id"];
        let uid = this.props.user["_id"];

        axios.get(`/api/request/following/${uid}`).then(obj=>{
            let myFollowing = obj.data.myFollowing;
            if(myFollowing){
                for(let i=0; i<myFollowing.length; i++){
                    if(myFollowing[i]["_id"]===pid){
                        this.setState({
                            isFollowed:true,
                        });
                        break;
                    }
                }
            }
        });

        axios.get(`/api/request/isAccepted/${pid}/${uid}`).then(obj=>{
            let requestStatus = obj.data.message;
            // console.log(requestStatus);
            if(!this.state.isFollowed){
                if(requestStatus==="Request pending"){
                    this.setState({
                        isRequestAcccepted:false
                    });
                }
                else{
                    this.setState({
                        isRequestAcccepted:true
                    });
                }
                console.log(this.state.isRequestAcccepted);
            }
        })

         let posts=[];
         let followers=[];
         let following=[];

         axios.get(`/api/post/${pid}`).then(obj=>{
            // console.log(obj);
            let Userposts = obj.data.myposts;
            console.log(Userposts);
            if(Userposts){
                posts= Userposts;
                let sortedPosts = posts.sort( (a,b)=>{
                    return new Date(b.createdOn) - new Date(a.createdOn) ;
                })
                posts= sortedPosts;
            }
            let followerObjecPromise = axios.get(`/api/request/follower/${pid}`);
            return followerObjecPromise;
         })
         .then(obj=>{
            let Userfollowers = obj.data.myFollowers;
            console.log(Userfollowers);
            if(Userfollowers){
                followers = Userfollowers;
            }

            let followingObjecPromise = axios.get(`/api/request/following/${pid}`);
            return followingObjecPromise;
         })
         .then(obj=>{
            let Userfollowing = obj.data.myFollowing;
            console.log(Userfollowing);
            if(Userfollowing){
                following = Userfollowing;
            }
            this.setState({
                isPublic : this.props.profileUser.isPublic,
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

   sendRequestHandler=(profileUser)=>{
    let uid = this.props.user["_id"];
    console.log("Inside send request handler");
    let followId = profileUser["_id"];
    axios.post(`/api/request`, {uid, followId}).then( obj =>{
        console.log(obj);
        // this.componentDidMount();
        console.log("request sent");
        if(this.state.isPublic){
            this.setState({
                isFollowed:true,
                isRequestAcccepted:true
            });
        }
        else{
            this.setState({
                isRequestAcccepted:false
            });
        }
    });
    };

    onUnfollowHandler=(following)=>{
        let followingId = following["_id"];
        let uid = this.props.user["_id"];
        axios.delete(`api/request/delete/following/${uid}/${followingId}`).then(obj=>{
            if(obj.data.deletedFollowing){
                console.log("Unfollowed user successfully");
                this.setState({
                    isFollowed:false,
                    isRequestAcccepted:false
                });
            }
        });

    };

    onCancelRequestHandler = (profileUser)=>{
        console.log("inside cancel request handler");
        let uid = this.props.user["_id"];
        let followId = profileUser["_id"];
        axios.delete(`/api/request/cancel/${followId}/${uid}`).then(obj=>{
            if(obj.data.message === "Request cancelled successfully" ){
                console.log("Request cancelled successfully");
                this.setState({
                    isFollowed:false,
                    isRequestAcccepted:true
                });
            }
        })
    }

    onclickHandler=(follow)=>{
        console.log("Inside on clicked handler");
        let clickedUser =  follow;
        this.props.UserClickedHandler(clickedUser);
     }

     componentDidUpdate(){
        // this.componentDidMount();
        let pid = this.props.profileUser["_id"];
        let uid = this.props.user["_id"];

        axios.get(`/api/request/following/${uid}`).then(obj=>{
            let myFollowing = obj.data.myFollowing;
            if(myFollowing){
                for(let i=0; i<myFollowing.length; i++){
                    if(myFollowing[i]["_id"]===pid){
                        this.setState({
                            isFollowed:true,
                        });
                        break;
                    }
                }
            }
        });

        axios.get(`/api/request/isAccepted/${pid}/${uid}`).then(obj=>{
            let requestStatus = obj.data.message;
            // console.log(requestStatus);
            if(!this.state.isFollowed){
                if(requestStatus==="Request pending"){
                    this.setState({
                        isRequestAcccepted:false
                    });
                }
                else{
                    this.setState({
                        isRequestAcccepted:true
                    });
                }
                console.log(this.state.isRequestAcccepted);
            }
        })

         let posts=[];
         let followers=[];
         let following=[];

         axios.get(`/api/post/${pid}`).then(obj=>{
            // console.log(obj);
            let Userposts = obj.data.myposts;
            console.log(Userposts);
            if(Userposts){
                posts= Userposts;
                let sortedPosts = posts.sort( (a,b)=>{
                    return new Date(b.createdOn) - new Date(a.createdOn) ;
                })
                posts= sortedPosts;
            }
            let followerObjecPromise = axios.get(`/api/request/follower/${pid}`);
            return followerObjecPromise;
         })
         .then(obj=>{
            let Userfollowers = obj.data.myFollowers;
            console.log(Userfollowers);
            if(Userfollowers){
                followers = Userfollowers;
            }

            let followingObjecPromise = axios.get(`/api/request/following/${pid}`);
            return followingObjecPromise;
         })
         .then(obj=>{
            let Userfollowing = obj.data.myFollowing;
            console.log(Userfollowing);
            if(Userfollowing){
                following = Userfollowing;
            }
            this.setState({
                isPublic : this.props.profileUser.isPublic,
                posts,
                followers,
                following
            });
         });

     }



     

    render() { 
        // let user = this.props.user;
        //  console.log(this.props);
        let {name, username, profilePic, bio} = this.props.profileUser;
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
                            <div className="no-of-followers" onClick={()=>{this.onFollowerClickHandler()}}  ><strong>{this.state.followers.length}</strong> Followers</div>
                            <div className="no-of-following" onClick={()=>{this.onFollowingClickHandler()}} ><strong>{this.state.following.length}</strong> Following</div>
                        </div>
                    </div>
                    <div className="profile-follow-action-button">
                        {
                            this.state.isFollowed ? 
                            <div className="action-btn unfollow" onClick={()=>this.onUnfollowHandler(this.props.profileUser)}>UNFOLLOW</div>
                            :
                            (
                            this.state.isRequestAcccepted ? 
                            <div className="action-btn" onClick={()=>this.sendRequestHandler(this.props.profileUser)}>FOLLOW</div>
                            :
                            <div className="action-btn" onClick={()=>this.onCancelRequestHandler(this.props.profileUser)}>REQUESTED</div>
                            )
                        }
                    </div>
                </div>

                    {
                        this.state.isPublic || this.state.isFollowed ? 
                        (
                        <div className="profile-user-view-info">
                           <div className="profile-view-head">{this.state.view}</div> 
                           {
                            this.state.view === "POSTS" && (
                                this.state.posts.length ? 
                                <div className="profile-view-body">
                                {
                                    this.state.posts.map( post =>{
                                    return <div className="post-entity">
                                        <UserPost post={post} user={this.props.user} key={post["_id"]}  UserClickedHandler={this.props.UserClickedHandler}  />
                                    </div>
                                    })
                                }
                                </div>
                                : <div className="profile-view-body">NO POSTS YET</div>    
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
                                            <Follow follow={follower} key={follower["_id"]} UserClickedHandler={this.props.UserClickedHandler} />
                                        </div>
                                        })
                                        }
                                    </div>
                                </div>
                                : <div className="follow-view-body">NO FOLLOWERS</div>    
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
                                                <Follow follow={following} key={following["_id"]} UserClickedHandler={this.props.UserClickedHandler} />
                                            </div>
                                            })
                                            }
                                        </div>
                                </div>
                                : <div className="follow-view-body">NO FOLLOWING</div>    
                            )
                         } 
                        </div>

                        )
                        :(<h1>This account is private</h1>)
                    }
            </div>
         );
    }
}
 
export default UserProfile ;