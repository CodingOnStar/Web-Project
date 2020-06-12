var citySelectObj = {
    province: ["北京市", "广东省", "山东省", "江苏省", "河南省", "上海市", "河北省", "浙江", "陕西省", "湖南省", "重庆市", "福建省"],
    city: {
        "0": [["朝阳区"], ["海淀区"], ["通州区"], ["房山区"], ["丰台区"], ["昌平区"], ["大兴区"], ["顺义区"], ["西城区"], ["延庆县"], ["石景山区"], ["宣武区"], ["怀柔区"], ["崇文区"], ["密云县"], ["东城区"], ["平谷区"], ["门头沟区"]],
        "1": [["东莞市"], ["广州市"], ["中山市"], ["深圳市"], ["惠州市"], ["江门市"], ["珠海市"], ["汕头市"], ["佛山市"], ["湛江市"], ["河源市"], ["肇庆市"], ["清远市"], ["潮州市"], ["韶关市"], ["揭阳市"], ["阳江市"], ["梅州市"], ["云浮市"], ["茂名市"], ["汕尾市"]],
        "2": [["济南市"], ["青岛市"], ["临沂市"], ["济宁市"], ["菏泽市"], ["烟台市"], ["淄博市"], ["泰安市"], ["潍坊市"], ["日照市"], ["威海市"], ["滨州市"], ["东营市"], ["聊城市"], ["德州市"], ["莱芜市"], ["枣庄市"]],
        "3": [["苏州市"], ["徐州市"], ["盐城市"], ["无锡市"], ["南京市"], ["南通市"], ["连云港市"], ["常州市"], ["镇江市"], ["扬州市"], ["淮安市"], ["泰州市"], ["宿迁市"]],
        "4": [["郑州市"], ["南阳市"], ["新乡市"], ["安阳市"], ["洛阳市"], ["信阳市"], ["平顶山市"], ["周口市"], ["商丘市"], ["开封市"], ["焦作市"], ["驻马店市"], ["濮阳市"], ["三门峡市"], ["漯河市"], ["许昌市"], ["鹤壁市"], ["济源市"]],
        "5": [["松江区"], ["宝山区"], ["金山区"], ["嘉定区"], ["南汇区"], ["青浦区"], ["浦东新区"], ["奉贤区"], ["徐汇区"], ["静安区"], ["闵行区"], ["黄浦区"], ["杨浦区"], ["虹口区"], ["普陀区"], ["闸北区"], ["长宁区"], ["崇明区"], ["卢湾区"]],
        "6": [["石家庄市"], ["唐山市"], ["保定市"], ["邯郸市"], ["邢台市"], ["河北区"], ["沧州市"], ["秦皇岛市"], ["张家口市"], ["衡水市"], ["廊坊市"], ["承德市"]],
        "7": [["温州市"], ["宁波市"], ["杭州市"], ["台州市"], ["嘉兴市"], ["金华市"], ["湖州市"], ["绍兴市"], ["舟山市"], ["丽水市"], ["衢州市"]],
        "8": [["西安市"], ["咸阳市"], ["宝鸡市"], ["汉中市"], ["渭南市"], ["安康市"], ["榆林市"], ["商洛市"], ["延安市"], ["铜川市"]],
        "9": [["长沙市"], ["邵阳市"], ["常德市"], ["衡阳市"], ["株洲市"], ["湘潭市"], ["永州市"], ["岳阳市"], ["怀安市"], ["郴州市"], ["娄底市"], ["益阳市"], ["张家界市"], ["湘西州"]],
        "10": [["江北区"], ["渝北区"], ["沙坪坝区"], ["九龙坡区"], ["万州区"], ["永川区"], ["南岸区"], ["酉阳县"], ["北碚区"], ["涪陵区"], ["秀山县"], ["巴南区"], ["渝中区"], ["石柱县"], ["忠县"], ["合川市"], ["大渡口区"], ["开县"], ["长寿区"], ["荣昌县"], ["云阳县"], ["梁平县"], ["潼南县"], ["江津市"], ["彭水县"], ["綦江县"], ["璧山县"], ["黔江区"], ["大足县"], ["巫山县"], ["巫溪县"], ["垫江县"], ["丰都县"], ["武隆县"], ["万盛区"], ["铜梁县"], ["南川市"], ["奉节县"], ["双桥区"], ["城口县"]],
        "11": [["漳州市"], ["厦门市"], ["泉州市"], ["福州市"], ["莆田市"], ["宁德市"], ["三明市"], ["南平市"], ["龙岩市"]]
    },
    fontPro: document.getElementsByTagName('span')[0],
    showDown: document.getElementsByClassName('dragDown')[0],
    ishow: document.getElementsByTagName('i')[0],
    provinceNode: document.getElementsByClassName("province")[0],
    cityNode: document.getElementsByClassName("districts")[0],
    li_province: null,
    li_city: null,
    bool: true,


    init: function () {
        this.showCity();
        this.showProvince();
    },
    showCity: function () {
        this.provinceNode.innerHTML = "";
        var len = this.province.length;
        var proStr = "";
        for (let i = 0; i < len; i++) {
            proStr += "<li>" + this.province[i] + "</li >";
        }
        this.provinceNode.innerHTML = proStr;
        this.li_province = this.provinceNode.getElementsByTagName("li");

        for (let i = 0; i < len; i++) {
            this.li_province[i].index = i;
            this.li_province[i].addEventListener("mouseenter", this.cityMouseEnter.bind(this));
        }
    },
    cityMouseEnter: function (e) {
        for (let i = 0; i < this.province.length; i++) {
            this.li_province[i].style.backgroundColor = "#fff"
        }
        e.target.style.backgroundColor = "#f1f3f6";

        var citys = this.city[e.target.index];//这里的this不指向obj,要再上面bind.(bind返回新函数，但不执行，call和apply都会执行)
        var len = citys.length;
        var cityStr = "";
        for (let i = 0; i < len; i++) {
            cityStr += "<li>" + citys[i] + "</li >";
        }
        this.cityNode.innerHTML = cityStr;
        this.li_city = this.cityNode.getElementsByTagName('li');
        for (let i = 0; i < len; i++) {
            this.li_city[i].addEventListener('click', this.cityClick.bind(this));
        }
    },
    cityClick: function (e) {
        var str = e.target.innerHTML;
        this.fontPro.innerHTML = str;
        this.showDown.style.display = 'none';
    },
    showProvince: function () {
        var that = this;
        this.fontPro.onclick = function () {
            if (that.bool) {
                that.bool = false;
                that.showDown.style.display = 'block';
            }
            else {
                that.bool = true;
                this.showDown.style.display = 'none';
            }
        }
    }
}
citySelectObj.init()