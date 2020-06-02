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
b.say(a.say);//a.say相当于一个函数体在b.say这个函数体中执行，执行时，b的say函数中this指向b，但此时fun()没有调用者(不是this.fun())，既参数直接执行，因此执行预编译过程，既window.name
b.say = a.say;
b.say();

var foo = '123';
function print() {
    var foo = '234';
    this.foo = '456';//this指向window,所以改变的是全局的foo
    console.log(foo);//打印的是AO中的foo
}
print();

var foo = '123';
function print() {
    this.foo = '234';
    console.log(foo);//123
}
new print()//new之后，在print中先var this=Object.create(print.prototype),this的指向改变
*/
var foo = '123';
Print.prototype.foo = '456';
function Print() {
    console.log(this.foo);//456
    this.foo = '234';
    console.log(this.foo);//234
}
new Print()