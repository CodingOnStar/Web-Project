class Slider {
    constructor(id) {
        this.box = document.querySelector(id);
        this.picBox = this.box.querySelector('ul')
        this.indexBox = this.box.querySelector('.index-box');
        this.index = 1;
        this.changeTimer = null; //自动切换的计时器
        this.animated = false;//当前是否在执行动画
        this.sliders = this.picBox.children.length;
        this.sliderWidth = this.box.clientWidth

        this.init();
    }
    init() {
        this.initPoint();
        this.copyPic();
        this.autoChange();
        this.leftRight();
    }
    initPoint() {
        const num = this.picBox.children.length;
        let fragment = document.createDocumentFragment();
        for (let i = 0; i < num; i++) {
            let li = document.createElement('li');
            li.setAttribute('data-index', i + 1);
            fragment.appendChild(li);
            if (i === 0) li.className = 'active';    //初始化的时候，第一个小圆点要active
        }
        this.indexBox.children[0].style.width = num * 10 * 2 + 'px';
        this.indexBox.children[0].appendChild(fragment);

        this.indexBox.children[0].addEventListener('click', (e) => {
            let pointIndex = e.target.getAttribute('data-index');
            let offset = (pointIndex - this.index) * this.box.clientWidth
            this.index = pointIndex
            this.move(offset)

        })
    }
    //辅助图方案
    copyPic() {
        const first = this.picBox.firstElementChild.cloneNode(true);
        const last = this.picBox.lastElementChild.cloneNode(true);
        this.picBox.appendChild(first);
        this.picBox.insertBefore(last, this.picBox.firstElementChild)

        this.picBox.style.width = this.box.clientWidth * this.picBox.children.length + 'px';
        this.picBox.style.left = -1 * this.box.clientWidth + 'px';
    }
    move(offset) {
        this.animate(offset)
        const num = this.indexBox.children[0].children.length;
        for (let i = 0; i < num; i++) {
            this.indexBox.children[0].children[i].className = ""
        }
        this.indexBox.children[0].children[this.index - 1].className = "active"

    }
    animate(offset) {
        const time = 1000;
        const rate = 1000;
        let speed = offset / (time / rate);
        let goal = parseFloat(this.picBox.style.left) - offset;
        let duration = Math.abs(parseFloat(this.picBox.style.left)) - Math.abs(goal)
        this.animated = true;
        let animate = setInterval(() => {
            if (parseFloat(this.picBox.style.left) == goal || Math.abs(duration) < Math.abs(speed)) {
                this.picBox.style.left = goal;
                clearInterval(animate);
                this.animated = false;
                //到头尾时，跳转
                if (parseFloat(this.picBox.style.left) == 0) {
                    this.picBox.style.left = -this.sliders * this.sliderWidth + 'px';
                } else if (parseFloat(this.picBox.style.left) == -(this.sliders + 1) * this.sliderWidth) {
                    this.picBox.style.left = -this.sliderWidth + 'px';
                }

            } else {
                this.picBox.style.left = parseFloat(this.picBox.style.left) - speed + 'px';
            }
        }, 1)

    }

    leftRight() {
        this.box.querySelector('.left-box').addEventListener('click', () => {
            if (this.animated) {
                return
            }
            if (this.index - 1 < 1) {
                this.index = this.sliders;
            } else {
                this.index--
            }
            clearInterval(this.changeTimer)
            this.move(-this.sliderWidth);
            this.autoChange();

        });
        this.box.querySelector('.right-box').addEventListener('click', () => {
            if (this.animated) {
                return
            }
            if (this.index + 1 > this.sliders) {
                this.index = 1
            } else {
                this.index++
            }
            clearInterval(this.changeTimer)
            this.move(this.sliderWidth);
            this.autoChange();
        })
    }
    autoChange() {
        this.changeTimer = setInterval(() => {
            if (this.index === this.sliders) {
                this.index = 1;
            } else {
                this.index++;
            }
            this.move(this.sliderWidth);
        }, 2000);
    }

}