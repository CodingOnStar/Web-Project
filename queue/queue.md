### 数组中的迭代方法
共5个迭代方法：
1.every()：对数组中每一项运行给定函数，该函数每一项都返回true，则返回true
2.filter()：对数组中每一项运行给定函数，返回该函数会返回true的项组成的数组
3.forEach()：对数组中每一项运行给定函数，这个方法没有返回值
4.map()：对数组中每一项运行给定函数，返回函数每次调用结果组成的数组
5.some()：对数组中每一项运行给定函数，该函数对任一一项返回true，则返回true
每个方法接收两个参数：1.要在每一项上运行的函数和（可选的）运行该函数的作用域对象--影响this的值
其中传入这些方法的函数有三个参数：数组项的值，该项在数组中的位置和数组对象本身

### [].forEach.call()
因为document.querySelectorAll()返回的并不是我们想当然的数组，而是NodeList，对NodeList，它里面没有.forEach方法，我们使用了这样的方法进行循环：

var divs = document.querySelectorAll('div');

[].forEach.call(divs, function(div) {
  // do whatever
  div.style.color = "red";
});

初次看到[].forEach.call()这样的代码，我觉得这种写法很有趣，为什么要这样写？为什么要用空数值引申出的方法？于是研究了一下。

[]就是个数组，而且是用不到的空数组。用来就是为了访问它的数组相关方法，比如.forEach。这是一种简写，完整的写法应该是这样：

Array.prototype.forEach.call(...);

很显然，简写更方便。

至于forEach 方法，它可以接受一个函数参数：

[1,2,3].forEach(function (num) { console.log(num); });

上面的这句代码中，我们可以访问this对象，也就是[1,2,3]，可以看出，这个this是个数组。

最后，.call是一个prototype，JavaScript函数内置的。.call使用它的第一个参数替换掉上面说的这个this，也就是你要传人的数组，其它的参数就跟forEach方法的参数一样了。

[1, 2, 3].forEach.call(["a", "b", "c"], function (item, i, arr) {
    console.log(i + ": " + item);
});
// 0: "a"
// 1: "b"
// 2: "c"

因此，[].forEach.call()是一种快速的方法访问forEach，并将空数组的this换成想要遍历的list。
