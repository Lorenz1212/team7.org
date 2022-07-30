 <?php 
 @session_start();
 ini_set('display_errors', 1);
 ini_set('display_startup_errors', 1);
 error_reporting(E_ALL);
   	$data = array();
	if(isset($_POST['action'])){
		require "../model/login-model.php";
	   	$controller = new Model();
		$action = base64_decode($_POST['action']);
		if($action === "sign-in"){ 
			$email = (isset($_POST['email'])) ? $_POST['email'] : _invalidMissing_Input("Email/Username is required");
			$password = (isset($_POST['password'])) ? $_POST['password'] : _invalidMissing_Input("Password is required");
			$remember = 'off';
            $model_response = $controller->Login_Signin($email,$password,$remember);
	      if($model_response != false){
			   $data = array(
					'status' => 'success',
					'message' => 'request accepted',
					'payload' => base64_encode(json_encode($model_response))
			   );
			}else{
				$data = array(
					'status' => 'error',
					'message' => 'Something went wrong, Please try again later.',
					'payload' => base64_encode(json_encode($model_response))
				);
			}
			echo json_encode($data);
	   }else{
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