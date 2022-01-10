// in a normal function call this points to a global object
// if the function call is made on a browser then he default window object would be pointed by this

// "use strict"; //to disable global object

//name = "Steve"; // if let is not written with the declatation this entity ecomes a part of global object



//in method call thise points to calling object

let obj = {
    name:"Steve",
    sayHii: function(){
        console.log(this);
        console.log("Inside sayHii function!!!")
        
        /*
        function callMe(){
            console.log("inside call me");
            console.log(this);
        }
        //callMe(); //function call

        //bind method => makes this point to the object in method call
        let newCallMe = callMe.bind(obj);
        newCallMe();
        */


        //Arrow function
        //we use them so that we do not need to use the bind method
        // the arrow function do not have their own this i.e. they do not point to global variable
        //

        callMe = () => {
            console.log("inside call me");
            console.log(this);
        }
        callMe(); // this will be pointing to obj
    }
}

obj.sayHii(); //here this points to obj //method call

function fun(){
    console.log(this);
    console.log("inside Fun!!!");
}

//fun(); //here this points to a global object



fun2 = () => {
    console.log("I am fun2");
    console.log(this); //empty object
}
fun2();