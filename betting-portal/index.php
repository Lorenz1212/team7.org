<?php
@session_start();
require_once "../config/Crud.php";
require_once "../config/detect.php";
require_once "../config/encryption.php";
require_once "../config/Config.php";
$config = new Config();
$customcrypt = new encryption();
$admincookie = json_decode($customcrypt->getDecrypt($_COOKIE[$config->cookie_user()]), true);
if(!isset($_COOKIE[$config->cookie_user()])){
    header("location: ../login");
    exit();
}else{
    $_SESSION[$config->SESS().'_admin']=$admincookie['admin_UID'];
    $_SESSION['domain'] = $config->Domain("basehref");
    $url=$_SERVER['HTTP_HOST'].$_SERVER['REQUEST_URI'];
    if(substr($url, -1) != '/') $url=$url.'/';

    $subdir = str_replace('/', '', $config->get_string_between($url, $config->Domain("domain"), '/'));
    $new_url=str_replace('/'.$config->base_url(),'',$_SERVER['REQUEST_URI']);
    $dir='';
    for($i=0;$i<substr_count($new_url, "/")-2;$i++){
        $dir.='../';
    }
    $_SESSION['dir']=$dir;
    $page=explode('=', $subdir)[0];
    switch($subdir){
        case "": $_SESSION['view']='view/dashboard.php'; include 'home.php'; break;
        case "dashboard": $_SESSION['view']='view/dashboard.php'; include 'home.php'; break;
        default: $_SESSION['view']='view/not_found.php'; include 'home.php'; break;
    }
}
?>
