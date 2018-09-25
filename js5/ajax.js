function loadXMLDoc(){
    var username = $(".user").val();//获取用户名
    var key = $(".key").val();//获取密码
    var text1 = document.getElementById("text1");
    var text2 = document.getElementById("text2");
    console.log(username);
    console.log(key);
    //创建ajax
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function(){
        //链接成功时
        if (xhr.readyState==4 && xhr.status==200){
            var response = JSON.parse(xhr.responseText);//返回的信息内容
            console.log(response);
            //用户名为空
            if (username==''){
                text2.innerHTML='';
                text1.innerHTML = '请输入用户名';
            }
            //密码错误
            else if(response.message=='用户不存在'){
                text2.innerHTML='';
                text1.innerHTML = response.message;
                console.log(response.message);
            }
            //密码为空
            else if (key ==''){
                text1.innerHTML='';
                text2.innerHTML = '请输入密码';
            }
            //密码错误
            else if(response.message=='密码错误'){
                text1.innerHTML='';
                text2.innerHTML = response.message;
                console.log(response.message);
            }
            //登陆成功，跳转
            else if (response.message=='success'){
                location.href="http://dev.admin.carrots.ptteng.com/#/dashboard"
            }
        }
    }
    xhr.open("POST", "/carrots-admin-ajax/a/login", true);//请求地址，异步
    xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
    xhr.send("name=" + username + "&pwd=" + key);//发送数据
}