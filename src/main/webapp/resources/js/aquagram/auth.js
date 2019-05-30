"use strict";
var auth = auth || {};
auth =(()=>{
	let homecss,admincss,rescss,instacss;
	let init =()=>{
		onCreate();
	};
	let onCreate =()=>{
		setContentView();
	};
	let setContentView =()=>{
		$.when(
				$.getScript($.js()+'/component/jwcompo.js'),
				$.getScript($.js()+'/aquagram/auth.js'),
				$.getScript($.js()+'/aquagram/arti.js'),
				$.getScript($.js()+'/aquagram/fous.js'),
				$.getScript($.js()+'/reservation/eunyeong.js')
			).done(()=>{
				$('#homemainnav').remove()
				$('body').scrollTop(0);
                $('<header id="homemainnav">'
                        +'        <section>'
                        +'            <a href="#" class="header_logo off active home">'
                        +'                <img src="'+$.ctx()+'/resources/img/homeimg/main/nakuhlogo.jpg" style="height: 30px;">'
                        +'            </a>'
                        +'            <a class="location_setting pos_addr_text btn_geo_popup">서울특별시 마포구 대흥동 백범로 23</a>'
                        +'            <div class="header_menu" style="font-weight: bold;font-weight: bold;font-size: 14px;color: black;">'
                        +'                <a href="#" class="menu_txt pblock ocean">바다</a>'
                        +'                <a href="#" class="menu_txt pblock river">민물</a>'
                        +'                <a href="#" class="menu_txt pblock hotel">숙박</a>'
                        +'                <a href="#" class="menu_txt pblock newsfeed">뉴스피드</a>'
                        +'                <a href="#" class="menu_txt pblock mypage">마이페이지</a>'
                        +'				  <a href="#" class="menu_txt pblock logout">로그아웃</a>'
                        +'                <a class="menu_btn" id="adminbtn">'
                        +'                    <img style="padding-top: 10px;"src="'+$.ctx()+'/resources/img/homeimg/main/admin_icon.png">'
                        +'                </a> '
                        +'            </div>'
                        +'        </section>'
                        +'    </header>').appendTo('#navheader');
				defualt_loader();
				

			});  
		
		
	};
	let defualt_loader=()=>{
		$("#wrapper").scrollTop(0);
		$('#users_list').empty();
	    $('#new_users_list').empty();
		$('#aq_main').remove();
		$('#wrapper').attr('style','top: 59px; background-color: white;');
		$('#right_nav_cont').empty();
		$('#my_navbar').empty();
/*		$('#leftbar_content').empty();
		$('#right_nav_cont').empty();
		$('#my_navbar').empty();*/
		$(jwcompo.left_content()).appendTo('#leftbar_content');
		$(jwcompo.right_nav()).appendTo('#right_nav_cont');
		$(jwcompo.my_navbar()).appendTo('#my_navbar');
		$('#leftbar_content').empty();
		css();
		nav();
		up_nav();
		user_search();
		arti.arti_img_upload();
		

		if(typeof $(window).data('ajaxready') == "undefined"){
			feed_infinitemove();
			$(window).data('ajaxready',false);
		}else{
			feed_fetchList();
		}
		
		right_nav_lander();
		
		//중앙 네비 따라오는 옵션
		$(document).ready(function() {
			  $('.navbar').affix({
			    offset: {
			      top: 50
			    }
			  });
			});
		//우측 네비 따라오는 옵션
		$(document).ready(function() {
			  $('#right_nav_cont').affix({
			    offset: {
			      top: 60
			    }
			  });
			});
		$('#my_fv').attr('style','text-align: center; cursor:pointer;').click(function(e){
			e.preventDefault();
			$(window).data('ajaxready',false);
			$('body').scrollTop(0);
			$('#photo_feed_css_hover').remove();
			arti.init();
		});
		//$('leftbar_content').empty();
		$('#followerid').attr('style','text-align: center; cursor:pointer').attr('data-toggle','modal').attr('data-target','#myModal').click(function(e){
			e.preventDefault();
			follower_list();
		});
		$('#folloingid').attr('style','text-align: center; cursor:pointer').attr('data-toggle','modal').attr('data-target','#myModal').click(function(e){
			e.preventDefault();
			folloing_list();
		});
			
	};
	
	let up_nav=()=>{
		let mid = sessionStorage.getItem('userid');
		$.getJSON($.ctx()+'/upnav/'+mid,d=>{
			 $('#my_fv').attr('styel','text-align: center;').text(d.upnav.artCount);
			 $('#followerid').attr('styel','text-align: center;').text(d.upnav.followerCount);
			 $('#folloingid').attr('styel','text-align: center;').text(d.upnav.folloingCount);
			
			 $('#navmypage').html('<img id="userimg" class="img-circle" alt="Cinque Terre" src="'+sessionStorage.getItem('userpo')+'" '
							+'style="width: 50px; height: 50px; position: center;"/>'+sessionStorage.getItem('userid')+'</div></li>');

			 $('#right_mynav').attr('src',sessionStorage.getItem('userpo'));
			 $('#right_mynavid').text(sessionStorage.getItem('userid'));
			 
				if(sessionStorage.getItem('userpo').match('http')){
					$('#userimg').attr('src',sessionStorage.getItem('userpo'));
					$('#right_mynav').attr('src',sessionStorage.getItem('userpo'));
				}else{
					$('#userimg').attr('src','resources/img/aquagram/profilephoto/'+sessionStorage.getItem('userpo'));
					$('#right_mynav').attr('src','resources/img/aquagram/profilephoto/'+sessionStorage.getItem('userpo'));
				}
			if(d.upnav.folloingCount==0 && d.upnav.followerCount==0 && d.upnav.artCount==0 ){
				$('#myModal').modal('show');
				allmemberlist();
				
			}
			
		});
		
	}
	let allmemberlist =(x)=>{
		let new_list ='';
		$('#myModal').attr('style','display: block; z-index:99999;');
		$('.modal-dialog').attr('class','modal-dialog');
		$('.modal-dialog').attr('style','top:200px;')
		$('.modal-content').attr('style','margin:auto; width: 65%; height: 600px;');
		$('#modal_close_btn').attr('style','z-index:9000;');
		$('.modal-title').text('새로운 친구들을 만나보세요');
		$('.modal-footer').html('<button type="button" id="feed_start" class="btn btn-primary" style="position: relative; top: 21px; right: 130px; ">시작하기</button>');
		$('.modal-body').attr('style','height: 90%;');
		$('.modal-body').html('<ul class="nav bs-docs-sidenav" style="overflow:scroll; width:100%; height:100%; padding:10px; background-color: white; border-radius: 6px;  border:1px solid; border-color: #ddd;">'
				+'				 <li>      '
				+'				 	<div id="new_list">'
				+'					</div>'
				+'				</li>'
				+'		      </ul>');
		$.getJSON($.ctx()+'/all/list/'+sessionStorage.getItem('userid'),d=>{
			$.each(d.all,(i,j)=>{
				new_list ='			<div class="item" style="display: -webkit-box;">'	
					+'				        	<div class="list-group-item list-group-item-action" style="height: 58px; width: 80%; top: 11px; border: none; display: -webkit-box;"> '
					+'							 <div> <img class="img-circle" id="new_pho'+i+'" alt="Cinque Terre" src="resources/img/aquagram/profilephoto/'+j.profilephoto+'" style="width: 50px; height: 50px; position: center"/></div> '
					+'								<div style="left: 13px; text-align: left;"><h5 id="newf_'+j.mid+'_'+i+'" style="margin-bottom: 3px; font-weight: bold;" value="'+j.mid+'">'+j.mid+'</h5><p style="font-size: 7px;">'+j.name+'</p></div>'
					+'								</div> '
					+'								<button type="button" class="btn btn-primary" value="'+j.mid+'" style="position: relative; top: 21px;">팔로우</button>'
					+'							</div> ';

				$(new_list).appendTo('#new_list').children('button').click(function(){
					
					let data = {mid:sessionStorage.getItem('userid'), 
							folloid:$(this).attr('value')};
					if($(this).text()=='팔로우'){
						
						folloings(data);
						$(this).attr('class','btn btn-default').text('팔로잉');
					}else{
						nufollower(data);
						$(this).attr('class','btn btn-primary').text('팔로우');
						
					}

				});
				if(j.password == null){
					$('#new_pho'+i).attr('src',j.profilephoto);
				}
				$('#newf_'+j.mid+'_'+i).attr('style','cursor:pointer').click(function(){
					$('#myModal').modal('hide');
					let scahid = $(this).attr('value');
					fous.init(scahid);
				});
			});
			
			
			
		});
		$('#feed_start').click(function(){
			$('#myModal').modal('hide');
			auth.init();
		});
		

	};
	let user_search=()=>{
		$('#search_but').attr('style','cursor:pointer').attr('data-toggle','modal').attr('data-target','#myModal').click(function(e){
			e.preventDefault();
			$('#myModal').attr('style','display: block; z-index:99999;');
			$('.modal-dialog').attr('class','modal-dialog');
			$('.modal-dialog').attr('style','top:200px;')
			$('.modal-content').attr('style','margin:auto; width: 65%; height: 600px;');
			$('#modal_close_btn').attr('style','z-index:9000;');
			$('.modal-title').text('검색결과');
			$('.modal-footer').remove();
			$('.modal-body').attr('style','height: 90%;');
			$('.modal-body').html('<ul class="nav bs-docs-sidenav" style="overflow:scroll; width:100%; height:100%; padding:10px; background-color: white; border-radius: 6px;  border:1px solid; border-color: #ddd;">'
					+'				 <li>      '
					+'				 	<div id="search_list">'
					+'					</div>'
					+'				</li>'
					+'		      </ul>');
			let search_item ='';
			
			let searchword = $('#search_from').val();
			$.getJSON($.ctx()+'/search/follo/'+searchword+'/'+sessionStorage.getItem('userid'),d=>{
				$('#search_from').val('');
				$.each(d.searclist,(i,j)=>{
					search_item ='			<div class="item" style="display: -webkit-box; " value="'+j.mid+'">'	
						+'				        	<div class="list-group-item list-group-item-action" style="height: 58px; width: 80%; top: 11px; border: none; display: -webkit-box;"> '
						+'							 <div> <img id="sc_pho'+i+'" class="img-circle" alt="Cinque Terre" src="resources/img/aquagram/profilephoto/'+j.follpphoto+'" style="width: 50px; height: 50px; position: center"/></div> '
						+'								<div style="left: 13px; text-align: left;"><h5 style="margin-bottom: 3px; font-weight: bold;">'+j.mid+'</h5><p style="font-size: 7px;">'+j.name+'</p></div>'
						+'								</div> ';
					if(j.follostate=='0'){
						search_item+=	'<button type="button" class="btn btn-primary" id="btn_follower" value="'+j.mid+'" style="position: relative; top: 21px;">팔로우</button>'
						+'</div> ';
					}else {
						search_item+=	'<button type="button" class="btn btn-default" id="btn_folloing" value="'+j.mid+'" style="position: relative; top: 21px;">팔로잉</button>'
							+'</div> ';
						
					}
					$(search_item).appendTo('#search_list').children('button').click(function(){
						/*alert($(this).attr('value'));*/
						let data = {mid:sessionStorage.getItem('userid'), 
								folloid:$(this).attr('value')};
						if($(this).text()=='팔로우'){
							/*alert('??'+$(this).attr('value'));*/
							folloings(data);
							$(this).attr('class','btn btn-default').text('팔로잉');
						}else{
							nufollower(data);
							$(this).attr('class','btn btn-primary').text('팔로우');
						}
						
					});
					if(j.follpphoto.match('http')){
						$('#sc_pho'+i).attr('src',j.follpphoto);
					}else{
						$('#sc_pho'+i).attr('src','resources/img/aquagram/profilephoto/'+j.follpphoto);
					}
				
				});
			});
			
		});
		
	};
	let follower_list=()=>{
		let mid=sessionStorage.getItem('userid');
		let follower_item='';
		$('#myModal').attr('style','display: block; z-index:99999;');
		$('.modal-dialog').attr('class','modal-dialog');
		$('.modal-dialog').attr('style','top:200px;')
		$('.modal-content').attr('style','margin:auto; width: 65%; height: 600px;');
		$('#modal_close_btn').attr('style','z-index:9000;');
		$('.modal-title').text('팔로워');
		$('.modal-footer').remove();
		$('.modal-body').attr('style','height: 90%;');
		$('.modal-body').html('<ul class="nav bs-docs-sidenav" style="overflow:scroll; width:100%; height:100%; padding:10px; background-color: white; border-radius: 6px;  border:1px solid; border-color: #ddd;">'
				+'				 <li>      '
				+'				 	<div id="follower_list">'
				+'					</div>'
				+'				</li>'
				+'		      </ul>');

		$.ajax({
			url: $.ctx()+'/serach/follower/'+mid,
			type: 'get',
			data: JSON.stringify(mid),
			dataType: 'json',
			contentType: 'application/json; charset=UTF-8;',
			success: d=>{
				$.each(d.werlist,(i,j)=>{
					follower_item ='			<div class="item" style="display: -webkit-box; " value="'+j.mid+'">'	
						+'				        	<div class="list-group-item list-group-item-action" style="height: 58px; width: 80%; top: 11px; border: none; display: -webkit-box;"> '
						+'							 <div> <img id="folwer_pto'+i+'" class="img-circle" alt="Cinque Terre" src="resources/img/aquagram/profilephoto/'+j.follpphoto+'" style="width: 50px; height: 50px; position: center"/></div> '
						+'								<div style="left: 13px; text-align: left;"><h5 id="fwuser_'+j.mid+'_'+i+'" style="margin-bottom: 3px; font-weight: bold;" value="'+j.mid+'">'+j.mid+'</h5><p style="font-size: 7px;">'+j.name+'</p></div>'
						+'								</div> '

					if(j.follostate=='0'){
						follower_item+=	'<button type="button" class="btn btn-primary" id="btn_follower" value="'+j.mid+'" style="position: relative; top: 21px;">팔로우</button>'
						+'</div> ';
					}else {
						follower_item+=	'<button type="button" class="btn btn-default" id="btn_folloing" value="'+j.mid+'" style="position: relative; top: 21px;">팔로잉</button>'
							+'</div> ';
					
					}
					$(follower_item).appendTo('#follower_list').children('button').click(function(){
						/*alert($(this).attr('value'));*/
						let data = {mid:sessionStorage.getItem('userid'), 
								folloid:$(this).attr('value')};
						if($(this).text()=='팔로우'){
							/*alert('??'+$(this).attr('value'));*/
							folloings(data);
							$(this).attr('class','btn btn-default').text('팔로잉');
						}else{
							nufollower(data);
							$(this).attr('class','btn btn-primary').text('팔로우');
						}
						
					});
					if(j.follpphoto.match('http')){
						$('#folwer_pto'+i).attr('src',j.follpphoto);
					}else{
						$('#folwer_pto'+i).attr('src','resources/img/aquagram/profilephoto/'+j.follpphoto);
					}
					$('#fwuser_'+j.mid+'_'+i).attr('style','cursor:pointer').click(function(){
						$('#myModal').modal('hide');
						let scahid = $(this).attr('value');
						fous.init(scahid);
					});
					
				});


				
			},error: e=>{
				
			}
			
			
			
		});

	};
	let folloings=(x)=>{
		$.ajax({
			url: $.ctx()+'/regist/folloing',
			type: 'put',
			data: JSON.stringify(x),
			dataType: 'json',
			contentType: 'application/json; charset=UTF-8;',
			success: d=>{
				
			},error:e=>{}
		});
		
		
	};
	let nufollower=(x)=>{
		$.ajax({
			url: $.ctx()+'/delete/unfollower',
			type: 'delete',
			data: JSON.stringify(x),
			dataType: 'json',
			contentType: 'application/json; charset=UTF-8;',
			success: d=>{
				
			},error:e=>{}
		});
	};
	let folloing_list=()=>{
		let mid=sessionStorage.getItem('userid');
		let folloing_item='';
			$('#myModal').attr('style','display: block; z-index:99999;');
			$('.modal-dialog').attr('class','modal-dialog');
			$('.modal-dialog').attr('style','top:200px;')
			$('.modal-content').attr('style','margin:auto; width: 65%; height: 600px;');
			$('#modal_close_btn').attr('style','z-index:9000;');
			$('.modal-title').text('팔로잉');
			$('.modal-footer').remove();
			$('.modal-body').attr('style','height: 90%;');
			$('.modal-body').html('<ul class="nav bs-docs-sidenav" style="overflow:scroll; width:100%; height:100%; padding:10px; background-color: white; border-radius: 6px;  border:1px solid; border-color: #ddd;">'
					+'				 <li>      '
					+'				 	<div id="folloing_list">'
					+'					</div>'
					+'				</li>'
					+'		      </ul>');
			$.ajax({
				url: $.ctx()+'/serach/folloing/'+mid,
				type: 'get',
				data: JSON.stringify(mid),
				dataType: 'json',
				contentType: 'application/json; charset=UTF-8;',
				success: d=>{
					$.each(d.inglist,(i,j)=>{
						folloing_item ='			<div class="item" style="display: -webkit-box;">'	
							+'				        	<div class="list-group-item list-group-item-action" style="height: 58px; width: 80%; top: 11px; border: none; display: -webkit-box;"> '
							+'							 <div> <img id="foling_pto'+i+'" class="img-circle" alt="Cinque Terre" src="resources/img/aquagram/profilephoto/'+j.follpphoto+'" style="width: 50px; height: 50px; position: center"/></div> '
							+'								<div style="left: 13px; text-align: left;"><h5 id="fuser_'+j.mid+'_'+i+'" style="margin-bottom: 3px; font-weight: bold;" value="'+j.mid+'">'+j.mid+'</h5><p style="font-size: 7px;">'+j.name+'</p></div>'
							+'								</div> '
							+'								<button type="button" class="btn btn-default" value="'+j.mid+'" style="position: relative; top: 21px;">팔로잉</button>'
							+'							</div> ';
						
						$(folloing_item).appendTo('#folloing_list').children('button').click(function(){
							let data = {mid:sessionStorage.getItem('userid'), 
									folloid:$(this).attr('value')};
							if($(this).text()=='팔로우'){
								/*alert('??'+$(this).attr('value'));*/
								folloings(data);
								$(this).attr('class','btn btn-default').text('팔로잉');
							}else{
								nufollower(data);
								$(this).attr('class','btn btn-primary').text('팔로우');
								
							}
							nufollower();
						});
						if(j.follpphoto.match('http')){
							$('#foling_pto'+i).attr('src',j.follpphoto);
						}else{
							$('#foling_pto'+i).attr('src','resources/img/aquagram/profilephoto/'+j.follpphoto);
						}
						$('#fuser_'+j.mid+'_'+i).attr('style','cursor:pointer').click(function(){
							$('#myModal').modal('hide');
							let scahid = $(this).attr('value');
							fous.init(scahid);
						});
							
					});

					
				},error: e=>{
					
				}
				
				
				
			});
			
	};
	
	let right_nav_lander=()=>{
		$('#users_list').empty();
		$('#new_users_list').empty();
		let foitem = '';
		let ffoitem = '';
		let mid=sessionStorage.getItem('userid');
		$.ajax({
			url: $.ctx()+'/arti/follo/'+mid,
			type: 'get',
			data: JSON.stringify(mid),
			dataType: 'json',
			contentType: 'application/json; charset=UTF-8;',
			success: d=>{
				$.each(d.follist,(i,j)=>{
					foitem = '			<div class="item" id="item_'+j.artnum+'" style="cursor:pointer; display: -webkit-box; height: 60px;" value="'+j.folloid+'">'	
						+'				        	<div class="list-group-item list-group-item-action" style="height: 58px; width: 76%; top: 11px; border: none; display: -webkit-box;"> '
						+'							 <div> <img id="r_my_pto'+i+'" class="img-circle" alt="Cinque Terre" src="resources/img/aquagram/profilephoto/'+j.follpphoto+'" style="width: 50px; height: 50px; position: center"/></div> '
						+'								<div style="left: 13px; text-align: left;"><h5 style="margin-bottom: 3px; font-weight: bold;">'+j.folloid+'</h5><p style="font-size: 7px;">'+j.name+'</p></div>'
						+'								<div value="'+j.folloid+'" style="position: relative; left: 130px;"><h6>'+j.artdate+'</h6></div>'
						+'								</div> '
						+'							</div> '
						+'							</div> ';

					$(foitem).appendTo('#users_list').attr('style','cursor:pointer').click(function(){
						/*alert('??!!'+$(this).attr('value'));*/
						let scahid = $(this).attr('value');
						fous.init(scahid);
						
					});
					if(j.follpphoto.match('http')){
			
						$('#r_my_pto'+i).attr('src',j.follpphoto);
					}else{
				
						$('#r_my_pto'+i).attr('src','resources/img/aquagram/profilephoto/'+j.follpphoto);
					}
				});

				$.ajax({
					url: $.ctx()+'/arti/subfollo/'+mid,
					type: 'get',
					data: JSON.stringify(mid),
					dataType: 'json',
					contentType: 'application/json; charset=UTF-8;',
					success: d=>{
						$.each(d.follist,(i,j)=>{
							if(j.follostate==0){
								ffoitem = '			<div class="item" style="display: -webkit-box;">'	
									+'				        	<div class="list-group-item list-group-item-action" style="height: 58px; width: 76%; top: 11px; border: none; display: -webkit-box;"> '
									+'							 <div> <img id="rdonw_my_pto'+i+'" class="img-circle" alt="Cinque Terre" src="resources/img/aquagram/profilephoto/'+j.follpphoto+'" style="width: 50px; height: 50px; position: center"/></div> '
									+'								<div style="left: 13px; text-align: left;"><h5 style="margin-bottom: 3px; font-weight: bold;">'+j.mid+'</h5><p style="font-size: 7px;">'+j.name+'</p></div>'
									+'								</div> '
									+'								<button type="button" class="btn btn-primary" value="'+j.mid+'" style="position: relative; top: 21px;">팔로우</button>'
									+'							</div> ';

								$(ffoitem).appendTo('#new_users_list').children('button').click(function(){
									let data = {mid:sessionStorage.getItem('userid'), 
											folloid:$(this).attr('value')};
									if($(this).text()=='팔로우'){
										/*alert('??'+$(this).attr('value'));*/
										folloings(data);
										$(this).attr('class','btn btn-default').text('팔로잉');
									}else{
										nufollower(data);
										$(this).attr('class','btn btn-primary').text('팔로우');
										
									}

								});
								if(j.follpphoto.match('http')){

									$('#rdonw_my_pto'+i).attr('src',j.follpphoto);
								}else{
					
									$('#rdonw_my_pto'+i).attr('src','resources/img/aquagram/profilephoto/'+j.follpphoto);
								}
							}

						});
					
						},error:e=>{}
					
				});
					
				
				
				
			},error:e=>{
				alert('실패!');
				
			}
			
		});

		
//		function fn_dateTimeToFormatted(dt) {
//			var min = 60 * 1000;
//			var c = new Date()
//			var d = new Date(dt);
//			var minsAgo = Math.floor((c - d) / (min));
//
//			var result = {
//				'raw': d.getFullYear() + '-' + (d.getMonth() + 1 > 9 ? '' : '0') + (d.getMonth() + 1) + '-' + (d.getDate() > 9 ? '' : '0') +  d.getDate() + ' ' + (d.getHours() > 9 ? '' : '0') +  d.getHours() + ':' + (d.getMinutes() > 9 ? '' : '0') +  d.getMinutes() + ':'  + (d.getSeconds() > 9 ? '' : '0') +  d.getSeconds(),
//				'formatted': '',
//			};
//
//			if (minsAgo < 60) { // 1시간 내
//				result.formatted = minsAgo + '분 전';
//			} else if (minsAgo < 60 * 24) { // 하루 내
//				result.formatted = Math.floor(minsAgo / 60) + '시간 전';
//			} else { // 하루 이상
//				result.formatted = Math.floor(minsAgo / 60 / 24) + '일 전';
//			};
//
//			return formatDate;
//		};

	};
	
	let feed_infinitemove =()=>{

		let isEnd = false;


			$(document).ready(function(){
				$(window).data('ajaxready',true).scroll(function(){
					if($(window).data('ajaxready')==false) return;
					if($(window).scrollTop() + 600 >=$(document).height()-$(window).height()){
						$(document).ready(function(){
							$('div#loadmoreajaxloader').show();
							$(window).data('ajaxready',false);
							feed_fetchList();
						});
					}		
				})
				
			});
			feed_fetchList(); 


	};
	let feed_fetchList=()=>{
		let isEnd = false;
        if(isEnd == true){
        	return;
        }
        let startNo = $("#leftbar_content").children('#data_wow').last().data("no") || 0;
		let mid =sessionStorage.getItem('userid');
		let page = 0;
		let url = $.ctx()+'/myfeed/'+mid;
		let data = { mid:mid,
				startRow:startNo,
				pageSize:2};
		let userd={};
		$.ajax({
			url: $.ctx()+'/arti/feed/'+data.mid,
			type: 'post',
			data: JSON.stringify(data),
			dataType: 'json',
			contentType: 'application/json; charset=UTF-8;',
			success: d=>{
				  let length = d.ffeed.length;          
				  if( length < 1 ){
                	  isEnd = true;

                  }
                  if(d){
                	  $('div#loadmoreajaxloader').hide();           
                	  $.each(d.ffeed,(i, j)=>{
                		  
                		  feed_renderList(j,i); 

	                  	});


                  }else{
                	  $('div#loadmoreajaxloader').html();
                  }
                  $(window).data('ajaxready', true);

                  
			},
			error: e=>{
				alert('에러!');
			}
				
		});

	};

	let settags = (x)=>{
			
			
	};
	let feed_renderList =(x,a)=>{
				let feeditem = '<div class="wow fadeInDown" id="data_wow" style="border-radius: 6px;" data-no="'+x.rownum+'" >'
					+'					    <div class="panel panel-default">'
					+'						        <div class="heading">'
					+' 			<div class="item" id="'+x.artnum+'" style="height: 58px; border: none; margin: 8px;"> ' 
					+'  	<img class="img-circle" id="feed_my_pto'+x.rownum+'" alt="Cinque Terre" src="resources/img/aquagram/profilephoto/'+x.profilephoto+'" style="width: 50px; height: 50px; position: center"><div><h5 id="user_'+x.mname+'_'+x.rownum+'" style="top:-49px; left: 60px" value="'+x.mname+'">'+x.mname+'</h5></div>	'							  							
					+' 			</div>'
					+'						        <div class="body">'
					+'						         <img src="resources/img/aquagram/articles/'+x.artphoto+'" style="display: block; margin: 0px auto; width: 100%;">'
					+'						        </div>'
					+'						        <div class="footer">'
					+'						         <div id="comments_1">'
					+'						         	<!-- Right-aligned -->'
					+'									<div class="media">'
					+'									  <div class="media-body" style="text-align: left; padding-top: 15px; padding-bottom: 15px;">'
					+'									   	<div> <h4 class="media-heading" style="margin-left: 5px">'+x.content+'<div id="tags_'+x.artnum+'"></div></h4></div>'
					+'									   	<div> <h6 class="media-heading" style="margin-left: 5px">'+x.artdate+'</h6></div>'
					+'									  </div>'
					+'									</div>'
					+'						         </div>'
					+'						          <div id="feedcomments_nav">'
					+'    <ul class="nav bs-docs-sidenav" id="feedcomments" style="-ms-overflow-style: none; overflow:scroll; width:100%; height:130px; border-top: none;">'
					+'						<li class="comlist_'+x.rownum+'">'
					+'						</li> '
				    +'          				</ul>'						
					+'							    	</div>'
					+'							    	<div class="input-group" id="input-group_'+x.rownum+'">'
					+'										<input style="border: none; background: transparent;" id="upcomment_'+x.artnum+'" type="text" class="form-control" name="" placeholder="댓글입력">'
					+'										<span style="border: none; background: transparent; cursor:pointer;" class="input-group-addon" value="'+x.artnum+'"><p>게시</p></span>'
					+'									    </div>'
					+'									</div>'
					+'									</div>'
					+'									</div>'
					+'						        </div>';
				
				$(feeditem).appendTo('#leftbar_content');
			
				if(x.profilephoto.match('http')){
					
					$('#feed_my_pto'+x.rownum).attr('src',x.profilephoto);
				}else{
					
					$('#feed_my_pto'+x.rownum).attr('src','resources/img/aquagram/profilephoto/'+x.profilephoto);
				}

				
				$('#user_'+x.mname+'_'+x.rownum).attr('style','cursor:pointer ;top:-49px; left: 60px').click(function(){
					
					let scahid = $(this).attr('value');
					fous.init(scahid);
				});
				
				let tags = x.tag;
				if(tags==null){
					$('#tags_'+x.artnum).append('&nbsp;<a> </a>');
					
				}else{
					$('#tags_'+x.artnum).append('&nbsp;<a>'+tags+'</a>');
					let a = x.tag.split('#');
					$('#tags_'+x.artnum).attr('value',a[1])
				}
				$('#tags_'+x.artnum).click(()=>{
					let company = $('#tags_'+x.artnum).attr('value');
	   				$.ajax({
	   		    		url:$.ctx()+'/products/'+ company,
	   		    		type:'POST',
	   		    		data : JSON.stringify(company),
	   		    		dataType :'json',
	   		    		contentType :'application/json',
	   		    		success : d=>{   		    			
	   		    			let pro ={pronum:d.product.pronum,proname:d.product.proname,price:d.product.price,company:d.product.company,address:d.product.address,category:d.product.category,
	   		    					  proimg:d.product.proimg,fishname:d.product.fishname,phone:d.product.phone,lat:d.product.lat,lng:d.product.lng, today:d.today, realtoday:d.realtoday,calday:d.calday,callist:d.callist,calheader:d.calheader,prolist:d.prolist};
	   		    			$('.instacss').remove();
	   		    		    $(rescss).appendTo('head');
	   		    		    $(window).data('ajaxready', false);
	   		    		    $(window).data('ajaxready2', false);
	   		    		    $(window).data('ajaxready3', false);
	   		    		    $(window).data('resajaxready',"undefined");
	   		    			eunyeong.detail(pro);
	   		    		},
	   		    		error :e=>{
	   		    			
	   		    		}
	   				});
				})

				 /*let tagcut = x.tag;
				let settag = '';
				if(x.tag.split('.') == null){
					x.tag ='';
					return
				}else{
					tagcuts= x.tag.split('.');
					$.each(tagcuts,(i,j)=>{
						settag += '<a>'+tagcuts[i]+'</a>';
						
					});	
					
				}
				$(settag).appendTo('#tags_'+x.artnum);*/
				

				
  				$.getJSON($.ctx()+'/comments/list/'+x.artnum,d=>{
					let comitem ='';
					$.each(d.cls,(i,j)=>{
						comitem =	'			<div class="item" style="display: -webkit-box; " value="'+j.comid+'">'	
						+'				        	<div class="list-group-item list-group-item-action" style="height: 58px; width: 100%; top: 11px; border: none; display: -webkit-box;"> '
						+'							 <div> <img id="co_pto'+x.rownum+'_'+i+'" class="img-circle" alt="Cinque Terre" src="resources/img/aquagram/profilephoto/'+j.comprophoto+'" style="width: 50px; height: 50px; position: center"/></div> '
						+'								<div style="left: 13px; text-align: left;"><h5 style="margin-bottom: 3px; font-weight: bold;">'+j.comid+'</h5><p style="font-size: 7px;">'+j.cmname+'</p></div>'
						+'							<div style="position: relative; left: 30px;"><h5>'+j.comm+'</h5></div>'
						+'								</div> '		
						+'						</div> ';	
						$(comitem).appendTo('.comlist_'+x.rownum);
						if(j.comprophoto.match('http')){
							$('#co_pto'+x.rownum+'_'+i).attr('src',j.comprophoto);
						}else{
							$('#co_pto'+x.rownum+'_'+i).attr('src','resources/img/aquagram/profilephoto/'+j.comprophoto);
						}
					});

					
	  				$('#input-group_'+x.rownum).children('span').click(function(e){
						e.preventDefault();
						let com_data = {
								comid : sessionStorage.getItem('userid'),
								comm : $('#upcomment_'+$(this).attr('value')).val(),
								titleseq : $(this).attr('value')
						};
						$.ajax({
							url: $.ctx()+'/regist/comm/'+com_data.comid,
							type: 'post',
							data: JSON.stringify(com_data),
							dataType: 'json',
							contentType: 'application/json; charset=UTF-8;',
							success: d=>{
								
								$('#input-group_'+x.rownum).children('input').val('');
								let incomm =	'			<div class="item" style="display: -webkit-box; " value="'+d.comlist.comid+'">'	
								+'				        	<div class="list-group-item list-group-item-action" style="height: 58px; width: 100%; top: 11px; border: none; display: -webkit-box;"> '
								+'							 <div> <img class="img-circle commentimg" alt="Cinque Terre" src="'+sessionStorage.getItem('userpo')+'" style="width: 50px; height: 50px; position: center"/></div> '
								+'								<div style="left: 13px; text-align: left;"><h5 style="margin-bottom: 3px; font-weight: bold;">'+d.comlist.comid+'</h5><p style="font-size: 7px;">'+d.comlist.cmname+'</p></div>'
								+'							<div style="position: relative; left: 30px;"><h5>'+d.comlist.comm+'</h5></div>'
								+'								</div> '		
								+'						</div> ';	
								$('.comlist_'+x.rownum).prepend(incomm);
								if(sessionStorage.getItem('userpo').match('http')){
									$('.commentimg').attr('src',sessionStorage.getItem('userpo'));
								}else{
									$('.commentimg').attr('src','resources/img/aquagram/profilephoto/'+sessionStorage.getItem('userpo'));
								}
								
							},error:e=>{}
						});
						
						
					});
					
					
				});

				
};
let nav =()=>{
    /*  General 네비게이션     */
    $('.home').click(e=>{
        
        
        $('.rescss').remove();
        $('.instacss').remove();
        $(homecss).appendTo('head');
        location.assign(''+$.ctx()+'/');
        app.init();
        
    });
    $('.ocean').click(e=>{
    e.preventDefault();
    $('.instacss').remove();
    $(rescss).appendTo('head');
    $(window).data('ajaxready', false);
    $(window).data('ajaxready2', false);
    $(window).data('ajaxready3', false);
    $(window).data('resajaxready',"undefined");
    eunyeong.init('ocean')
    });
    
    $('.river').click(e=>{
    e.preventDefault();
    $('.instacss').remove();
    $(rescss).appendTo('head');
    $(window).data('ajaxready', false);
    $(window).data('ajaxready2', false);
    $(window).data('ajaxready3', false);
    $(window).data('resajaxready',"undefined");
    eunyeong.init('river')
    });
    
    $('.hotel').click(e=>{
    e.preventDefault();
    $('.instacss').remove();
    $(rescss).appendTo('head');
    $(window).data('ajaxready', false);
    $(window).data('ajaxready2', false);
    $(window).data('ajaxready3', false);
    $(window).data('resajaxready',"undefined");
    eunyeong.init('hotel')
    });
    $('.newsfeed').click(e=>{
    e.preventDefault();
    $('.rescss').remove();
    $(instacss).appendTo('head');
    jeonguk.init();
    });
    $('.mypage').click(e=>{
    e.preventDefault();
    $('.instacss').remove();
    $(rescss).appendTo('head');
    $(window).data('ajaxready', false);
    $(window).data('ajaxready2', false);
    $(window).data('ajaxready3', false);
    $(window).data('resajaxready',"undefined");
    eunyeong.init('mypage') 
        
    });
    $('.logout').click(function(){
		Kakao.Auth.logout(function(){
			sessionStorage.removeItem('userid');
			sessionStorage.removeItem('userpo');
			sessionStorage.removeItem('kakaosession');
			location.assign(''+$.ctx()+'/');
		});
	})
}
	let css = ()=>{
		/* head css  */
		 homecss = '<link class="homecss" rel="stylesheet" type="text/css" href="'+$.ctx()+'/resources/css/home/homemain.css" />'
			+'<link class="homecss" href="https://fonts.googleapis.com/css?family=Raleway:300,400,600,600i,700" rel="stylesheet">'
			+'<link class="homecss" href="'+$.ctx()+'/resources/css/home/style.css" rel="stylesheet">';
		 rescss ='<link class="homecss" href="'+$.ctx()+'/resources/css/home/responsive.css" rel="stylesheet">'
    	 +'<link class="homecss" href="'+$.ctx()+'/resources/css/home/swiper.min.css" rel="stylesheet">'
    	 +'<link class="rescss" rel="stylesheet" type="text/css" href="'+$.ctx()+'/resources/css/reservation/modal.css"> '
    	 +'<link class="rescss" rel="stylesheet" href="'+$.ctx()+'/resources/css/reservation/prdpay.css">';
		 instacss =' <link class="instacss" rel="stylesheet" type="text/css" href="'+$.ctx()+'/resources/css/aquagram/style.css">'
			 +'  <link class="instacss" rel="stylesheet" type="text/css" href="'+$.ctx()+'/resources/css/aquagram/animate.css">'
			 +'  <link class="instacss" rel="stylesheet" type="text/css" href="'+$.ctx()+'/resources/css/aquagram/structure.css">'
			 +'  <link class="instacss" rel="stylesheet" type="text/css" href="'+$.ctx()+'/resources/css/aquagram/docs.min.css"> '
			 +'  <link class="instacss" rel="stylesheet" type="text/css" href="'+$.ctx()+'/resources/css/aquagram/default_css.css">';
			 
			 
	}

	
	
	
	return {init:init }
	
})();