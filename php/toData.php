<?php
	$type = $_POST['type'];
	$data = $_POST['data'];
	switch ($type) {
		case 'toHtml':
			$content = file_get_contents($data);

			break;
		
		default:
			# code...
			break;
	}
	echo $content;
?>