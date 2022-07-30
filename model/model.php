<?php
@session_start();
require_once "../config/Crud.php";
require_once "../config/detect.php";
require_once "../config/encryption.php";
require_once "../config/Config.php";
Class Model {
	private $crud;
	public function __construct() {
		$this->crud = new Crud();
		$this->detect = new customDetect();
		$this->customcrypt = new encryption();
		$this->config = new Config();
	}
	private function User_Data($type){
	   $admincookie = json_decode($this->customcrypt->getDecrypt($_COOKIE[$this->config->cookie_user()]), true);
       if($admincookie){ 
       	 return $admincookie[$type];
       }else{
         return "";
       }
	}
	private function setCookies($token, $data, $days){
    setcookie($this->config->cookie_authadmin(), $token, time() + (86400 * $days), "/", $this->config->CookieDomainConfig(), 1);
		setcookie($this->config->cookie_user(), $this->customcrypt->getEncrypt(json_encode($data)), time() + (86400 * $days), "/", $this->config->CookieDomainConfig(), 1);
	}
	public function dashboard($type,$val,$val1){
		  $type = $this->crud->escape_string($type);
		  $val = $this->crud->escape_string($val);
		  $val1 = $this->crud->escape_string($val1);
		  $admin_id=$this->User_Data('admin_UID');
		  switch($type){
		  	case "result_list":{	
		  	  $data = array();
		  	  $data_wallet = array();
		  		$sql = "SELECT * FROM tbl_administrator WHERE id='$admin_id'";
		  		$row = $this->crud->fetchSingleRow($sql);
		  		$data_wallet['wallet']=number_format($row['wallet'],2);
		  		$sql = "SELECT * FROM tbl_result WHERE user_id='$admin_id' ORDER BY id DESC";
		  		$result = $this->crud->getData($sql);
		  		if($result){
		  			foreach($result as $row){
		  				$data['result'][] = array('result_number'=>$row['result_number'].' ('.$row['result_status'].')',
		  												'bet_amount'=>number_format($row['bet_amount'],2),
		  												'bet_status'=>$row['bet_status'],
		  												'status'=>$row['status']
		  											);
		  			}
		  			return array_merge_recursive($data,$data_wallet);
		  		}
		  		break;
		  	}
		  	case "submit_bet":{
		  		$sql = "SELECT * FROM tbl_administrator WHERE id='$admin_id'";
		  		$row = $this->crud->fetchSingleRow($sql);
		  		if($row){
		  			$wallet = $row['wallet'];
		  			if($wallet < $val1){
		  				return 'Your wallet is not enough balance';
		  			}else{
		  				$sql = "SELECT * FROM tbl_random_number WHERE id=1";
		  				$result_number = $this->crud->fetchSingleRow($sql);
		  			
		  				$randomnumber = $result_number['ran_number'];
		  				if ($result_number % 2 == 0) {
							  $number_status = 'EVEN';
							}else{
								$number_status = 'ODD';
							}
							if($val == $number_status){
								$status = "WIN";
								$total = $wallet + ($val1*2);
							}else{
								$status = "LOSE";
								$total = $wallet - $val1;
							}
							$sql = "INSERT INTO tbl_result(user_id,result_number,result_status,bet_amount,bet_status,status)VALUES('$admin_id','$randomnumber','$number_status','$val1','$val','$status')";
							$result = $this->crud->execute($sql);
							if($result){
								$sql = "UPDATE tbl_administrator SET wallet='$total' WHERE id='$admin_id'";
								$result_update = $this->crud->update($sql);
								if($result_update){
									$randomupdate = rand(10,99);
									$sql = "UPDATE tbl_random_number SET ran_number='$randomupdate' WHERE id=1";
									if($this->crud->update($sql)){
										return array('status'=>$status,'result_number'=>$randomnumber,'result_status'=>$number_status);
									}else{
										return false;
									}
								}
							}else{
								return false;
							}
		  			}
		  		}else{
		  			return false;
		  		}
		  		break;
		  	}


		  }
	}

}
?>