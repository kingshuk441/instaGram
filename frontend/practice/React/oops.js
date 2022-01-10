// functions inside a class are known as methods
// variables inside a class are known as properties


// "this" keyword => 
//1.this is defined on runtime
//2. this cannot be changed
//3. this refers to the calling object
//4. 


class SuperCar{
    constructor(turbo){
        this.turbo = turbo;
    }
}


class Car extends SuperCar{
    constructor(name, price, transmission , turbo){
        super(turbo); // using super keyword =>extended class ka constructor fire hota hai 
        this.name = name;
        this.price = price;
        this.transmission = transmission;
    }
    
    getDetails(){
        console.log(this.name + this.price + this.transmission);
        console.log(this);
    }
}

let swift = new Car("swift" , "7L" , "Superjet");
//console.log(swift);
swift.getDetails();

let i20 = new Car("i20" , "8L" , "Automatic");
i20.getDetails();

let mustang = new Car("mustang" , "80L" , "Automatic" , "SuperJet");
mustang.getDetails();
