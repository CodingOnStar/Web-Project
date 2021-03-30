Object.getPrototypeOf(Function.prototype) === Object.prototype//true
//等价于
Function.prototype.__proto__ === Object.prototype
/* 说它们是函数，是因为他们都是通过“内置函数工厂”派生出来的，因而具备函数的特性。
说他们是对象。是因为他们都是通过”根源“对象派生出来，因此具备对象的特征。
Function.prototype指向“内置函数”。而Object.prototype指向“根源对象”。
因而new Function会产生一个匿名函数，而new Object产生一个plain object。

function Person (name, age) {
    this.age = age;
    this.name = name;
}
Person.prototype.sayName = function () {
    console.log(this.name);
}
var person1 = new Person('zhangsan', 25);
 */
var bar = {}
console.log(bar.prototype)


/* 首先明确一点，Object 和 Function 都是构造函数，和 object，function 不是一个东西。另外：instanceof 判断的依据是你给的构造函数的 prototype 是不是在对象的原型链上。
通过 { } 字面量创建对象，是直接返回对象，不是返回的构造函数，返回的对象的原型就是 Object.prototype，显然，Function.prototype 不在该对象的原型链上，所以执行结果如你所展示的：
    ({}) instanceof Object // true
    ({}) instanceof Function // false
接着，既然 Object 和 Function 都是构造函数，所以你用 typeof 的话，都返回 function。既然是函数，那么这两个的原型指向 Function.prototype 也没毛病，接着 Function.prototype 的原型是指向 Object.prototype 的，所以就形成了如下的一个原型链：
Object-- -> Function.prototype-- -> Object.prototype-- -> null
Object.__proto__ === Function.prototype           // true
Function.prototype.__proto__ === Object.prototype // true
所以执行结果如你所展示的：
Object instanceof Function  // true
Function instanceof Object  // true
更别说你那一个函数来检测，那当然也是 true：
    (function () { }) instanceof Object   // true
    (function () { }) instanceof Function // true
至于 prototype，刚刚上面的小实验也解释了。另外是构造函数，那么 constructor 的问题，也解决了。 */
let value = 5;
function getValue () {
    return value++;
}
function add (first, second = getValue()) {
    return first + second;
}
console.log(add(1, 1))
console.log(add(1))
console.log(add(1))