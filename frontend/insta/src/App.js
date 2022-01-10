import React, { Component } from 'react';
import Header from './Components/Header/Header';
import Home from './Components/Home/Home';
import {BrowserRouter as Router , Redirect, Route, Switch} from 'react-router-dom';
import Profile from './Components/Profile/Profile'
import Setting from './Components/Setting/Setting';
import axios from "axios";
import Notifications from './Components/Notifications/Notifications';
import UserProfile from './Components/UserProfile/UserProfile';
import Login from './Components/Login/Login';

class App extends Component {
  state = { 
    user:null,
    isAuth:false,
    clickedUser:null
   };

  componentDidMount(){
    axios.get("/auth/checkAuth").then(obj=>{
      if(obj.data.isAuth){
        this.setState({
          isAuth:true, 
          user:obj.data.user,
        });
       }
   });
  }



  login = () =>{
    window.location="/auth/google";
    // setState : true
    //proxy defined

    //local authentication
  //   axios.get(`/api/user/${uid}`).then( obj=>{
  //     //console.log(obj);
  //     let user = obj.data.user;
  //     this.setState({
  //         user:user,
  //         isAuth:true
  //     })
  // });
  //can't uuse axios here
  };

  logout = () =>{
    // setState : false
    axios.get("/auth/destroyCookie").then(obj=>{
      this.setState({
        user:null,
        isAuth: false,
        suggestions:[],
        clickedUser:null
      });
    });
  };

  updateUser = (updatedUser) =>{
    this.setState({
      user:updatedUser
    });
  };

  UserClickedHandler=(clickedUser)=>{
    console.log("Inside user clicked handler");
    console.log(clickedUser);
    this.setState({
      clickedUser : clickedUser
    });
    // console.log(this.state.clickedUser);
}



  render() { 
    let user = this.state.user;
    let clickedUser = this.state.clickedUser;
    console.log(clickedUser);
    return ( 
      <Router>
        <div className ="app">
          <Header isAuth = {this.state.isAuth} logout = {this.logout}  UserClickedHandler = {this.UserClickedHandler} />
            <Switch>
              <Route path="/" exact>
                {this.state.isAuth ? <Home user={user} UserClickedHandler = {this.UserClickedHandler}  /> : <Login login = {this.login}/> }
              </Route>
              <Route path="/profile" exact>
                {this.state.isAuth ? <Profile user={user} profileUser={clickedUser}  UserClickedHandler = {this.UserClickedHandler}  /> : <Login login = {this.login}/> }
              </Route>
              <Route path="/setting" exact>
                {this.state.isAuth ? <Setting user={user} updateUser = {this.updateUser}/> : <Login login = {this.login}/> }
              </Route>
              <Route path="/notifications" exact>
                {this.state.isAuth ? <Notifications  user={user} profileUser={clickedUser}  UserClickedHandler = {this.UserClickedHandler} /> : <Login login = {this.login}/> }
              </Route>
              <Route path="/userProfile" exact>
                {this.state.isAuth ? <UserProfile user={user} profileUser={clickedUser}  UserClickedHandler = {this.UserClickedHandler} /> : <Login login = {this.login}/> }
              </Route>
              <Route path="*">
                <Redirect to="/"></Redirect>
              </Route>
            </Switch>
        </div> 
       </Router>
      );
  }
}
 
export default App;
