<?php
	@session_start();
	include_once "../config/Crud.php";
	require_once "../config/Config.php";
	$config = new Config();
	$crud = new Crud();
	if(isset($_COOKIE[$config->cookie_authadmin()])){
      $sql = "UPDATE tbl_administrator_login_details SET token_status='0' WHERE token = '".$_COOKIE[$config->cookie_authadmin()]."'";
      $crud->execute($sql); 
    }
    if(isset($_COOKIE['admin_AdSTATUS'])){ 
	  setcookie($config->cookie_authadmin(), "", time() - 86400, "/", $config->CookieDomainConfig(), 1); 
	  setcookie($config->cookie_user(), "", time() - 86400, "/", $config->CookieDomainConfig(), 1); 
      unset($_COOKIE[$config->cookie_user()], $_COOKIE[$config->cookie_authadmin()], $_SESSION['user_active']); 
	}else{
	  setcookie($config->cookie_authadmin(), "", time() - 86400, "/", $config->CookieDomainConfig(), 1); 
	  setcookie($config->cookie_user(), "", time() - 86400, "/", $config->CookieDomainConfig(), 1);
      unset($_COOKIE[$config->cookie_user()], $_COOKIE[$config->cookie_user()], $_SESSION['user_active']);
      session_destroy();
	}
    echo '<script>location.replace("../login");</script>';

?>	
