<?php
  header("Content-Type:application/json;charset=utf-8");
  $output=[
    "name"=>["第一季度","第二季度","第三季度","第四季度"],
    "data"=>[101,95,120,77]
  ];
  echo json_encode($output);
?>