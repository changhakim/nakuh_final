"use strict";
var app = app||{};
app=(()=>{
	let homecss,admincss,rescss,instacss
	let init=x=>{
		app.$.init(x);

	};
	let onCreate=()=>{
		setContentView();
	};
	let setContentView=()=>{
		$.when(
		$.getScript($.js()+'/reservation/eunyeong.js'),
		$.getScript($.js()+'/aquagram/jeonguk.js'),
		$.getScript($.js()+'/admin/changha.js')
		).done(()=>{
			Kakao.init('f7d32ac01021f4eb79136a2e7d1c5523');
			app_defualt_loader();
			/*acrawl();*/
		});
	};
	
	
	let app_defualt_loader =()=>{
		css();
		logManager();
		$(homecss).appendTo('head');
		$('.ocean').click(e=>{
			e.preventDefault();
			$('.instacss').remove();
			$('.homecss').remove();
			$('.admincss').remove();
			$(rescss).appendTo('head')
			eunyeong.init('ocean');
		})
		$('.river').click(e=>{
			e.preventDefault();
			$('.instacss').remove();
			$('.admincss').remove();
			$(rescss).appendTo('head')
			eunyeong.init('river');
		})
		$('.hotel').click(e=>{
			e.preventDefault();
			$('.instacss').remove();
			$('.admincss').remove();
			$(rescss).appendTo('head')
			eunyeong.init('hotel');
		})
		$('.newsfeed').click(e=>{
			e.preventDefault();
			$('.homecss').remove();
			$('.rescss').remove();
			$(instacss).appendTo('head');
			jeonguk.init();
		})
		$('.mypage').click(e=>{
			e.preventDefault();
			$('.instacss').remove();
			$('.admincss').remove();
			$(rescss).appendTo('head')
			eunyeong.init('mypage');
		})
		$('#adminbtn').click(()=>{
			$('.homecss').remove();
			$('.rescss').remove();
			$('.instacss').remove();
			$('#navheader').remove();
			$('#aaadfa').remove();
			$(admincss).appendTo('head')
			changha.init();
		})
		 $('.home').click(e=>{
			 e.preventDefault();
	            $('.rescss').remove();
	            $('.instacss').remove();
	            location.assign(''+$.ctx()+'/');
	            app.init();
	    });
			
	};
	
	let logManager =()=>{
		if(sessionStorage.getItem('userid') != null){
			$('.mypage').after('<a href="#" class="menu_txt pblock logout">로그아웃</a>')
		$('.logout').click(function(){
			Kakao.Auth.logout(function(){
				sessionStorage.removeItem('userid');
				sessionStorage.removeItem('userpo');
				sessionStorage.removeItem('kakaosession');
				location.assign(''+$.ctx()+'/');
			});
		})
	}
		if(sessionStorage.getItem('userid') === null){
			$('#id01').css('display','block');
			$('.modal-content').css({'height':'350px','width':'362px'});
            $('#change_login_form').css('padding-top','50px');
		$('#kakao_login_btn').attr('style','cursor:pointer').click(function loginWithKakao() {  
			kakao();
		
		});
		$('#login').click(()=>{
			
			let data = {mid:$('#userid').val(),password:$('#password').val()}
			$.ajax({
				 url: $.ctx()+'/login/general',
                 type: 'POST',
                 data: JSON.stringify(data),
                 dataType:'json',
                 contentType : "application/json; charset=UTF-8",
                 success: d=>{
                	 if(d.member.mid==='1'){
                		 alert('입력하신 아이디가 없습니다')
                	 }else{
                		 sessionStorage.setItem('userid',d.member.mid);
                		 sessionStorage.setItem('userpo',d.member.profilephoto)
                		
                		 $('#id01').css('display','none');
                		 logManager();
                	 }
                	 
                 },
                 error:e=>{
                	 
                 }
			})
		})
			
		}

	
	};
	
	let css = ()=>{
		 homecss ='<link class="homecss" href="'+$.ctx()+'/resources/css/home/responsive.css" rel="stylesheet">'
			/*+'<link class="homecss" href="/web/resources/css/home/responsive_basic.css" rel="stylesheet">'*/
			+'<link class="homecss" href="'+$.ctx()+'/resources/css/home/swiper.min.css" rel="stylesheet">'
		 	+'<link class="homecss" rel="stylesheet" type="text/css" href="'+$.ctx()+'/resources/css/home/homemain.css" />';
		 
		 
		 admincss='<link class="admincss" href="'+$.ctx()+'/resources/css/admin/animate.min.css" rel="stylesheet"/>'
			 +'<link class="admincss" href="'+$.ctx()+'/resources/css/admin/light-bootstrap-dashboard.css?v=1.4.0" rel="stylesheet"/>'
			 +'<link class="admincss" href="'+$.ctx()+'/resources/css/admin/demo.css" rel="stylesheet" />'
			 +'<link class="admincss" rel="stylesheet" href="'+$.ctx()+'/resources/css/admin/pe-icon-7-stroke.css">';
			 
	
         rescss =  '<link class="homecss" href="'+$.ctx()+'/resources/css/home/responsive.css" rel="stylesheet">'
        	 +'<link class="homecss" href="'+$.ctx()+'/resources/css/home/swiper.min.css" rel="stylesheet">'
        	 +'<link class="rescss" rel="stylesheet" type="text/css" href="'+$.ctx()+'/resources/css/reservation/modal.css"> '
        	 +'<link class="rescss" rel="stylesheet" href="'+$.ctx()+'/resources/css/reservation/prdpay.css">';
	 
		 instacss ='  <link class="instacss" rel="stylesheet" type="text/css" href="'+$.ctx()+'/resources/css/aquagram/style.css">'
			 +'  <link class="instacss" rel="stylesheet" type="text/css" href="'+$.ctx()+'/resources/css/aquagram/animate.css">'
			 +'  <link class="instacss" rel="stylesheet" type="text/css" href="'+$.ctx()+'/resources/css/aquagram/structure.css">'
			 +'  <link class="instacss" rel="stylesheet" type="text/css" href="'+$.ctx()+'/resources/css/aquagram/docs.min.css"> '
			 +'  <link class="instacss" rel="stylesheet" type="text/css" href="'+$.ctx()+'/resources/css/aquagram/modal.css"> '
			 +'  <link class="instacss" rel="stylesheet" type="text/css" href="'+$.ctx()+'/resources/css/aquagram/default_css.css">';
	}
	
	let crawl=()=>{
		
		 $.ajax({
			  url:$.ctx()+'/naver',
			  type:'get',
			  data:JSON.stringify(),
			  dataType:'json',
			  contentType:'application/json',
			  success:d=>{
				  alert('업데이트성공')
			  }
			  
		 })
	};
			
	
	let kakao=()=>{
            
        	Kakao.Auth.loginForm({
              success: function(authObj) {
                   Kakao.API.request({
                         url: '/v1/user/me',
                         success: function(res) {
                               Kakao.Auth.setAccessToken(authObj.access_token, true);
                               sessionStorage.setItem('kakaosession', Kakao.Auth.getAccessToken());
                               let resdata = { 
                            	  id:res.id,
                            	  email:res.kaccount_email,
                            	  profileimg:res.properties['profile_image'],
                            	  name:res.properties['nickname']
                               };
                               $.ajax({
                                   url: $.ctx()+'/login/kakao/'+res.id,
                                   type: 'POST',
                                   data: JSON.stringify(resdata, authObj),
                                   dataType:'json',
                                   contentType : "application/json; charset=UTF-8",
                                   success: d=>{
                                	
 
                                       $('#id01').attr('style','display:none');//닫기 
                                       $('#loginbtn').text('LOGOUT');
                                       $('#loginbtn').attr('id','logoutbtn');
                                       $.each(d.m,(i,j)=>{
                                           sessionStorage.setItem('userid',j.mid);
                                           sessionStorage.setItem('userpo',j.profilephoto);
                                       });
                                       //location.assign(x+"/ngh");
                                       $('#id01').css('display','none');
                                       logManager();
                                   }
                               });
                               
                             }
                           });
              	
              },
              fail: function(err) {
                alert(JSON.stringify(err));
              }
              
            });
        	
         
       
	};
	
	
	return {init:init,
			onCreate:onCreate, kakao:kakao}
	
	
})();

app.$={
		init:x=>{
			$.getScript(x+'/resources/js/router.js',
			()=>{
				$.extend(new Session(x))
				app.onCreate(); 
				
			});
			
		}
		
}