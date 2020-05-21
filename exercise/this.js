//关于this
//this指向调用其的函数
/*
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
*/
var name = "222";
var a = {
    name: "111",
    say: function () {
        console.log(this.name);
    }
}
var fun = a.say;
fun();
a.say();
var b = {
    name: "333",
    say: function (fun) {
        fun();
    }
}
b.say(a.say);
b.say = a.say;
b.say();