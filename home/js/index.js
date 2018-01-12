$(function(){
    // 通过js实现右边菜单栏的高度
    $("#main .menu-bar").height($(document).height() - $("#header").outerHeight()); 

    var currentObj; // 保存当前li对象
    var disX = 0; // 鼠标指针到菜单左边的距离
    var disY = 0; // 鼠标指针到菜单顶部的距离
    var startX; // 按下鼠标时的left
    var startY; // 按下鼠标时的top

    $(".menu-li").mousedown(function(ev) {
        var oEvent = ev || event; // 兼容
        oEvent.preventDefault(); // 阻止冒泡
        // 将当前点击元素设置为绝对定位
        $(this).addClass("main-li");
        currentObj = $(this);

        // 获得元素按下鼠标时的坐标
        var startX = currentObj.offset().left;
        var startY = currentObj.offset().top;
        // console.log("按下鼠标时的坐标：" + startX + "," + startY);

        // 判断初始位置是在菜单栏还是在左边放置图片处
        // isflag: false 表示开始位置不在菜单栏， true： 表示开始位置在菜单栏
        var isFlag = true;
        if(startX < $("#main").width() - $("#main .menu-bar").outerWidth() - $(currentObj).width()) {
            isFlag = false;
        } 

        disX = oEvent.clientX - startX; // 获得鼠标到菜单左边的距离
        disY = oEvent.clientY - startY; // 获得鼠标到菜单顶部的距离
        // console.log("按下鼠标时距离div左边和顶部分别为：" + disX + "," + disY);

        $(document).mousemove(function(ev) { // 用#main而没有用.menu,防止鼠标移动太快脱离menu
            var oEvent = ev || event;
            oEvent.preventDefault(); // 阻止冒泡

            var l = oEvent.clientX - disX; // 计算得到此时menu的left
            var t = oEvent.clientY - disY; // 计算得到此时menu的top
            
            
            if(l < 0) { // 让div从左边出不去
                l = 0;
            } 
            // else if(l > $("#main").width() - $(currentObj).width()) {
            //     // div的左边的坐标位置 = 父元素的宽减去div的宽度
            //     l = $("#main").width() - $(currentObj).width();
            // }
            if(isFlag) { // isFlag为true
                if(l > $("#main").width() - $(currentObj).width()) {
                    l = $("#main").width() - $(currentObj).width();
                }
            } else { // 为false,不能移入菜单栏
                if(l > $("#main").width() - $(currentObj).width() - $(".menu-bar").outerWidth()) {
                    l = $("#main").width() - $(currentObj).width() - $(".menu-bar").outerWidth();
                }
            }
            if(t < 0) { // 顶部限制不能出去
                t = 0;
            }
            else if(t > $(window).height() - $(currentObj).outerHeight() - $("#header").outerHeight()) {
                // div的顶部的坐标位置 = 父元素的height减去div的height
                t = $(window).height() - $(currentObj).outerHeight() - $("#header").outerHeight();
            }
            $(currentObj).css({"left": l + "px", "top": t + "px"});
        });

        $(document).mouseup(function(ev) {
            var oEvent = ev || event; 
            $(document).off('mousemove'); //移除鼠标移动事件
            $(document).off('mouseup');

            var nowLeft = oEvent.clientX - disX; // 计算松开鼠标时menu的left
            var nowTop = oEvent.clientY - disY; // 计算松开鼠标时menu的top

            // 保存移动的li此时的left, top, outerWidth, outerHeight
            var currentLi = {
                top: nowTop,
                left: nowLeft,
                width: currentObj.outerWidth(),
                height: currentObj.outerHeight()
            }

            $(".main-li").each(function() {
                if(!$(this).is(currentObj)) { // 不是自身
                    // console.log("我进来了噢");
                    var oLi = {
                        top: $(this).offset().top - $("#header").outerHeight(),
                        left: $(this).offset().left,
                        width: $(this).outerWidth(),
                        height: $(this).outerHeight()
                    }
                    console.log(currentLi);
                    console.log(oLi);

                    if(isContain(currentLi, oLi)) { // 如果覆盖，则元素返回原位置
                        // console.log("覆盖了！");
                        currentObj.css({"left": startX + "px", "top": startY - $("#header").outerHeight() + "px"});
                    }
                }
            });

            // 判断该li是否和已放置的li重叠
            function isContain(currentLi, oLi) {
                var lh = Math.max(currentLi.top + currentLi.height - oLi.top, oLi.top + oLi.height - currentLi.top);
                var lw = Math.max(currentLi.left + currentLi.width - oLi.left, oLi.left + oLi.width - currentLi.left);
                console.log(lh + ":" + lw);
                if (lh < (currentLi.height + oLi.height) && lw < (currentLi.width + oLi.width)) { // 覆盖
                    return true;
                }
                return false;
            }
        });

        return false; // 解决移动默认重影问题
    });

    
    $(".cancel-icon").click(function() {
        $(this).parent(".menu-li").removeClass("main-li");
    });
});
