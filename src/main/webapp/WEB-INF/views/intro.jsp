<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
	<head>
	<meta charset="utf-8">
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<title>Jackson Template</title>
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<meta name="description" content="" />
	<meta name="keywords" content="" />
	<meta name="author" content="" />

  <!-- Facebook and Twitter integration -->
	<meta property="og:title" content=""/>
	<meta property="og:image" content=""/>
	<meta property="og:url" content=""/>
	<meta property="og:site_name" content=""/>
	<meta property="og:description" content=""/>
	<meta name="twitter:title" content="" />
	<meta name="twitter:image" content="" />
	<meta name="twitter:url" content="" />
	<meta name="twitter:card" content="" />

	<!-- Place favicon.ico and apple-touch-icon.png in the root directory -->

	<link href="https://fonts.googleapis.com/css?family=Quicksand:300,400,500,700" rel="stylesheet">
	<link href="https://fonts.googleapis.com/css?family=Playfair+Display:400,400i,700" rel="stylesheet">
	
	<!-- Animate.css -->
	<link rel="stylesheet" href="${css}/introcss/animate.css">
	<!-- Icomoon Icon Fonts-->
	<link rel="stylesheet" href="${css}/introcss/icomoon.css">
	<!-- Bootstrap  -->
	<link rel="stylesheet" href="${css}/introcss/bootstrap.css">
	<!-- Flexslider  -->
	<link rel="stylesheet" href="${css}/introcss/flexslider.css">
	<!-- Flaticons  -->
<!-- 	<link rel="stylesheet" href="/web/resources/css/intro/flaticon.css"> -->
	<!-- Owl Carousel -->
	<link rel="stylesheet" href="${css}/introcss/owl.carousel.min.css">
	<link rel="stylesheet" href="${css}/introcss/owl.theme.default.min.css">
	<!-- Theme style  -->
	<link rel="stylesheet" href="${css}/introcss/style.css">

	<!-- Modernizr JS -->
	<script src="${js}/introjs/modernizr-2.6.2.min.js"></script>
	<!-- FOR IE9 below -->
	<!--[if lt IE 9]>
	<script src="js/respond.min.js"></script>
	<![endif]-->

	</head>
	<body>
	<div id="colorlib-page">
		<div class="container-wrap" style="margin-left: 150px;margin-right: 0px;">
		<a href="#" class="js-colorlib-nav-toggle colorlib-nav-toggle" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar"><i></i></a>
		<aside id="colorlib-aside" role="complementary" class="border js-fullheight" style="height: 930px;left: 0px;">
			<div class="text-center">
				<div class="author-img" style="background-image: url(${img}/introimg/about.jpg);"></div>
				<h1 id="colorlib-logo "><a  href="#" style="font-size: 25px;">ChangHa Kim</a></h1>
				<span class="position"><a href="#">Developer</a> in Korea</span>
				<h2><a href="#" id="introhome" style="color: #d66c6c;">Go project</a></h2>
			</div>
			<nav id="colorlib-main-menu" role="navigation" class="navbar">
				<div id="navbar" class="collapse">
					<ul>				
						<li><a href="#" style="font-size: 17px;">Email</a></li>
						<li><a href="#">changha0321@gmail.com</a></li>
						<li><a href="#" style="font-size: 17px;">Birth Year</a></li>
						<li><a href="#">1995-01-17</a></li>
						<li><a href="#" style="font-size: 17px;">H.P</a></li>
						<li><a href="#">010-7679-4338</a></li>
						
					</ul>
				</div>
			</nav>		
		</aside>

		<div id="colorlib-main">
			<section class="colorlib-about" data-section="about" style="padding-top: 30px;padding-bottom: 0px;">
				<div class="colorlib-narrow-content">
					<div class="row">
						<div class="col-md-12">
							<div class="row row-bottom-padded-sm animate-box" data-animate-effect="fadeInLeft">
							<!-- <iframe width="619" height="400" src="https://youtu.com//2tDsYaJvGyI" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen="" style="width: 900px;height: 600px;width: 1000px;"></iframe> -->
							<iframe width="939" height="573" src="https://www.youtube.com/embed/2tDsYaJvGyI" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
							</div>
						</div>
					</div>
				</div>
			</section>								
			<section class="colorlib-skills" data-section="skills" style="padding-top: 0;">
				<div class="colorlib-narrow-content">
					<div class="row">
						<div class="col-md-6 col-md-offset-3 col-md-pull-3 animate-box">
							<h2 class="colorlib-heading animate-box" style="margin-bottom: 0px;color: #3000ff;">My Skills</h2>
						</div>
					</div>
					<div class="row">
					<img src="${img}/introimg/myskill.PNG" style="height: 250px;">
					</div>
				</div>
			</section>			
		</div><!-- end:colorlib-main -->
	</div><!-- end:container-wrap -->
	</div><!-- end:colorlib-page -->

	<!-- jQuery -->
    <script src="${js}/introjs/jquery.min.js"></script>    
	<!-- jQuery Easing -->
	<script src="${js}/introjs/jquery.easing.1.3.js"></script>
	<!-- Bootstrap -->
	<script src="${js}/introjs/bootstrap.min.js"></script>
	<!-- Waypoints -->
	<script src="${js}/introjs/jquery.waypoints.min.js"></script>
	<!-- Flexslider -->
	<script src="${js}/introjs/jquery.flexslider-min.js"></script>
	<!-- Owl carousel -->
	<script src="${js}/introjs/owl.carousel.min.js"></script>
	<!-- Counters -->
	<script src="${js}/introjs/jquery.countTo.js"></script>
	
	
	<!-- MAIN JS -->
	<script src="${js}/introjs/main.js"></script>

<script>

$('#introhome').click(function(){
	location.assign('${ctx}/index')	
})
</script>
	</body>
</html>