<?php
  require("init.php");
  $aid=$_REQUEST["aid"];
  $sql="UPDATE xz_order SET isdel=1 WHERE aid=$aid";
  $result=mysqli_query($conn,$sql);
  if($result==true){
    echo '{"code":1,"msg":"删除成功"}';
  }else{
    echo '{"code":-1,"msg":"删除失败"}';
  }
?>