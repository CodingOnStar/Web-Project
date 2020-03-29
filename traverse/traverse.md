#querySelector()
沿着其他框架，如jQuery或Prototype, 缩短“querySelector”的名称可以很方便：

    HTMLDocument.prototype.$ = function (selector) { 
        // Only for HTML
        return this.querySelector(selector);
    };
    $(`div`);
    HTMLDocument.prototype.$$ = function (selector) { 
        // Only for HTML
        return this.querySelectorAll(selector);
    };
    $$(`div`);

#addEventListener()
* 在旧版本的DOM的规定中， addEventListener()的第三个参数是一个布尔值表示是否在捕获阶段调用事件处理程序。
* (true捕获阶段调用事件处理方法；false冒泡阶段调用事件处理方法。)
* 随着时间的推移，很明显需要更多的选项。与其在方法之中添加更多参数（传递可选值将会变得异常复杂），倒不如把第三个参数改为一个包含了各种属性的对象，这些属性的值用来被配置删除事件侦听器的过程。因为旧版本的浏览器（以及一些相对不算古老的）仍然假定第三个参数是布尔值，你需要编写一些代码来有效地处理这种情况。
//IE7和8不支持addEventListener和removeEventListener，取而代之的是attachEvent和detachEvent

#className 
* 获取或设置指定元素的class属性的值。

    let cName = elementNodeReference.className;
    elementNodeReference.className = cName;
    
* cName是一个字符串变量,表示当前元素的class属性的值,可以是由空格分隔的多个class属性值.

* element.style.backgroundColor
* 对于每个结点，都可以通过js来操作css的属性