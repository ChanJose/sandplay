$(function() {
    // 用户名
    $("#user-name").focus(function() {
        $("#account-error").parent().css("visibility", "visible");
        $("#account-error").text("只支持字母、数字和中文的组合，4-20个字符");
        $(".account-icon").css("background", "url(imgs/tip1.png)");
    });

    $("#user-name").blur(function() {
        $("#account-error").parent().css("visibility", "hidden");
        $("#account-error").text("");

        var username = $("#user-name").val();
        if(username.length < 4 || username.length > 20) {
            $(".account-icon").css("background", "url(imgs/error2.png)");
            $("#account-error").text("长度只能在4-20个字符之间");
            $("#account-error").parent().css("visibility", "visible");
        } 
    });

    // 侦听用户名的值变化情况

    // 设置密码
    $("#set-pwd").focus(function() {
        $("#rePwd-error").parent().css("visibility", "hidden");
        $("#setPwd-error").parent().css("visibility", "visible");
        $(".setPwd-icon").css("background", "url(imgs/tip1.png)");
        $("#setPwd-error").text("建议使用字母、数字和符号两种及以上的组合，6-20个字符");
    });

    $("#set-pwd").blur(function() {
        $("#setPwd-error").parent().css("visibility", "hidden");
        $("#setPwd-error").text("");

        var password = $("#set-pwd").val();
        if(password.length < 6 || password.length > 20) {
            $("#setPwd-error").parent().css("visibility", "visible");
            $(".setPwd-icon").css("background", "url(imgs/error2.png)");
            $("#setPwd-error").text("长度只能在6-20个字符之间");
        } 

        if($("#set-pwd").val() != $("#rePwd").val()) {
            $(".rePwd-icon").css("background", "url(imgs/error2.png)");
            $("#rePwd-error").text("两次密码输入不一致");
            $("#rePwd-error").parent().css("visibility", "visible");
        }
    });

    // 确认密码
    $("#rePwd").focus(function() {
        $("#rePwd-error").parent().css("visibility", "visible");
        $(".rePwd-icon").css("background", "url(imgs/tip1.png)");
        $("#rePwd-error").text("请再次输入密码");
    });

    $("#rePwd").blur(function() {
        $("#rePwd-error").parent().css("visibility", "hidden");
        $("#rePwd-error").text("");
        
        if($("#set-pwd").val() != $("#rePwd").val()) {
            $(".rePwd-icon").css("background", "url(imgs/error2.png)");
            $("#rePwd-error").text("两次密码输入不一致");
            $("#rePwd-error").parent().css("visibility", "visible");
        }
        // else {
        //     // 点击submit提交表单
        //     $("#loginForm").submit(function(e){
        //         e.preventDefault(); // 阻止提交按钮的默认事件
        
        //         var username = $("#user-name").val(); // 用户名
        //         var password = $("#set-pwd").val(); // 密码
                
        //         // 将用户名和密码传到服务端检验是否存在或匹配
        //         $.ajax({
        //             // 请求发送方式
        //             type: "post",
        //             // 验证文件
        //             url: "check.php",
        //             // 用户输入的帐号密码
        //             data: {"username": username, "password": password},
        //             // 异步，不写默认为True
        //             async: true,
        //             //请求成功后的回调
        //             // 假设返回的data： 
        //             // 0：注册失败，用户已存在  1: 注册成功，跳转登录页面 
        //             success: function(data){
        //                 if (data == 1){
        //                     alert('注册成功')
        //                 } else if(data == 0){
        //                     alert("注册失败，用户名已存在");
        //                 }
        //             },
        //             error: function(){
        //                 alert('服务端异常');
        //             }
        //         }); // ajax结束
        //    }); // submit结束
        // } // else 结束
    }); // blur结束

    // 当点击input按钮submit
    $(".register-btn").click(function(){
        if($("#user-name").val() == "") { // 用户名为空
            $("#account-error").parent().css("visibility", "visible");
            $("#account-error").text("请输入用户名");
        } else if($("#set-pwd").val() == "") { // 密码为空
            $("#setPwd-error").parent().css("visibility", "visible");
            $("#setPwd-error").text("请输入密码");
        } else if($("#set-pwd").val() != $("#rePwd").val()) {
            $(".rePwd-icon").css("background", "url(imgs/error2.png)");
            $("#rePwd-error").text("两次密码输入不一致");
            $("#rePwd-error").parent().css("visibility", "visible");
        }
    });
}); // 就绪函数结束