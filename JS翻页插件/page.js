/**
 * 实现的插件：1、扩展插件：$.fn.extend(createPage)
 *           2、插件的功能:实现方法：点击+动态渲染
 * jQuery.extend(object)
 * 为jQuery类添加类方法，可以理解为添加静态方法。
 * jQuery.fn.extend(object);
 * 对jQuery.prototype进得扩展，就是为jQuery类添加“成员函数”。jQuery类的实例可以使用这个“成员函数”。
 例如：
 jQuery.extend({
min: function(a, b) { return a < b ? a : b; },
max: function(a, b) { return a > b ? a : b; }
});
jQuery.min(2,3); //  2
jQuery.max(4,5); //  5
$.fn.extend({
    alertWhileClick:function() {
          $(this).click(function(){
                 alert($(this).val());
           });
     }
});
$("#input1").alertWhileClick(); // 页面上为：
$("#input1")　为一个jQuery实例，当它调用成员方法 alertWhileClick后，便实现了扩展，每次被点击时它会先弹出目前编辑里的内容。

jQuery.extend() 的调用并不会把方法扩展到对象的实例上，引用它的方法也需要通过jQuery类来实现，如jQuery.init()，而 jQuery.fn.extend()的调用把方法扩展到了对象的prototype上，所以实例化一个jQuery对象的时候，它就具有了这些方法，这 是很重要的，在jQuery.js中到处体现这一点

jQuery.fn.extend = jQuery.prototype.extend
你可以拓展一个对象到jQuery的 prototype里去，这样的话就是插件机制了。

(function( $ ){
$.fn.tooltip = function( options ) {
};
//等价于
var tooltip = {
function(options){
}
};
$.fn.extend(tooltip) = $.prototype.extend(tooltip) = $.fn.tooltip
})( jQuery );
 *
 *
 */

(function ($) {
    function init(dom, args) {
        if (args.current <= args.pageCount) {
            fillHTML(dom, args);   //填充html内容
            bindEvents(dom, args);  //绑定点击事件

        }
    }
    //填充html内容
    function fillHTML(dom, args) {
        dom.children().remove();
        //添加并设置判断‘上一页’
        var prePage = document.createElement('button');
        prePage.type = 'button';
        prePage.innerHTML = '上一页'
        if (args.current > 1) {
            prePage.className = 'btnActiveUp';
        } else {
            prePage.disabled = 'disabled';
        }
        dom.append(prePage)

        //中间页
        if (args.pageCount <= 5) {  //当总页数小于5时，全部显示按钮
            for (let i = 0; i < args.pageCount; i++) {
                btn = document.createElement('button');
                btn.innerHTML = i + 1;
                btn.type = 'button';
                btn.className = 'midBtnActive';
                dom.append(btn)
            }
        } else {    //当总页数大于5时
            if (args.current <= 4) { //当前页小于4时，令4以后的页面为省略号...
                for (let i = 0; i < 4; i++) {
                    btn = document.createElement('button');
                    btn.innerHTML = i + 1;
                    btn.type = 'button';
                    btn.className = 'midBtnActive';
                    dom.append(btn)
                }
                var span = document.createElement('p');
                span.innerHTML = "...";
                dom.append(span);
            } else if (args.current >= args.pageCount - 3) {
                var span = document.createElement('p');
                span.innerHTML = "...";
                dom.append(span);
                for (let i = args.pageCount - 4; i < args.pageCount; i++) {
                    btn = document.createElement('button');
                    btn.innerHTML = i + 1;
                    btn.type = 'button';
                    btn.className = 'midBtnActive';
                    dom.append(btn)
                }
            } else {//其他情况，既current在中间时
                var span = document.createElement('p');
                span.innerHTML = "...";
                dom.append(span);
                for (let i = args.current - 2; i < args.current + 3; i++) {
                    btn = document.createElement('button');
                    btn.innerHTML = i;
                    btn.type = 'button';
                    btn.className = 'midBtnActive';
                    dom.append(btn)
                }
                var span = document.createElement('p');
                span.innerHTML = "...";
                dom.append(span);
            }
        }
        for (let i = 0; i < args.pageCount; i++) {
            if (i + 1 === args.current) {
                curDom = dom.find(dom.children()[i + 1].textContent === i + 1)

                dom.children()[i + 1].className = 'midBtnActive curActive';
                break;
            } else {
                continue;
            }
        }
        //下一页
        var nextPage = document.createElement('button');
        nextPage.type = 'button';
        nextPage.innerHTML = '下一页';
        if (args.current === args.pageCount) {
            nextPage.disabled = 'disabled';
        } else {
            nextPage.className = 'btnActiveDown'
        }
        dom.append(nextPage);

    }
    //绑定点击事件
    function bindEvents(dom, args) {
        dom.on('click', '.midBtnActive', function (e) {
            var cur = parseInt($(this).text());
            fillHTML(dom, { current: cur, pageCount: args.pageCount });
        })
        dom.on('click', '.btnActiveUp', function (e) {
            var cur = parseInt($('.curActive').text()) - 1;
            fillHTML(dom, { current: cur, pageCount: args.pageCount })
        })
        dom.on('click', '.btnActiveDown', function (e) {
            var cur = parseInt($('.curActive').text()) + 1;
            fillHTML(dom, { current: cur, pageCount: args.pageCount })
        })
    }


    $.fn.extend({
        createPage: function (options) {
            var args = $.extend({       //此时把options传入的参数放入args中。而extend传入两个参数时，会合并两个对象
                pageCount: 5,           //因此，当options有传入参数的时候，使用options，没有的使用第一个对象中的值
                current: 2,
                backFn: function () { },
            }, options)
            init(this, args);//初始化函数
        }

    })
})(jQuery)