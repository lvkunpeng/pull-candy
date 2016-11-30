/**
 * Created by 吕堃鹏 on 2016/11/28 0028.
 */
//构建轮播图
var banner = new MyBanner();
//专辑精选界面
(function () {
    var data = null;
    $.ajax({
        type: 'get',
        url: 'json/data-special.txt',
        async: false,
        dataType: 'json',
        success: function (val) {
            data = val;
            console.log('专辑精选数据接收成功');
            //一定要注意造假数据的格式！！！！！一个空格都不能多，可以通过此网站在线监测你的假数据是否符合规则
            //http://www.bejson.com/
        },
        error: function (val) {
            if (val.responseText != '') {
                console.log('专辑精选数据获取失败');
                data = val.responseText;
            }
            // data = val.responseText.split(",");
            //此处的ajax数据如果不进入success中具体解释参见http://blog.csdn.net/haiqiao_2010/article/details/12653555
        }
    });
    // console.log(eval("("+data+")"))
    var oUl = $('#context-b').find('ul');
    var aLi = oUl.find('li');
    $.each(aLi, function ($1, $2) {
        aLi.eq($1).html(`<img src="${data[$1].imgSrc}" alt=""><a href="${data[$1].url}" target="_blank" class="img-hyperlink"></a><a href="${data[$1].url}" target="_blank" class="text-hyperlink">${data[$1].line1}</a><p>${data[$1].line2}</p><span>${data[$1].line3}</span>`)
    })
})();