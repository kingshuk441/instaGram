import React, { Component } from 'react';
import InputBox from './Components/InputBox';
import Todos from './Components/Todos';


class App extends Component {
  state = { 
    todos: [
      /*
      {id:"1", todo: "Learn HTML"},
      {id:"2", todo: "Learn JS"},
      {id:"3", todo: "Learn React"},
      {id:"4", todo: "Learn NodeJS"},
      */
  ],
   };

    deleteTodo = (id) => {
      let filteredTodos = this.state.todos.filter(todoObj =>{
        return todoObj.id!==id;
      })
      this.setState({
        todos:filteredTodos
      })
      //this will trigger render function once again
    }

    addTodo = (todo) =>{
      this.setState({
        todos : [...this.state.todos , {id:this.state.todos.length+1 , todo:todo}]
        // the tripple dot (...) before this appends the earlier todo list separated with coma
        /* eg 
        todos: [
        {id:"1", todo: "Learn HTML"},
        {id:"2", todo: "Learn JS"},
        {id:"3", todo: "Learn React"},
        {id:"4", todo: "Learn NodeJS"},
        {id: this.state.todos.length+1 , todo: todo}
          ]
        */

      })
    }

  render() { 
    return ( 
      <div className="Container">
        <InputBox addTodo = {this.addTodo}/>
        <Todos todos={this.state.todos} deleteTodo = {this.deleteTodo}/>
      </div>
     );
  }
}
 
export default App;