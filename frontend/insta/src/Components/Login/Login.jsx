import React, { Component } from 'react';
import "./Login.css";

class Login extends Component {
    state = {  }
    render() { 
        return ( 
        <div className="login">
            <div className="login-display">
                <img src="./instaCloneDisplayPic.png" alt=""/>
            </div>
            <div className="login-options">
                <div className="login-app-logo">
                    <img src="./logo.png" alt=""/>
                </div>
                <div className="login-app-name">
                    <img src="./InstaClone.png" alt=""/>
                </div>
                <div className="login-user-greetings">
                    <div className="greeting">Hello there user!</div>
                    <div className="greeting">We are glad to have you here!</div>
                </div>
                <div className="login-option-info">Login with GOOGLE+</div>
                <div className="login-btn" onClick={this.props.login} >LOGIN</div>
            </div>
            {/* <button onClick={this.props.login}>LOGIN WITH GOOGLE+</button> */}
        </div> 
        );
    }
}
 
export default Login;