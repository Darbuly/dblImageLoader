<?php
 include '../config.php';
 
$upFile = $_FILES['avatar'];

/**
* 创建文件夹函数,用于创建保存文件的文件夹
* @param str $dirPath 文件夹名称
* @return str $dirPath 文件夹名称
*/

if($_FILES['avatar']['size']>__MAXSIZE__*1024*1024){
	echo json_encode('Out imageSize for 2MB!!!');
}
function creaDir($dirPath){
	$curPath = $_SERVER['DOCUMENT_ROOT'];
	$path = $curPath.'\\'.$dirPath;
	if(is_dir($path)||mkdir($path,0777,true)){
		return $path;
	}
}
if($upFile['error']==0&&!empty($upFile)){
	$dirpath = creaDir(__UPDIR__);
	$filename = $_FILES['avatar']['name'];
	$time = time();
	$queryPath = $dirpath.'/'.$time.$filename.'.png';

	if(move_uploaded_file($_FILES['avatar']['tmp_name'], $queryPath)){

		$url='http://'.$_SERVER['HTTP_HOST'].'/';
		echo $url.__UPDIR__.'/'.$time.$filename.'.png';
	}
}
?>