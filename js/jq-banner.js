/**
 * Created by 吕堃鹏 on 2016/11/25 0025.
 */
function MyBanner() {
    this.$box = $('#context-box');
    this.$boxInner = $('.context-box-banner');
    this.$aDiv = null;
    this.$ul = this.$box.find('ul');
    this.$aLi = null;
    this.$leftBtn = this.$box.find('.context-banner-left');
    this.$rightBtn = this.$box.find('.context-banner-right');
    this.timer = null;
    this.data = null;
    this.n = null;
    this.init();
}
MyBanner.prototype = {
    constructor: MyBanner,
    init: function () {
        var _this = this;
        this.getData();
        this.bind();
        setTimeout(function () {
            _this.lazyImg()
        }, 500);
        clearInterval(this.timer);
        this.timer = setInterval(function () {
            _this.autoMove()
        }, 5000);
        this.overout();
        // this.handleChange();
        // this.leftRight()

    },
    getData: function () {
        var _this = this;
        $.ajax({
            type: 'get',
            url: 'json/data.txt',
            async: false,
            dataType: 'json',
            success: function (val) {
                _this.data = val;
            }
        })
    },
    bind: function () {
        var strDiv = '';
        var strLi = '';
        $.each(this.data, function ($1, $2) {
            strDiv += `<div><img src="" alt="" realImg ="${$2.imgSrc}"></div>`;
            strLi += $1 == 0 ? `<li class="on"></li>` : '<li class="off"></li>';
        });
        this.$boxInner[0].innerHTML += strDiv;
        this.$ul[0].innerHTML += strLi;
        this.$aDiv = this.$boxInner.find('div');
        this.$aLi = this.$box.find('li');
        this.$boxInner.css('width',parseInt($(this.$aDiv[0]).css('width'))*this.$aDiv.length)
    },
    lazyImg: function () {
        var _this = this;
        this.$aDiv = this.$boxInner.find('div');
        this.$aImg = this.$box.find('img');
        $.each(this.$aImg, function ($1, $2) {
            var tmp = new Image;
            tmp.src = $2.getAttribute('realImg');
            tmp.onload = function () {
                $2.src = this.src;
                tmp = null;
                var $div1 = _this.$aDiv.eq(0);
                $div1.css('zIndex', 1).fadeIn();
            };
            tmp.onerror = function () {
                tmp = null;
            }
        })
    },
    autoMove: function () {
        if (this.n >= this.$aDiv.length-1) {
            this.n = -1;
        }
        this.n++;
        this.$boxInner.animate({
           left:-this.n*parseInt(this.$aDiv.css('width'))+'px',
        },500);
        this.binnerTip();
    },
    binnerTip: function () {
        this.$aLi = this.$box.find('li');
        var _this = this;
        $.each(this.$aLi, function ($1, $2) {
            $2.className = $1 == _this.n ? 'on' : 'off';
        })
    },
    overout: function () {
        var _this = this;
        this.$box[0].onmouseover = function () {
            _this.$leftBtn[0].style.display = _this.$rightBtn[0].style.display = 'block';
            clearInterval(_this.timer)
        };
        this.$box[0].onmouseout = function () {
            _this.timer = setInterval(function () {
                _this.autoMove();
            }, 5000);
            _this.$leftBtn[0].style.display = _this.$rightBtn[0].style.display = '';
        }
    },
    handleChange: function () {
        var _this = this;
        this.$aLi = this.$box.find('li');
        this.$aLi.click(function () {
            _this.n = $(this).index();
            _this.setBanner();
        })
    },
    leftRight: function () {
        var _this = this;
        this.$rightBtn.click(function () {
            _this.autoMove();
        });
        this.$leftBtn.click(function () {
            if (_this.n <= 0) {
                _this.n = _this.$aLi.length;
            }
            _this.n--;
            _this.setBanner();
        })
    }


};