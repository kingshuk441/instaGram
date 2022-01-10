// imrc => import React, { Component } from 'react';
import React, { Component } from 'react';

// cc => class based component
class Todos extends Component {
    
    //constructor missing 
    //super missing 
    // this can be omitted as the code understands it has to call constructor and super
    // this is possible only because of JSX code

    state = {  };

    render() { 
        let todos = this.props.todos;
        let deleteTodo = this.props.deleteTodo;
        return ( 
        <div className="todos container">
            { todos.map( todoObj =>{
                return <div className="input-group mb-3" key={todoObj.id}>
                <input type="text" className="form-control" value={todoObj.todo} disabled></input>
                <button className="btn btn-danger" onClick = { ()=>{deleteTodo(todoObj.id)}} > Delete </button>
              </div>
            })}
        </div> );
    }
}
 
export default Todos;