import axios from 'axios';
import React, { Component } from 'react';
import "./HomeProfile.css";
import {Link} from "react-router-dom";
import Suggestion from '../Suggestion/Suggestion';

class HomeProfile extends Component {
    state = { 
        clickedUser:null,
        suggestions:[],
        isRequestSent:false
     }

     componentDidMount(){
        console.log("Inside component did mount")
        let uid = this.props.user["_id"];
        axios.get(`/api/request/suggestions/${uid}`).then( obj =>{
            console.log(obj.data.suggestions);
              let suggestions = obj.data.suggestions;
              this.setState({
                suggestions
              });
         });
     };

    
     onclickHandler=(suggestion)=>{
        console.log("Inside on clicked handler");
        let clickedUser =  suggestion;
        this.props.UserClickedHandler(clickedUser);
        this.setState({
            clickedUser
        })
     }

     refreshSuggestions = () =>{
         this.componentDidMount();
     }


    render() { 
        let { name , username, profilePic} = this.props.user;
        let suggestions = this.state.suggestions;

        console.log(suggestions);
        return ( 
            <div className="home-profile">
                <div className="user-info">
                    <Link to="/profile">
                    <div className="user-image">
                        <img src={profilePic} alt=""/>
                    </div>
                    </Link>
                    <Link to="/profile" style={{ textDecoration: 'none' }}>
                    <div className="name-info">
                        <div className="username"><strong>{username}</strong></div>
                        <div className="name">{name}</div>post
                    </div>
                    </Link>
                </div>
                <div className="user-suggestions">
                    <div className="suggestion-head">Suggestions for you</div>
                    {
                        suggestions.length ? 
                        <div className="suggestion-body">
                            {
                            suggestions.map( suggestionList => {
                                return <Suggestion suggestion={suggestionList}  user={this.props.user}  UserClickedHandler={this.props.UserClickedHandler} refreshSuggestions = {this.refreshSuggestions} ></Suggestion>
                            })
                            }
                        </div> 
                        : <div className="suggestion-body">SORRY! No suggestions found for you!</div>
                    }
                </div>
            </div>
         );
    }
}
 
export default HomeProfile;