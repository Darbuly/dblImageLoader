<?php
function returnData($code,$message,$data){
$result = array(
          'code'=>$code,
          'message'=>$message,
          'data'=>$data,
        );
echo json_encode($result);	
}


$id = $_GET['id'];
if ($id != 10086){
    exit();
}
$userinfo = array(
    'username'=>'jason',
    'password'=>'xxxxxx',
);
returnData(1000,'获取成功',$userinfo,'json');
?>