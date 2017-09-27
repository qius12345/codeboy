<?php
  require("init.php");
  //获取参数pno 当前页码
  @$pno=$_REQUEST["pno"];
  if(!$pno){
    $pno=1;
  }else{
    $pno=intval($pno);//将字符串数据转换为整数
  }
  //创建数组  拼装返回结果
  //总记录数  总页数  当前页  当前页数据
  $pageSize=8;
  $output=[
    "recodeCount"=>0,
    "pageCount"=>0,
    "pno"=>$pno,
    "data"=>null,
    "pageSize"=>$pageSize
  ];
  $sql="SELECT COUNT(*) FROM xz_laptop";
  $result=mysqli_query($conn,$sql);
  $row=mysqli_fetch_row($result);
  $output["recodeCount"]=intval($row[0]);
  $output["pageCount"]=ceil($output["recodeCount"]/$output["pageSize"]);
  $start=($output["pno"]-1)*$output["pageSize"];
  $count=$output["pageSize"];
  $sql=" SELECT l.lid,f.fname,l.title,l.price,l.spec,l.sold_count,p.sm";
  $sql.=" FROM xz_laptop_family f,xz_laptop l,xz_laptop_pic p";
  $sql.=" WHERE l.lid=p.laptop_id AND l.family_id=f.fid";
  $sql.=" GROUP BY l.lid";
  $sql.=" LIMIT $start,$count";
  $result=mysqli_query($conn,$sql);
  $rows=mysqli_fetch_all($result,MYSQLI_ASSOC);
  $output["data"]=$rows;
  echo json_encode($output);
?>