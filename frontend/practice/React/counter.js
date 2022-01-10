//class based component or stateful component
class Counter extends React.Component{  // here Counter inherits properties of React.COmponent class
    //1. Iniially constructor method call
    constructor(){
        super(); //calls the constructor of React.Component class
        this.state = {
            count:0
        }; //initialize this.state as an object
    }

    //self defined methods
    increment =()=>{
        console.log("Increment clicked!");
        //setState => render method is called again
        this.setState({
            count:this.state.count+1
        })
    }
    decrement =()=>{
        console.log("Decrement clicked!");
        this.setState({
            count:this.state.count-1
        })
    }
    reset =()=>{
        console.log("Reset clicked!");
        this.setState({
            count:0
        })
    }

    //2. render method call
    render(){
        return <React.Fragment>
            <div>
            <p>{this.state.count}</p>
            <button className="btn btn-danger" onClick={this.decrement}>-</button>
            <button className="btn btn-primary" onClick={this.increment}>+</button>            
            <button className="btn btn-warning" onClick={this.reset}>RESET</button>
            </div>
        </React.Fragment>

    }
}



ReactDOM.render( <Counter/> , document.getElementById("root"));