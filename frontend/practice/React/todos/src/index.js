// react logic
import React from 'react'; //same as const React = require("React");
// platform dependent code //dom logic
import ReactDOM from 'react-dom'; //same as const ReactDOM = require("react-dom");
// import App component
import App from './App'; // same as => let App = require("./App");

ReactDOM.render(  <App/> , document.getElementById('root'));

