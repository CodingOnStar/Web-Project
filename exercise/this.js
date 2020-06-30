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
new print()//new之后，在print中先var this=Object.create(print.prototype),this的指向改变,此时this.foo是实例中的属性
而打印的foo是全局变量，并不是this.foo

var a = 5;
function Print(){
    a = 0;
    alert(a);
    alert(this.a);
    var a;
    alert(a);
}
1.Print执行时，打印的顺序为 0,5,0
2.new Print()时，也存在AO，AO为{a:0, this:{__proto: Print.prototype}}所以打印的顺序是 0,undefined,0。原因见下
*/

var foo = '123';
Print.prototype.foo = '456';
function Print() {
    console.log(this.foo);//456
    this.foo = '234';
    console.log(this.foo);//234
}
new Print()
//new之后，可以近似把this看做原型链的指向，此时new后，this为{__proto__: Print.prototype}
let worker = {
    someMethod() {
        return 1;
    },

    slow(x) {
        // 可怕的 CPU 过载任务
        alert("Called with " + x);
        return x * this.someMethod(); // (*)
    }
};

// 和之前例子中的代码相同
function cachingDecorator(func) {
    let cache = new Map();
    return function (x) {
        if (cache.has(x)) {
            return cache.get(x);
        }
        let result = func(x); // (**)//应为func.call(this,x)
        cache.set(x, result);
        return result;
    };
}

alert(worker.slow(1)); // 原始方法有效

worker.slow = cachingDecorator(worker.slow); // 现在对其进行缓存

alert(worker.slow(2));