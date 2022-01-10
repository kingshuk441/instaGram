import React, { Component } from 'react';
import Follow from '../Follow/Follow';
import "./Notifications.css";
import HomeProfile from "../HomeProfile/HomeProfile";
import axios from "axios";

class Notifications extends Component {
    state = { 
        user : null,
        followRequests : []
     }

    componentDidMount(){
        let uid = this.props.user["_id"];
        this.setState({
            user: this.props.user,
            uid,
            followRequests : []
        });

        axios.get(`/api/request/${uid}`).then(obj=>{
            if(obj.data.requests.length){
                this.followReq = obj.data.requests;
                this.setState({
                    followRequests:this.followReq
                });
            }
            
        })
    };

    onAcceptRequestHandler = (followReq) =>{
        let uid = this.props.user["_id"];
        let toBeAccepted = followReq["_id"];
        let acceptedObj = { uid , toBeAccepted};

        axios.post(`/api/request/accept` , acceptedObj).then(obj=>{
            console.log(obj);
            console.log("request accepted");
            this.componentDidMount();
        })
    };

    onDeleteRequestHandler = (followReq) =>{
        let uid = this.props.user["_id"];
        let toBeAccepted = followReq["_id"];
        // let deletedObj = { uid , toBeAccepted};
        // console.log(deletedObj);
        console.log("Delete button pressed");

        axios.delete(`/api/request/delete/${uid}/${toBeAccepted}`).then( obj => {
            //console.log(obj);
            if(obj.data.deletedRequest){
                console.log("request deleted successfully");
                this.componentDidMount();
            }     
        });
    };


    
    render() { 
        return (
        <div className="notifications-page">
            { 
            this.state.user ? 
                (
                <div className="notifications">
                    <div className="notifications-body">
                        <div className="follow-requests">
                            <div className="follow-request-header">
                                <div className="profile-view-head">Follow Requests</div>
                                <div className="follow"><i className="fas fa-user-plus"></i></div>
                            </div>
                            <div className="follow-view-body">
                                 {
                                    this.state.followRequests.length ? 
                                    <div className="follow-view-list">
                                            {
                                            this.state.followRequests.map( followReq =>{
                                            return <div className="follow-entity">
                                                    <Follow follow={followReq}/>
                                                    <div className="request-action">
                                                        <div className="follow-action-btn">
                                                            <div className="follow-action" onClick={ () => this.onAcceptRequestHandler(followReq)} >Accept</div>    
                                                        </div>
                                                        <div className="follow-action-btn">
                                                        <div className="follow-action delete" onClick={()=>this.onDeleteRequestHandler(followReq)} >Delete</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            })
                                            }
                                    </div>
                                    :<div className="follow-view-body">You have no follow requests!</div>    
                                }
                            </div>
                        </div>
                    </div>   
                    <HomeProfile user = {this.state.user}/> 
                </div>
                )
                : (<h1>Loading Data</h1> )
                }  
                </div>
        );
    }
}
 
export default Notifications;