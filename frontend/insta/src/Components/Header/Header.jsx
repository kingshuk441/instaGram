import React, { Component } from 'react';
import "./Header.css";
import {Link} from 'react-router-dom';
import axios from "axios";

class Header extends Component {
    // isAuth => false
    // isAuth => true
    state = { 
        allUsers:[],
        searchInput:"",
        searchedUser:null
     };

     componentDidMount(){
         axios.get("/api/request").then(obj=>{
            //  console.log(obj.data.allUsers);
            this.setState({
             allUsers: obj.data.allUsers
            });
         });    
     }

     inputBoxHandler = (value) =>{
        this.setState({
            searchInput:value
        })
    }

    onSearchClickHandler = ()=>{
        let userToBeSearched = this.state.searchInput;
        let allUsers = this.state.allUsers;
        let searchedUser=null;
        let isFound = false;
        console.log("Inside search clicked handler");
        for(let i=0; i< allUsers.length ; i++){
            if( (userToBeSearched===allUsers[i].name) || (userToBeSearched===allUsers[i].username) ){
                searchedUser = allUsers[i];
                isFound=true;
                break;
            }  
        }
        if(isFound){
            console.log("User found");
            this.props.UserClickedHandler(searchedUser);
            this.setState({
                searchedUser,
                searchInput:""
            });
        }  
        else{
            console.log("User not found");
            this.setState({
                searchedUser:null,
                searchInput:""
            });
        } 
        console.log(searchedUser);

    }

    render() { 
        return (
            <div className="header">
                <div className="logo">
                    <Link to="/">
                        <img src="InstaCloneColoured.png" alt=""/>
                    </Link>
                </div>

                {this.props.isAuth ? 
                <React.Fragment>
                <div className="search-box">
                    <input type="text" name="" id="" placeholder="Search" value={this.state.searchInput} onChange={ (e) => {this.inputBoxHandler(e.target.value)}}></input>
                    {
                        this.state.searchedUser ? 
                        (<Link to="/" style={{ textDecoration: 'none' }} >
                        <div className="search-icon"><i className="fas fa-search" onClick={this.onSearchClickHandler} ></i></div>
                        </Link>)
                        :
                        (<Link to="/userProfile" style={{ textDecoration: 'none' }} >
                        <div className="search-icon"><i className="fas fa-search" onClick={this.onSearchClickHandler} ></i></div>
                        </Link>)
                        
                    }
                    
                </div>
                <div className="nav-links">
                    <div>
                        <Link to="/"><i className="fas fa-home"></i></Link>
                        <Link to="/profile"><i className="far fa-user-circle"></i></Link>
                        <Link to="/notifications"><i className="fas fa-exclamation-circle"></i></Link>
                        <Link to="/setting"><i className="fas fa-cog"></i></Link>
                        <Link to="/" onClick={this.props.logout}><i className="fas fa-sign-out-alt"></i></Link>
                    </div>
                </div>
                </React.Fragment> 
                :  <div className="nav-links" ></div>
                }
            </div>
        );
    }
}
 
export default Header;