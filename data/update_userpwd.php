<?php
  require("init.php");
  @$uid=$_REQUEST["uid"];
  @$opwd=$_REQUEST["old_pwd"];
  @$npwd=$_REQUEST["new_pwd"];
  $sql="SELECT * FROM xz_user WHERE uid=$uid AND upwd=$opwd";
  $result=mysqli_query($conn,$sql);
  $row=mysqli_fetch_row($result);
  if($row==null){
    echo '{"code":-1,"msg":"旧密码不正确"}';
    exit;
  }else{
    $sql="UPDATE xz_user SET upwd=$npwd WHERE uid=$uid";
    $result=mysqli_query($conn,$sql);
    if($result){
      echo '{"code":1,"msg":"更新成功"}';
    }
  }
?>