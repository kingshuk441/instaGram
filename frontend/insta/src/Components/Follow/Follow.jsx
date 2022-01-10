import React, { Component } from 'react';
import "./Follow.css";
import {Link, Redirect} from "react-router-dom";

class Follow extends Component {
    state = { 
        username:"",
        name:"",
        profilePic:"",
        clickedUser:null
     }

     componentDidMount(){
         let username = this.props.follow.username;
         let name = this.props.follow.name;
         let profilePic = this.props.profilePic;
         this.setState({
             username,
             name,
             profilePic
         });
     }

     onclickHandler=(follow)=>{
        console.log("Inside on clicked handler");
        let clickedUser =  follow;
        this.props.UserClickedHandler(clickedUser);
        this.setState({
            clickedUser
        })
        this.componentDidMount();
     }


    render() { 
        let follow = this.props.follow;
        let {username, name, profilePic} = this.props.follow;
        return ( 
            <div className="follow-component-body">
                <Link to="/userProfile" style={{ textDecoration: 'none' }} >
                <div className="follow-user-image">
                    <img src={profilePic} alt="" onClick = {()=>this.onclickHandler(follow)} />
                </div>
                </Link>
                <Link to="/userProfile" style={{ textDecoration: 'none' }}>
                <div className="follow-user-info">
                    <div className="follow-user-name " onClick = {()=>this.onclickHandler(follow)} >{username}</div>
                    <div className="follow-user-username " onClick = {()=>this.onclickHandler(follow)}  >{name}</div>
                </div>
                </Link>
            </div>
          );
    }
}
 
export default Follow;