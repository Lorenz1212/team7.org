<?php
//Config file para ma less yung mga syntax na gagamitin sa back-end
Class Config {
	public function base_url(){
		$base_url = ((isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] == "on") ? "https" : "http");
		$base_url .= "://". @$_SERVER['HTTP_HOST'];
		$base_url .= str_replace(basename($_SERVER['SCRIPT_NAME']),"",$_SERVER['SCRIPT_NAME']);
		return $base_url;
	}

//SESSION
	public function SESS(){
		return $value = "team7";
	}

	public function cookie_authadmin(){
		return "team7_authadmin";
	}
	public function cookie_user(){
		return "team7_user";
	}
	public function CookieDomainConfig(){
	    if ($this->isHttps()) {
	     return "team7.org";
	    }else{
	     return "localhost";
	    }
	}

	public function SESS_domain(){
	    if ($this->isHttps()) {
	     return "team7-live-";
	    }else{
	     return "team7-local-";
	    }
	}

//DOMAIN
	public function Live_Domain(){
	    return "team7.org";
	}
	public function Link(){
	    if ($this->isHttps()) {
	     return "https://team7.org";
	    }else{
	     return "http://localhost/team7.org";
	    }
	}
	public function Link2(){
	    if ($this->isHttps()) {
	     return "team7.org";
	    }else{
	     return "team7.org";
	    }
	}
	public function Domain($type=''){
	    if($type == "domain"){
        	return $this->Link2()."/betting-portal2022/";
	    }else{
	        return $this->Link()."/betting-portal2022/";
	    }
	}
	public function get_string_between($string, $start, $end){
	    $string = ' ' . $string;
	    $ini = strpos($string, $start);
	    if ($ini == 0) return '';
	    $ini += strlen($start);
	    $len = strpos($string, $end, $ini) - $ini;
	    return substr($string, $ini, $len);
	}


	private function isHttps(){
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
}
?>