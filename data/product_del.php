<?php
  require("init.php");
  @$lid=$_REQUEST["lid"];
  $sql="UPDATE xz_laptop SET isdel=1 WHERE lid=$lid";
  $result=mysqli_query($conn,$sql);
  if($result==true){
    echo '{"code":1,"msg":"删除成功"}';
  }else{
    echo '{"code":-1,"msg":"删除失败"}';
  }
?>