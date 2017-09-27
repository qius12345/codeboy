/**
 * Created by WEB-UID-JAVA on 2017/9/19.
 */
$("#btn1").click(function(e){
    e.preventDefault();
    var u=$("#uname").val();
    var p=$("#upwd").val();
    //用户名：字母或数字 6~8
    var unameReg=/^[a-zA-Z0-9]{6,8}$/;
    //密码：字母或数字3~8
    var upwdReg=/^[a-zA-Z0-9]{3,8}$/;
    if(!unameReg.test(u)){
        alert("用户名格式不正确 字母数字6~8位");
        return;
    }
    if(!upwdReg.test(p)){
        alert("密码格式不正确 字母数字3~8位");
        return;
    }
    $.ajax({
        type:"GET",
        url:"data/login.php",
        data:{uname:u,upwd:p},
        success:function(data){
            //alert(data.code+":"+data.msg);
            if(data.code>0){
                //将用户名和用户编号保存在sessionStorage
                sessionStorage.setItem("uname",u);
                sessionStorage.setItem("uid",data.uid);
                //登录成功跳转首页index.html
               location.href="index.html";
            }
        },
        error:function(data){
            alert("您的网络有问题，请检查");
        }
    });
})
