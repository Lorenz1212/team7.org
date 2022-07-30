<?php
@session_start();
$config = new Config();
if(!isset($_COOKIE[$config->cookie_user()])){
   header("location:../login/");
   exit();
}
if(isset($_SESSION['view'])){
 $page_title = ucwords(str_replace("_", " ", str_replace(".php","",ucfirst(explode('/', $_SESSION['view'])[1]))));
 $page_view = $_SESSION['view'];
}else{
 $page_title =  'Home';
 $page_view = 'view/home.php';
}
?>
<!DOCTYPE html>
<html lang="en">
		<meta charset="utf-8" />
		<head><base href="team7.org">
		<title><?php echo 'Team 7 | '.$page_title; ?></title>
		<meta name="description" content="Updates and statistics" />
		<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no , maximum-scale=1" />
		<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Poppins:300,400,500,600,700" />		
		<link href="../assets/plugins/global/plugins.bundle.css" rel="stylesheet" type="text/css" />
		<link href="../assets/plugins/custom/prismjs/prismjs.bundle.css" rel="stylesheet" type="text/css" />
		<link href="../assets/css/style.bundle.css" rel="stylesheet" type="text/css" />
		<script src="../assets/js/jquery.min.js"></script>
		<link rel="shortcut icon" />
	</head>
	<body id="kt_body" class="header-fixed header-mobile-fixed page-loading">
		<div id="kt_header_mobile" class="header-mobile bg-primary header-mobile-fixed">
			<a href="dashboard">
				 <span class="text-white font-weight-boldest"><?php echo $admincookie['admin_FNAME']?> <?php echo $admincookie['admin_LNAME']?></span>
			</a>
			<div class="d-flex align-items-center">
				<button class="btn p-0 burger-icon burger-icon-left ml-4" id="kt_header_mobile_toggle">
					<span></span>
				</button>
				<button class="btn p-0 ml-2" id="kt_header_mobile_topbar_toggle">
				<span class="symbol symbol-35">
                        <?php echo ($admincookie['admin_PROFILE']=="default.png") ? '<span class="symbol-label font-size-h5 font-weight-bold text-white bg-white-o-30 text-uppercase">'.($admincookie['admin_FNAME'])[0].'</span>' : '<div class="symbol-label" style="background-image:url(../../images/user_images/'.$admincookie['admin_PROFILE'].')"></div>'; ?>
                    </span>
				</button>
			</div>
			<!--end::Toolbar-->
		</div>
		<div class="d-flex flex-column flex-root">
			<div class="d-flex flex-row flex-column-fluid page">
				<div class="d-flex flex-column flex-row-fluid wrapper" id="kt_wrapper">
					<div id="kt_header" class="header flex-column header-fixed">
						<div class="header-top">
							<div class="container">
								<div class="d-none d-lg-flex align-items-center mr-3">
									<a href="dashboard" class="mr-20">
										<span class="text-white font-weight-boldes h1"><?php echo $admincookie['admin_FNAME']?> <?php echo $admincookie['admin_LNAME']?></span>
									</a>
								</div>
								<div class="topbar">
									<div class="topbar-item">
										<div class="d-flex flex-column text-right pr-3">
											<a href="logout" class="btn btn-sm btn-light-danger font-weight-bolder py-2 px-5">Sign Out</a>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div class="content d-flex flex-column flex-column-fluid bg-light-secondary py-lg-0" id="kt_content">
						 <?php include $page_view; ?>
					</div>
					<div class="footer bg-white py-4 d-flex flex-lg-column" id="kt_footer">
						<div class="container d-flex flex-column flex-md-row align-items-center justify-content-between">
							<div class="text-dark order-2 order-md-1">
								<a href="https://npic-coop.ph/" target="_blank" class="text-dark-75 text-hover-primary">TEAM 7</a>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<!--end::Main-->
		<!--begin::Global Config(global config for global JS scripts)-->
		<script>var KTAppSettings = { "breakpoints": { "sm": 576, "md": 768, "lg": 992, "xl": 1200, "xxl": 1200 }, "colors": { "theme": { "base": { "white": "#ffffff", "primary": "#0BB783", "secondary": "#E5EAEE", "success": "#1BC5BD", "info": "#8950FC", "warning": "#FFA800", "danger": "#F64E60", "light": "#F3F6F9", "dark": "#212121" }, "light": { "white": "#ffffff", "primary": "#D7F9EF", "secondary": "#ECF0F3", "success": "#C9F7F5", "info": "#EEE5FF", "warning": "#FFF4DE", "danger": "#FFE2E5", "light": "#F3F6F9", "dark": "#D6D6E0" }, "inverse": { "white": "#ffffff", "primary": "#ffffff", "secondary": "#212121", "success": "#ffffff", "info": "#ffffff", "warning": "#ffffff", "danger": "#ffffff", "light": "#464E5F", "dark": "#ffffff" } }, "gray": { "gray-100": "#F3F6F9", "gray-200": "#ECF0F3", "gray-300": "#E5EAEE", "gray-400": "#D6D6E0", "gray-500": "#B5B5C3", "gray-600": "#80808F", "gray-700": "#464E5F", "gray-800": "#1B283F", "gray-900": "#212121" } }, "font-family": "Poppins" };</script>
		<!--end::Global Config-->
		<!--begin::Global Theme Bundle(used by all pages)-->
		<script src="../assets/plugins/global/plugins.bundle.js"></script>
		<script src="../assets/plugins/custom/prismjs/prismjs.bundle.js"></script>
		<script src="../assets/js/scripts.bundle.js"></script>
		<script class="ajax-reload" src="../assets/user-script/script.js"></script>
	</body>
	<!--end::Body-->
</html>