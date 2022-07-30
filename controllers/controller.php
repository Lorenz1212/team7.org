<?php 
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
@session_start();
require_once "../model/model.php";
require_once "../config/Config.php";
$config = new Config();
if(!isset($_COOKIE[$config->cookie_user()])){
	echo 'signed-out';
  exit();
}
else{
if(isset($_POST['page'])){
		$page = explode('/', strtolower($_POST['page']))[0];
		//FOR LOGOUT ===============================
    if($page=="logout"){
      include "../betting-portal/view/".$page.".php";
      exit();
    }
		if(file_exists("../betting-portal/view/".$page.".php")){
			include "../betting-portal/view/".$page.".php";
		}else{
			include '../betting-portal/view/not_found.php';
		}
  }
	else if(isset($_POST['data1']))
	{
	  $controller = new Model();
		$action = strtolower($_POST['data1']);
		$data = array();

		if($action === "dashboard"){ 
	  	$type = (isset($_POST['data2'])) ? $_POST['data2'] : _invalidMissing_Input("Missing request type");
	    $val = (isset($_POST['data3'])) ? $_POST['data3'] : false;
	    $val1 = (isset($_POST['data4'])) ? $_POST['data4'] : false;
	    $model_response = $controller->dashboard($type,$val,$val1);
	    	$data = array(
				'status' => 'success',
				'message' => 'request accepted',
				'payload' => base64_encode(json_encode($model_response))
				);
			echo json_encode($data);
		}
		else{
			$data = array(
				'status' => 'failed',
				'message' => "Action not found",
				'payload' => ''
	        );
		    echo json_encode($data);
		    exit();
		}
	}else{
		$data = array(
			'status' => 'failed',
			'message' => "Request not found",
			'payload' => ''
		);
		echo json_encode($data);
		exit();
	}
}
function _invalidMissing_Input($message){
	 $data = array(
        'status' => 'failed',
        'message' => $message,
        'payload' => ''
     );
     //return the invalid message
     echo json_encode($data);
     //terminate process when input is invalid
     exit();
}

?>
