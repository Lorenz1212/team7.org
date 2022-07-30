<?php  
@session_start();
ini_set('display_errors', 1); 
ini_set('display_startup_errors', 1); 
error_reporting(E_ALL);
require_once "config/Config.php";
$config = new Config();
if(isset($_COOKIE[$config->cookie_user()])){
    header("Location: betting-portal/dashboard");
    exit();
}
?>
<!DOCTYPE html>
<html lang="en" >
    <!--begin::Head-->
    <head>        
        <meta charset="utf-8"/>
        <title>Team 7 | Login</title>
        <meta name="description" content="Login page example"/>
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"/>
        <meta name="theme-color" content="#1c0f29">
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Poppins:300,400,500,600,700"/>        
        <link href="login-assets/css/pages/login/classic/login-5.css" rel="stylesheet" type="text/css"/>
        <link href="assets/plugins/global/plugins.bundle.css" rel="stylesheet" type="text/css"/>
        <link href="assets/plugins/custom/prismjs/prismjs.bundle.css" rel="stylesheet" type="text/css"/>
        <link href="login-assets/css/style.bundle.css" rel="stylesheet" type="text/css"/>
        <script src="login-assets/js/jquery.min.js"></script>
        <link rel="shortcut icon" />
     </head>
    <!--end::Head-->
    <!--begin::Body-->
    <body id="kt_body" class="header-fixed header-mobile-fixed subheader-enabled subheader-fixed aside-enabled aside-fixed aside-minimize-hoverable page-loading">
        <!--begin::Main-->
        <div class="d-flex flex-column flex-root">
            <!--begin::Login-->
            <div class="login login-3 login-signin-on d-flex flex-row-fluid" id="kt_login">
                <div class="d-flex flex-center bgi-size-cover bgi-no-repeat flex-row-fluid" style="background-image: url('login-assets/media/bg/bg-11.jpg');">
                    <div class="login-form text-center text-white p-7 position-relative overflow-hidden">
                        <!--begin::Login Sign in form-->
                        <div class="login-signin">
                            <div class="mb-20">
                                <h3>Sign In</h3>
                                <p class="opacity-60 font-weight-bold">Enter your details to login to your account:</p>
                            </div>
                            <form class="form" id="kt_login_signin_form">
                                <div class="form-group">
                                    <input class="form-control h-auto rounded-pill border-0 py-4 px-8 mb-5" type="text" placeholder="Email/Username" name="email" autocomplete="off" />
                                </div>
                                <div class="form-group">
                                    <input class="form-control h-auto rounded-pill border-0 py-4 px-8 mb-5" type="password" placeholder="Password" name="password" />
                                </div>
     
                                <div class="form-group text-center mt-10">
                                    <button id="kt_login_signin_submit" class="btn btn-pill btn-outline-white font-weight-bold opacity-90 px-15 py-3">Sign In</button>
                                </div>
                            </form>
                        </div>
                        <!--end::Login Sign in form-->
                    </div>
                </div>
            </div>
            <!--end::Login-->
        </div>
        <script>var HOST_URL = "https://preview.keenthemes.com/metronic/theme/html/tools/preview";</script>
        <!--begin::Global Config(global config for global JS scripts)-->
        <script>
            var KTAppSettings = {
                "breakpoints": {
                    "sm": 576,
                    "md": 768,
                    "lg": 992,
                    "xl": 1200,
                    "xxl": 1400
                },
                "colors": {
                    "theme": {
                        "base": {
                            "white": "#ffffff",
                            "primary": "#3699FF",
                            "secondary": "#E5EAEE",
                            "success": "#1BC5BD",
                            "info": "#8950FC",
                            "warning": "#FFA800",
                            "danger": "#F64E60",
                            "light": "#E4E6EF",
                            "dark": "#181C32"
                        },
                        "light": {
                            "white": "#ffffff",
                            "primary": "#E1F0FF",
                            "secondary": "#EBEDF3",
                            "success": "#C9F7F5",
                            "info": "#EEE5FF",
                            "warning": "#FFF4DE",
                            "danger": "#FFE2E5",
                            "light": "#F3F6F9",
                            "dark": "#D6D6E0"
                        },
                        "inverse": {
                            "white": "#ffffff",
                            "primary": "#ffffff",
                            "secondary": "#3F4254",
                            "success": "#ffffff",
                            "info": "#ffffff",
                            "warning": "#ffffff",
                            "danger": "#ffffff",
                            "light": "#464E5F",
                            "dark": "#ffffff"
                        }
                    },
                    "gray": {
                        "gray-100": "#F3F6F9",
                        "gray-200": "#EBEDF3",
                        "gray-300": "#E4E6EF",
                        "gray-400": "#D1D3E0",
                        "gray-500": "#B5B5C3",
                        "gray-600": "#7E8299",
                        "gray-700": "#5E6278",
                        "gray-800": "#3F4254",
                        "gray-900": "#181C32"
                    }
                },
                "font-family": "Poppins"
            };
        </script>
        <!--end::Global Config-->
    	<!--begin::Global Theme Bundle(used by all pages)-->
    		<script src="assets/plugins/global/plugins.bundle.js"></script>
    		<script src="assets/plugins/custom/prismjs/prismjs.bundle.js"></script>
    		<script src="login-assets/js/scripts.bundle.js"></script>
		<!--end::Global Theme Bundle-->
        <!--begin::Page Scripts(used by this page)-->
            <script src="login-assets/js/login-form.js"></script>
        <!--end::Page Scripts-->
        </body>
    <!--end::Body-->
</html>