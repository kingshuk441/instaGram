import React, { Component } from 'react';
import {Link} from "react-router-dom";
import axios from 'axios';




class Suggestion extends Component {
    state = { 
        isRequestSent:false
     }

    componentDidMount(){
        console.log("Inside component did mount");
        let uid = this.props.user["_id"];
        let followId = this.props.suggestion["_id"];
        axios.get(`/api/request/${followId}`).then( obj =>{
            let Myrequest = obj.data.requests.map( request =>{
                if(request["_id"]===uid) {
                    return request;
                }
            });
            if(Myrequest.length){
                this.setState({
                        isRequestSent:true
                 });
            }
            else{
                this.setState({
                    isRequestSent:false
             });
            }
        });
    }

    onclickHandler=(suggestion)=>{
        console.log("Inside on clicked handler");
        let clickedUser =  suggestion;
        this.props.UserClickedHandler(clickedUser);
        this.setState({
            clickedUser
        })
     }

     onCancelRequestHandler = (suggestion)=>{
        console.log("inside cancel request handler");
        let uid = this.props.user["_id"];
        let followId = suggestion["_id"];
        axios.delete(`/api/request/cancel/${followId}/${uid}`).then(obj=>{
            if(obj.data.message === "Request cancelled successfully" ){
                console.log("Request cancelled successfully");
                this.setState({
                    isRequestSent:false
                });
            }
        })
    }

    sendRequestHandler=(suggestion)=>{
        let uid = this.props.user["_id"];
        console.log("Inside send request handler");
        let followId = suggestion["_id"];
        // clickedUser = suggestion;
        // console.log(clickedUser);
        axios.post(`/api/request`, {uid, followId}).then( obj =>{
            console.log(obj);
            console.log("request sent");
            this.props.refreshSuggestions();
            axios.get(`/api/request/${followId}`).then( obj =>{
                let Myrequest = obj.data.requests.map( request =>{
                    if(request["_id"]===uid) {
                        return request;
                    }
                });
                if(Myrequest.length){
                    this.setState({
                            isRequestSent:true
                    });
                }
                else{
                    this.setState({
                        isRequestSent:false
                });
                }
            });
        });
    }



    render() { 
        let suggestion = this.props.suggestion;
        let isRequestSent = this.state.isRequestSent;
        return ( 
        <div key={suggestion["_id"]} className="suggested-user user-info">
        <Link to="/userProfile" style={{ textDecoration: 'none' }} >
        <div className="sugg-img user-image" onClick = {()=>this.onclickHandler(suggestion)}>
            <img src={suggestion.profilePic} alt=""/>
        </div>
        </Link>
        <Link to="/userProfile" style={{ textDecoration: 'none' }} >
        <div className="name-info" onClick = {()=>this.onclickHandler(suggestion)}>
            <div className="username"><strong>{suggestion.username}</strong></div>
            <div className="name">{suggestion.name}</div>
        </div>
        </Link>
        {
            isRequestSent 
            ?
            (
                    <div className="request-sent" onClick={()=>this.onCancelRequestHandler(suggestion)} >Requested</div>
            )
            :
            (<div className="follow" onClick={()=>this.sendRequestHandler(suggestion)}>
                <i className="fas fa-user-plus" ></i>
            </div>  )                         
        }
        </div>     
     );
    }
}
 
export default Suggestion;