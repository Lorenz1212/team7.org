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
		  	//result ng mga player na tumaya
		  	case "result_player":{
		  		 $data_player = array();
		  		$sql = "SELECT *,(SELECT CONCAT(fname,' ',lname) FROM tbl_administrator WHERE id=tbl_user_bet.user_id) as fullname FROM tbl_user_bet ORDER BY id DESC";
		  		$result = $this->crud->getData($sql);
		  		if($result){
		  			foreach($result as $row){
		  				$data_player['player'][] = array('fullname'=>$row['fullname'],
		  												'bet_amount'=>number_format($row['bet_amount'],2),
		  												'bet_status'=>$row['bet_status']
		  											);
		  			}
		  		}
		  		return $data_player;
		  		break;
		  	}
		  	//result ng mga win and lose
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
		  			
		  		}
		  		return array_merge_recursive($data,$data_wallet);
		  		break;
		  	}

		  	//Para isubmit ni player kung ano bet nila.
		  	case "submit_bet":{
		  		$sql = "SELECT * FROM tbl_administrator WHERE id='$admin_id'";
		  		$row = $this->crud->fetchSingleRow($sql);
		  		if($row){
		  			$wallet = $row['wallet'];
		  			if($wallet < $val1){
		  				return 'Your wallet is not enough balance';
		  			}else{
		  				$sql = "SELECT * FROM tbl_user_bet WHERE user_id='$admin_id'";
		  				$row = $this->crud->fetchSingleRow($sql);
		  				if(!$row){
		  					$sql = "INSERT INTO tbl_user_bet(user_id,bet_amount,bet_status)VALUES('$admin_id','$val1','$val')";
								$result = $this->crud->execute($sql);
								if($result){
									return true;
								}else{
									return false;
								}
		  				}else{
		  					return 'Bets accepted will not be changed or voided upon confirmation of the successfully placed bet. Please wait after the countdown is done';
		  				}
		  			}
		  		}else{
		  			return false;
		  		}
		  		break;
		  	}
		  	//Para isubmit kung ano result ng bet nila once na tapos ang timer.
		  	case "submit_result":{
		  		$sql = "SELECT *,(SELECT wallet FROM tbl_administrator WHERE id=tbl_user_bet.user_id) as wallet FROM tbl_user_bet";
		  		$query = $this->crud->getData($sql);
		  		if($query){
		  			$sql = "SELECT * FROM tbl_random_number WHERE id=1";
		  			$result_number = $this->crud->fetchSingleRow($sql);
	  				$randomnumber = $result_number['ran_number'];
	  				if ($randomnumber % 2 == 0) {
						  $number_status = 'EVEN';
						}else{
							$number_status = 'ODD';
						}
		  			foreach($query as $row){
		  				$wallet = $row['wallet'];
		  				$user_id = $row['user_id'];
		  				$bet_amount = $row['bet_amount'];
		  				$bet_status = $row['bet_status'];
		  					if($bet_status == $number_status){
									$status = "WIN";
									$total = $wallet + ($bet_amount*2);
								}else{
									$status = "LOSE";
									$total = $wallet - $bet_amount;
								}
								$sql = "INSERT INTO tbl_result(user_id,result_number,result_status,bet_amount,bet_status,status)VALUES('$user_id','$randomnumber','$number_status','$bet_amount','$bet_status','$status')";
								$result = $this->crud->execute($sql);
								if($result){
									$sql = "UPDATE tbl_administrator SET wallet='$total' WHERE id='$user_id'";
									$this->crud->update($sql);
								}
		  			}
		  			$updanumber = rand(10,99);
		  			$sql = "UPDATE tbl_random_number SET ran_number='$updanumber' WHERE id=1";
		  			if($this->crud->update($sql)){
		  				$sql = "SELECT * FROM tbl_user_bet WHERE user_id='$admin_id'";
			  			$row = $this->crud->fetchSingleRow($sql);
			  			if($row){
			  				$sql = "DELETE FROM tbl_user_bet";
			  				if($this->crud->execute($sql)){
			  					return array('status'=>$status,'result_number'=>$randomnumber,'result_status'=>$number_status);
			  				}
			  			}else{
			  				return 'none';
			  			}
		  			}
		  		}else{
		  			return 'none';
		  		}
		  		break;
		  	}

		  }
	}

}
?>