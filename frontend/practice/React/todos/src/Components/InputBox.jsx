import React, { Component } from 'react';

class InputBox extends Component {
    state = { 
        todo: ""
     }
    
    addTodoHandler =() =>{
        console.log(this.state.todo);
        this.props.addTodo(this.state.todo);
        this.setState({
            todo:""
        })
    }

    onChangeHandler = (e) =>{
        let value = e.target.value;
        this.setState({
            todo:value
        })
    }


    render() { 
        let addTodo = this.addTodo;
        return (<React.Fragment>
            <div className="input-group mb-3 mt-3 container">
            <input type="text" className="form-control" placeholder="Enter TODO" value={this.state.todo} onChange={(e)=>{this.onChangeHandler(e)}} ></input>
            <button className="btn btn-outline-secondary" onClick={this.addTodoHandler}>ADD</button>
            </div>
        </React.Fragment>);
    }
}
 

export default InputBox;