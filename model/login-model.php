<?php 
@session_start();

// require_once ay para iembed nya yung code sa kabilang file para yung nasa loob ng file na codes ay magamit nyo dito sa file na eto. So makikita nyo nakainclude yung file name nya .
// Look nyo yung public function _contruct() nasa loob nun yung pano nyo idedeclare yung mga codes dun sa require_once
// once na nakita nyo yung sign na "$" meaning nyan para gawin nyo variable yung data.
// example 1:
// echo "Your Name is budoy";
// result : Your name is budoy

// example 2:
// $name = "budoy";
// echo "Your Name is".$name;
// result : Your name is budoy

// Kahit palitan mo yung $name ng ibang value(ex.renz) ang lalabas pa din na result : Your name is renz. Nandun pa yung "Your name is" kase dinugtong mo lang naman yung $name; 

require_once "../config/Crud.php";
require_once "../config/detect.php";
require_once "../config/encryption.php";
require_once "../config/Config.php";

// Ang ginamit natin na procedure dito ay Object-oriented programming (OOP) 
// Mas malinis magcode kapag OOP ang gamit
// Pano malalaman kung OOP? makikita nyo meron class sa under ni class merong private and public
// PRIVATE hindi sya pwede icall sa kabilang file. 
// PUBLIC pwede sya icall sa kabilang file.
// 

Class Model{
	private $crud;
	public function __construct() {
		$this->crud = new Crud();
		$this->customcrypt = new encryption();
		$this->detect = new customDetect();
		$this->config = new Config();
	}
	private function isHttps()
	{
	    if (array_key_exists("HTTPS", $_SERVER) && 'on' === $_SERVER["HTTPS"]) {
	        return true;
	    }
	    if (array_key_exists("SERVER_PORT", $_SERVER) && 443 === (int)$_SERVER["SERVER_PORT"]) {
	        return true;
	    }
	    if (array_key_exists("HTTP_X_FORWARDED_SSL", $_SERVER) && 'on' === $_SERVER["HTTP_X_FORWARDED_SSL"]) {
	        return true;
	    }
	    if (array_key_exists("HTTP_X_FORWARDED_PROTO", $_SERVER) && 'https' === $_SERVER["HTTP_X_FORWARDED_PROTO"]) {
	        return true;
	    }
	    return false;
	}
	private function TODAY()
	{
	     date_default_timezone_set('Asia/Manila');
	     $datestamp = date("Y-m-d");
	     $timestamp = date("H:i:s");
	     return $now = $datestamp.' '.$timestamp;
	}
	private function Get_Main_IP(){
			$ip_address_main = getenv('HTTP_CLIENT_IP')?:
			getenv('HTTP_X_FORWARDED_FOR')?:
			getenv('HTTP_X_FORWARDED')?:
			getenv('HTTP_FORWARDED_FOR')?:
			getenv('HTTP_FORWARDED')?:
			getenv('REMOTE_ADDR');
			return $ip_address_main;
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
	public function Login_Signin($email, $password, $remember){
		// Need nyo makuha yung IP address para meron kayo logs kung anong IP Address ni users para sa security and monitoring ng users.
		$ip_address_main=$this->Get_Main_IP();
		$arr = explode(".",$ip_address_main);
		unset($arr[3]);
		$ip_address = implode(".",$arr);

		//Eto yung pag bato ng data sa database, instead $_POST['email'] and ilalagay nyo naconvert na sya ng $this->crud->escape_string para maiwasan natin yung sql injector ng mga hacker
		$email= strtolower($this->crud->escape_string($email));
		$password= $this->crud->escape_string(md5($password));
		$remember = ($this->crud->escape_string($remember) == "on") ? 30 : 1;
	
		$data_response = array();

		// fetch or read yung data sa database
		$sql="SELECT * FROM tbl_administrator WHERE password='$password' AND ( email='$email' OR username ='$email')";
		$admin=$this->crud->fetchSingleRow($sql);
		// nakalagay dito if(!admin) meaning kapag walang laman yung database papasok sya dun sa if(!admin) kung wala naman pupunta sya sa "else"
		if(!$admin){
			// return eto yung ibabalik nya yung value kung true or false. Dito ginawa ko nireturn nya yung string.
			// once na ganito ang syntax ' ' / " "; tawag dyan string or text only;
			return 'Login failed! wrong username/password.';
		}else{
			$email=$admin['email'];
			$token="";
			$data = array();
			$arr = explode(".",$admin['ipadd_prev']);
			unset($arr[3]);
			$ip_address_prev = implode(".",$arr);
			if($ip_address_prev == $ip_address || $admin['ipadd_prev'] === null){
				$this->crud->execute("UPDATE tbl_administrator SET ipadd_prev='$ip_address_main' WHERE email='$email'");
			// once na gagawa kayo ng $toke para hindi malaman ni hacker kung ano pinasok mo data kailangan gagamit tayo md5
			// md5 is ramdom string example. the value is budoy pero once na nakamd5 ang lalabas na result : dasdkj43434dsjadaskdljda-3xfdas
       		$token = md5($admin['username'].''.$this->TODAY().''.$ip_address_main);
				$device = "setupbrowsecap";
				$admin_id=$admin['id'];
				$data = array(
			          'admin_UID' => $admin['id'],
			          'admin_FNAME' => $admin['fname'], 
			          'admin_LNAME' => $admin['lname'], 
			          'admin_UNAME' =>  $admin['username'], 
			          'admin_EMAIL' =>   $admin['email'], 
			          'admin_PROFILE' => $admin['profile_img'], 
			          'admin_AdSTATUS' => md5("active"), 
			          'admin_TYPE' => md5('admin'),
			          'admin_COUNTRY' => $admin['country'],
			          'admin_ROLE_ID' => $admin['role'],
          			  'admin_ROLE' =>'user'
			        );
			//Para maginsert yung data sa database
	         $sql = "INSERT INTO tbl_administrator_login_details (admin_id, expiration, device, ip_add, token, token_status, role) VALUES ('".$admin['id']."', DATE_ADD(NOW(), INTERVAL ".$remember." DAY), '$device', '$ip_address_main', '$token', '1','".$admin['role']."') ON DUPLICATE KEY UPDATE login_date= VALUES(login_date), expiration= VALUES(expiration), device= VALUES(device), ip_add= VALUES(ip_add), token= VALUES(token), token_status= VALUES(token_status), role= VALUES(role)";
		      $result = $this->crud->execute($sql);
		      if($result){
		      		// $_SESSION para kahit iclose mo si browser once nakaset si session within 24hrs hindi kana babalik sa login page.
		      		$_SESSION['user_days_to_remember']=$remember;
		      		// Same din si cookies hindi ka din babalik sa login page once na nakaset eto.
					$this->setCookies($token, $data, $remember);
					$data_response=array('url'=>'dashboard');
      				return $data_response;
			    }else{
			       return 'Opsss, Something went wrong, Please try again later.';
			    }
			}
			else{
				$pin = random_int(100000, 999999);
				// Para maupdate nya yung data sa loob ng database.
				$this->crud->execute("UPDATE tbl_administrator SET ipadd_pin='$pin', expiry= DATE_ADD(NOW(), INTERVAL 10 MINUTE) WHERE email='$email'");
				return 'ip_check';
			}
		}
	}
}
?>





