<?php
  require("init.php");
  @$uid=$_REQUEST["uid"];
  $sql="UPDATE xz_user SET isdel=1 WHERE uid=$uid";
  $result=mysqli_query($conn,$sql);
  if($result==true){
    echo '{"code":1,"msg":"删除成功"}';
  }else{
    echo '{"code":-1,"msg":"删除失败"}';
  }
?>