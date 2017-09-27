<?php
  require("init.php");
  @$pno=$_REQUEST["pno"];
  if(!$pno){
    $pno=1;
  }else{
    $pno=intval($pno);
  }
  $pageSize=8;
  $output=[
    "recodeCount"=>0,
    "pageCount"=>0,
    "pno"=>$pno,
    "data"=>null,
    "pageSize"=>$pageSize
  ];
  $sql="SELECT COUNT(*) FROM xz_user";
  $result=mysqli_query($conn,$sql);
  $row=mysqli_fetch_row($result);
  $output["recodeCount"]=intval($row[0]);
  $output["pageCount"]=ceil($output["recodeCount"]/$output["pageSize"]);
  $start=($output["pno"]-1)*$output["pageSize"];
  $count=$output["pageSize"];
  $sql="SELECT uid,avatar,uname,user_name,gender,email FROM xz_user LIMIT $start,$count";
  $result=mysqli_query($conn,$sql);
  $rows=mysqli_fetch_all($result,MYSQLI_ASSOC);
  $output["data"]=$rows;
  echo json_encode($output);
?>