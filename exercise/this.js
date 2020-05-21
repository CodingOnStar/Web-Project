//关于this
//this指向调用其的函数
Person.prototype = {
    name: "a",
    sayName: function () {
        console.log(this.name);
        return "finish"
    }
}
function Person() {
    this.name = "b";
}

var person = new Person();
console.log(person.sayName());
console.log(Person.prototype.sayName());