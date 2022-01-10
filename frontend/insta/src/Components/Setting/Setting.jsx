import React, { Component } from 'react';
import axios from "axios";
import './Setting.css';

class Settings extends Component {
    state = { 
        name:"",
        username:"",
        bio:"",
        password:"",
        profilePic:"",
        isPublic: true,
        disabled:true
     }

     fileInput = React.createRef();

     componentDidMount(){
        let {name, username, bio, password, profilePic, isPublic} = this.props.user;
        this.setState({
           name,
           username,
           bio,
           password,
           profilePic,
           isPublic
       });
    };

     onChangeHandler = (e) =>{
         let type = e.target.id;
         let value = e.target.value;
         this.setState({
            [type] : value 
         });
     };

     onEditHandler = () =>{
        this.setState({
            disabled:false
        });
     };

     onCancelHandler = () =>{
        let {name, username, bio, password, profilePic, isPublic} = this.props.user;
        this.setState({
            name,
            username,
            bio,
            password,
            profilePic,
            isPublic,
            disabled:true
        });
     };

     onSaveHandler = () =>{
         let formData = new FormData();
         let {name, username, bio, password, isPublic} = this.state;
         formData.append('name' , name);
         formData.append('username' , username);
         formData.append('bio' , bio);
         formData.append('isPublic' , isPublic);
         formData.append('password' , password);
        
        let uid = this.props.user["_id"];

         axios.patch(`api/user/${uid}` , formData).then( obj =>{
            if( obj.data.updatedUser)
            {
                this.props.updateUser(obj.data.updatedUser);
                this.setState({
                    disabled:true
                });
            }        
        });


     };
     
     onUpdateProfileHandler = () =>{
        let fileObject = this.fileInput.current.files[0] ;
        let uid = this.props.user["_id"];
        //console.log(fileObject);
        let formData = new FormData();
        formData.append('user' , fileObject);
        axios.patch(`api/user/${uid}` , formData).then( obj =>{
            let profilePic = obj.data.updatedUser.profilePic;
            this.setState({
                profilePic
            })
        });
     };

    render() { 
        return ( 
            <div className="setting">
                <div className="photo-edit">
                    <div className="photo-edit-header">Update Profile Picture</div>
                    <div className="userimage">
                        <img src={this.state.profilePic} alt="" className="profile-photo"/>
                    </div>
                    <div className="upload-photo">
                        <input type="file" id="photo-image" ref = {this.fileInput}/>
                        <div className="upload-btn" onClick={this.onUpdateProfileHandler} >CHANGE</div>
                    </div>
                </div>
                <div className="form-edit">
                    <div className="user-info">
                        <div className="key">Name</div>
                        <input type="text" id="name"  value ={this.state.name} onChange={(e)=>{this.onChangeHandler(e)}} disabled={this.state.disabled} />
                    </div>
                    <div className="user-info">
                        <div className="key">Username</div>
                        <input type="text" id="username" value={this.state.username} onChange={(e)=>{this.onChangeHandler(e)}} disabled={this.state.disabled} />
                    </div>
                    <div className="user-info">
                        <div className="key">Bio</div>
                        <input type="text" id="bio" value={this.state.bio} onChange={(e)=>{this.onChangeHandler(e)}} disabled={this.state.disabled} />
                    </div>
                    <div className="user-info">
                        <div className="key">Public account</div>
                        <input type="text" id="isPublic"  value={this.state.isPublic} onChange={(e)=>{this.onChangeHandler(e)}} disabled={this.state.disabled} />
                    </div>
                    <div className="user-info">
                        <div className="key">Password</div>
                        <input type="password" id="password"  value={this.state.password} onChange={(e)=>{this.onChangeHandler(e)}} disabled={this.state.disabled} />
                    </div>
                    <div className="options">
                        {
                            this.state.disabled ?
                            (<div className="edit"><button onClick={this.onEditHandler}>EDIT</button></div>):
                            (<div className="action">
                                <div className="save"><button onClick={this.onSaveHandler} >SAVE</button></div>
                                <div className="cancel"><button onClick={this.onCancelHandler} >CANCEL</button></div>
                             </div> )
                        }   
                    </div>
                </div>
                
            </div>
         );
    }
}
 
export default Settings;