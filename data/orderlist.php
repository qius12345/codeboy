<?php
  require("init.php");
  //获取参数pno 当前页码
  @$pno=$_REQUEST["pno"];
  @$pgs=$_REQUEST["pageSize"];
  if(!$pno){
    $pno=1;
  }else{
    $pno=intval($pno);//将字符串数据转换为整数
  }
  if(!$pgs){
      $pgs=5;
    }else{
      $pgs=intval($pgs);//将字符串数据转换为整数
    }
  //创建数组  拼装返回结果
  //总记录数  总页数  当前页  当前页数据
  $output=[
    "recodeCount"=>0,
    "pageCount"=>0,
    "pno"=>$pno,
    "data"=>null,
    "pageSize"=>$pgs
  ];
  $sql="SELECT COUNT(*) FROM xz_order WHERE isdel=0";
  $result=mysqli_query($conn,$sql);
  $row=mysqli_fetch_row($result);
  $output["recodeCount"]=intval($row[0]);
  $output["pageCount"]=ceil($output["recodeCount"]/$output["pageSize"]);
  $start=($output["pno"]-1)*$output["pageSize"];
  $count=$output["pageSize"];
  $sql=" SELECT o.aid,u.uname,o.status,o.order_time,o.pay_time,o.received_time";
  $sql.=" FROM xz_order o,xz_user u";
  $sql.=" WHERE o.user_id=u.uid AND o.isdel=0";
  $sql.=" LIMIT $start,$count";
  $result=mysqli_query($conn,$sql);
  $rows=mysqli_fetch_all($result,MYSQLI_ASSOC);
  $output["data"]=$rows;
  echo json_encode($output);
?>