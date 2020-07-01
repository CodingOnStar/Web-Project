
function printNumbers(from, to) {
    function func() {
        console.log(from)
        if (from == to) {
            clearInterval(timeID);
        }
        from++
    };
    func();
    let timeID = setInterval(func, 1000);
}

/*
function printNumbers(from, to) {
    var timeID = setTimeout(function func() {
        console.log(from);
        if (from < to) {
            setTimeout(func, 1000);
        }
        from++;
    }, 1000);
}
*/
printNumbers(10, 15)
