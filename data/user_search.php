<?php
  require("init.php");
  @$pno=$_REQUEST["pno"];
  @$kw=$_REQUEST["kw"];
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
  //添加一个搜索条件
  if($kw){
    $sql.=" WHERE uname LIKE '%$kw%'";
  }
  $result=mysqli_query($conn,$sql);
  $row=mysqli_fetch_row($result);
  $output["recodeCount"]=intval($row[0]);
  $output["pageCount"]=ceil($output["recodeCount"]/$output["pageSize"]);
  $start=($output["pno"]-1)*$output["pageSize"];
  $count=$output["pageSize"];
  $sql="SELECT uid,avatar,uname,user_name,gender,email FROM xz_user WHERE isdel=0";
  if($kw){
      $sql.=" AND uname LIKE '%$kw%'";
  }
  $sql.=" LIMIT $start,$count";
  $result=mysqli_query($conn,$sql);
  $rows=mysqli_fetch_all($result,MYSQLI_ASSOC);
  $output["data"]=$rows;
  echo json_encode($output);
?>