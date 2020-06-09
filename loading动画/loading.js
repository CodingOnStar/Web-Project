var per = 0;
var timer;
timer = setInterval(function () {
    var bar = document.getElementsByClassName('bar')[0];
    bar.style.width = per + '%';
    per += 1;
    if (per > 100) {
        var page = document.getElementsByClassName('pageLoading')[0];
        page.className = 'pageLoading complete';
        setTimeout(() => {
            var monsterText = document.getElementsByClassName('monsterText')[0];
            monsterText.innerHTML = '<h2>We are Monster</h2>';
        }, 3000);
        clearInterval(timer);
    }
}, 30)