let names = ["Jim" , "Pam" , "Dwight" , "Michael" , "Kevin" ];

//sfc => stateless functional component
function Hello(props){
    //console.log(props);
    //to write JS code in JSX code => user {}
    //to add a class wee use => className
    //for id we use => id
    return <h1 className="h1-hello">Hello from {props.name} !!</h1> //JSX code => where we are able to write html code in java script

}

function BigHello(){
    return <React.Fragment>
        {names.map(function(name){
            return <Hello name={name}></Hello>
        })}
        </React.Fragment>
}

//to render multiple Hello components


//what to render, where to render
ReactDOM.render(<BigHello/> , document.getElementById("root"));