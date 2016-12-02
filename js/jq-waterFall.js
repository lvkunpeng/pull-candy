/**
 * Created by 吕堃鹏 on 2016/12/2 0002.
 */
function WaterFall(num, pos, nauter) {
    this.pos = pos || window;
    this.$aUl = $('#context-h').find('ul');
    this.num = num || 25;
    this.data = null;
    this.init();
}
WaterFall.prototype = {
    init: function () {
        this.getData();
        this.creatLi();
        this.posSet();
    },
    getData: function () {
        var _this = this;
        $.ajax({
            type: 'get',
            url: 'json/data-waterFall.txt',
            async: false,
            dataType: 'json',
            success: function (val) {
                _this.data = val;
                console.log('瀑布流数据接收成功');
            },
            error: function (val) {
                if (val.responseText != '') {
                    console.log('瀑布流数据获取失败');
                    _this.data = val.responseText;
                }
            }
        });
    },
    creatLi: function () {
        var n = Math.round(Math.random() * 9);
        var $oLi = `<li><img src="${this.data[n].imgSrc}" alt=""><div class="context-h-down"><div class="context-h-a">${this.data[n].line1}</div><div class="context-h-b">${this.data[n].line2}</div><div class="context-h-c"><p>${this.data[n].line3}</p></div></div></li>`;
        return $oLi;
    },
    posSet: function () {
        for (var i = 1; i < this.num; i++) {
            console.log(i)
            this.$oLi = this.creatLi();
                var ary = $.makeArray(this.$aUl);
                ary.sort(function (a, b) {
                    return a.offsetHeight - b.offsetHeight;
                });
                ary[0].innerHTML+=this.$oLi
            }
    },
};


//此处瀑布流的实现为基于jq的构造函数写法需要实现的需求有如下几点：
/*
 1、创建多个li标签，为每个li标签里面添加图片，文字，链接
 2、通过ajax获取到服务器上的图片、文字、链接资源
 3、需要考虑复用性：index页上面的：不需重复加载，只显示 25个，点击的更多直接跳转
 跳转页面上的为标准瀑布流。一行5列 ，每次加载25个，不触底。
 4、为每一个li添加是否为商品的属性，方便筛选使用。（添加可拓展的接口：eg添加其他自定义属性，方便筛选）
 5、图片上有跳转链接，鼠标移入时会显示点赞、评论、收藏按钮（触发行为建议css实现） 点击时需判断登录状态。
 未登录弹出登录\注册窗口

 备选参数：  num：一次创建的个数（默认25）    nature：[自定义属性1，自定义属性2，自定义属性3。。。]（默认无）

 */
