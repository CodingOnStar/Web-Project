function fn(a) {
    console.log(a);
    var a = 123;
    console.log(a);
    function a() { };
    console.log(a);
    var b = function () { };
    console.log(b);
    function d() { };
}
/*预编译发生在函数执行的前一刻
1.创建AO对象（执行器上下文）
    先创建声明的变量之后记录函数
    AO{
        a: function(){};
        b: undefined;
        d: function(){};
    }
2.找形参，变量声明，赋值为undefined
3.传入实参
4.找函数声明
因此声明变量的变量提升，所以以上console出的结果是function、123、123、function
*/
var a = 123;
function a() { };
/*全局变量跳过2和3步，第一步建立GO（global object），暨window
未用var声明的变量，在GO中建立
*/
//引申可以看作用域链和闭包