var fous = fous || {};
fous =(()=>{
	let homecss,admincss,rescss,instacss,foid;
	let init =(x)=>{
		foid = x;
		onCreate(x);
	};
	let onCreate =(x)=>{
		setContentView(x);
	};
	let setContentView =(x)=>{
		$.when(
				$.getScript($.js()+'/component/jwcompo.js'),
				$.getScript($.js()+'/aquagram/auth.js'),
				$.getScript($.js()+'/aquagram/arti.js'),
				$.getScript($.js()+'/reservation/eunyeong.js')
			).done(()=>{
				$(window).data('ajaxready',false);
				fous_default_loader(x);
				
				
			});  
		
		
	};
	
	let fous_default_loader=(x)=>{
		$('#donw_content').html(jwcompo.insta_base());
		$('.instagram-wrap').attr('style','background-color: white;');
		$('#donw_content').attr('style','background-color: white;');
		$('head').after(jwcompo.photo_feed_css_hover());
		feed_my();
		move();
		infinitemove(x);
		
	};
	let move =()=>{
		$('#feed_fv').attr('style','cursor:pointer').click(function(e){
			e.preventDefault();
			$('.instagram-wrap').empty();
			$('#donw_content').append('<div id="leftbar_content" class="col-md-8"></div>');
			$('<div id="right_nav" class="col-md-4" role="complementary"><nav id="right_nav_cont" class="bs-docs-sidebar hidden-print hidden-xs hidden-sm affix-top" data-spy="affix"></div></div>').appendTo('#donw_content');
			$(jwcompo.left_content()).appendTo('#leftbar_content');
			$(jwcompo.right_nav()).appendTo('#right_nav_cont');
			$('#leftbar_content').empty();
/*			$('#leftbar_content').empty();
			$('#right_nav').empty();*/
			auth.init();
		});
		
	};
	
	let feed_my=()=>{
		$('head').children('style').empty();
	};
	
/*	let fous_mynavd =(x)=>{
		
		 $('#my_fv').text(x[0].artcount);
		  $('#followerid').text(x[0].followerCount);
		  $('#folloingid').text(x[0].folloingCount);
			//$('#userimg').attr('src','resources/img/aquagram/profilephoto/'+d.nav.profilephoto);
		  $('#navmypage').html('<img id="userimg" class="img-circle" alt="Cinque Terre" src="resources/img/aquagram/profilephoto/'+x[0].userphoto+'" '
					+'style="width: 50px; height: 50px; position: center;"/>'+x[0].userid+'</div></li>');
		
	};*/
let infinitemove =(x)=>{
		
		let isEnd = false;

		$(function(){
			$(document).ready(function(){
				$(window).data('ajaxready3',true).scroll(function(){
					if($(window).data('ajaxready3')==false) return;
					if($(window).scrollTop() + 300>=$(document).height()-$(window).height()){
						$(document).ready(function(){
							$('div#loadmoreajaxloader3').show();
							$(window).data('ajaxready3',false);
							fous_fetchList();
						});
							
						
					}		
				})
				
			});
			fous_fetchList(x); 
		});
		
		let fous_fetchList=()=>{
			//alert('들어옴??'+foid);
	        if(isEnd == true){
	       
	        	return;
	        }
	        let startNo = $("#instafeed").children('.feeds').last().data("no") || 0;
			let mid = foid;
			let page = 0;
			let url = $.ctx()+'/myfeed/'+mid;
			let data = { mid:foid,
					startRow:startNo,
					pageSize:6};
			let userd={};
			
			$.ajax({
				url: url,
				type: 'post',
				data: JSON.stringify(data),
				dataType: 'JSON',
				contentType: 'application/json; charset=UTF-8;',
				success: d=>{
					  let length = d.myList.length;
					  //alert(length);
	                  if( length < 3 ){
	                	  isEnd = true;
	        
	                  }
	                  if(d){
	           
	                	  $('div#loadmoreajaxloader3').hide();
	                	  $.each(d.myList,(i, j)=>{
	                		  userd[i] = {userid: j.mid,
	            				  		userphoto:j.userpo,
	            				  		artcount:j.artCount,
	            				  		followerCount:j.followerCount,
	            				  		folloingCount:j.folloingCount};
/*	 	                	 if(j.mid !== ''){
	 	                		//fous_mynavd(userd);
		                	 }*/
	                		  fous_renderList(false, j); 
		                	 
		                  	});
	                  }else{
	                	  $('div#loadmoreajaxloader3').html();
	                  }
	                  $(window).data('ajaxready3', true);
				},
				error: e=>{
					alert('에러!');
				}
					
			});
			
		};
	};


	
	let fous_renderList =(mode,x)=>{
		let box = '<div class="feeds" data-no="'+x.rownum+'" >'
				+'			<div id="'+x.artnum+'" class="col-xs-12 col-sm-6 col-md-4 col-lg-3">'
			+'			<a src="resources/img/aquagram/articles/'+x.artphoto+'.'+x.extension+'">'
			+'			<div class="img-featured-container">'
			+'			<div class="img-backdrop"></div>'
			+'			<div class="description-container">'
			+'			<p class="caption">'+x.content+'</p>'
			+'			<span class="likes"><i class="glyphicon glyphicon-heart"></i></span>'
			+'			<span id="comtag" class="comments"><i class="glyphicon glyphicon-comment">'+x.comcount+'</i></span>'
			+'			</div>'
			+'			<img src="resources/img/aquagram/articles/'+x.artphoto+'.'+x.extension+'" id="'+x.artnum+'" class="img-responsive">'
			+'			</div>'
			+'			</a>'
			+'			</div>'
			+'			</div>';
	
		   
           $("#instafeed").append(box); 
           $('#'+x.artnum).click(function(){
       		   $('.photo-box').attr('style','margin:-26px 0px 30px -29px');
        	   $('#instafeed').children('.feeds').attr('data-toggle','modal').attr('data-target','#myModal3');
        	   fous_detail(x.artnum);

           });
		
	};
	
	let fous_detail =(x)=>{
		$('#change_modal_3').empty();	
		let comlist='';
		$.ajax({
			url: $.ctx()+'/arti/detail/'+x,
			type: 'post',
			data: JSON.stringify(x),
			dataType: 'json',
			contentType: 'application/json; charset=UTF-8;',
			success: d=>{
				$(window).data('ajaxready', false);
				$('#myModal3').attr('style','display: block; z-index:99999;');
				$('#change_modal_3').attr('style','top: 200px;');
				$('#change_modal_3').attr('class','modal-dialog modal-lg');
				$('.modal-content3').attr('style','margin:auto;');
				$('.modal-header3').hide();
				$('.modal-body3').hide();
				$('.modal-footer3').remove();
				$('#change_modal_3').html(
						'        <div class="modal-body3">'
						+'          <div  class="col-sm-8" style="height: 600px; display: block; left: 15px;"><img src="resources/img/aquagram/articles/'+d.als.artphoto+'.'+d.als.extension+'" width="600" height="600"></div>'
						+'          <div class="col-sm-4" style="background-color:#fff; height: 600px; ">'
						+'              <div class="row" id="user_info" style="padding-bottom: 7px; border-bottom: 1px solid #ddd;">'
						+'                    <div class="group-item" style="height: 58px; border: none; margin-top: 15px; margin-left: 0px; display: inline-flex;">'
						+'                        <img id="ta_pto" class="img-circle" alt="Cinque Terre" src="resources/img/aquagram/profilephoto/'+d.als.profilephoto+'" style="width: 50px; height: 50px; position: center"/>'
						+'                        <div style="margin-left: 11px;"><h5 style="top:-5px; left: -1px; font-weight:bold; margin-bottom: 0px;" >'+d.als.mid+'</h5><div style="font-size: 5px;">'+d.als.mname+'</div></div>'
						+'                            <div style="top:-55px; left: 60px; font-size: 5px; display:-webkit-inline-box;"> </div>'
						+'                              <div style="right: 0"><h5 style="top: 0px; left: -10px; font-weight:bold; margin-left: 135px;" ><i class="glyphicon glyphicon-option-horizontal"></i></h5></div>'
						+'                        </div> '
						+'                    </div> '
						+'           <div class="row">'
						+'    <ul class="nav bs-docs-sidenav" style="-ms-overflow-style: none; overflow:scroll; width:100%; height:335px; border:1px solid #ddd; border-top: none;">'
						+'     		<div id="item" style="top: 5px;">'
						+'                  <div class="list-group-item list-group-item-action" id="comments_my" style="height: 58px; border: none; display: -webkit-box;"> '
						+'                <img id="ta_pto_down" class="img-circle" alt="Cinque Terre" src="resources/img/aquagram/profilephoto/'+d.als.profilephoto+'" style="width: 40px; height: 40px; position: center"/>'
						+'                 <div style="display: -webkit-box;"><h5 style="top:0px; left: 7px; font-weight:bold;">'+d.als.mid+'</h5><div><h6 id="contag" style="left: 15px; width: 100%; text-align: left;">'+d.als.content+'<br></h6></div></div>'
//						+'                   <div style="font-size: 5px; left: 105px; top: 8px;">'+d.als.artdate+'</div>'
						+'                </div> '
						+'              </div> '
						+'         <li>'
						+'         <div class="comments_list_'+x.artnum+'" id="comments_list_'+x.artnum+'">'
						+'             </div>               '
						+'        </li>'
						+'          </ul>'
						+'            </div>'
						+'				<div sytle="height: 147px;">	'
						+'				</div>		'
						+'							    	<div class="input-group" id="input-group_'+d.als.rownum+'">'
						+'										<input style="border: none; background: transparent;" id="dicomment_'+d.als.artnum+'" type="text" class="form-control" name="" placeholder="댓글입력">'
						+'										<span style="border: none; background: transparent; cursor:pointer;" class="input-group-addon" value="'+d.als.artnum+'"><p>게시</p></span>'
						+'									    </div>'
						+'									</div>'
						+'        </div>'
						+'    </div>'
						+'  </div>'
						+'</div>');
				if(d.als.profilephoto.match('http')){
					$('#ta_pto').attr('src',d.als.profilephoto);
					$('#ta_pto_down').attr('src',d.als.profilephoto);
				}else{
					$('#ta_pto').attr('src','resources/img/aquagram/profilephoto/'+d.als.profilephoto);
					$('#ta_pto_down').attr('src','resources/img/aquagram/profilephoto/'+d.als.profilephoto);
				}
				
				$.each(d.tls,(i,j)=>{
					$('#contag').append('&nbsp;<a>'+j.tagname+'</a>');
				});
				$.each(d.cls,(i,j)=>{
					comlist =					'			<div class="item" style="display: -webkit-box; " value="'+j.comid+'">'	
					+'				        	<div class="list-group-item list-group-item-action" style="height: 58px; width: 100%; top: 11px; border: none; display: -webkit-box;"> '
					+'							 <div> <img id="ta_pto_down'+i+'" class="img-circle" alt="Cinque Terre" src="resources/img/aquagram/profilephoto/'+j.comprophoto+'" style="width: 50px; height: 50px; position: center"/></div> '
					+'								<div style="left: 13px; text-align: left;"><h5 style="margin-bottom: 3px; font-weight: bold;">'+j.comid+'</h5><p style="font-size: 7px;">'+j.cmname+'</p></div>'
					+'							<div style="position: relative; left: 30px;"><h5>'+j.comm+'</h5></div>'
					+'								</div> '		
					+'						</div> ';
					$(comlist).appendTo('#comments_list_'+x.artnum);
					if(j.comprophoto.match('http')){
						$('#ta_pto_down'+i).attr('src',j.comprophoto);
					}else{
						$('#ta_pto_down'+i).attr('src','resources/img/aquagram/profilephoto/'+j.comprophoto);
					}
					
				});
				
				
				$('#input-group_'+d.als.rownum).children('span').click(function(e){
					
					e.preventDefault();
					//alert('이거 크릭한거 맞아?' + $('#dicomment_'+$(this).attr('value')).val());
					//alert('글번호는?'+$(this).attr('value'));
					let com_data = {
							comid : sessionStorage.getItem('userid'),
							comm : $('#dicomment_'+$(this).attr('value')).val(),
							titleseq : $(this).attr('value')
					};
					
					$.ajax({
						url: $.ctx()+'/regist/comm/'+com_data.comid,
						type: 'post',
						data: JSON.stringify(com_data),
						dataType: 'json',
						contentType: 'application/json; charset=UTF-8;',
						success: d=>{
							//alert('??'+d.comlist);
							$('#input-group_'+x.rownum).children('input').val('');
							let dincomm =	'			<div class="item" style="display: -webkit-box; " value="'+d.comlist.comid+'">'	
							+'				        	<div class="list-group-item list-group-item-action" style="height: 58px; width: 100%; top: 11px; border: none; display: -webkit-box;"> '
							+'							 <div> <img class="img-circle inputcomm" alt="Cinque Terre" src="resources/img/aquagram/profilephoto/'+d.comlist.comprophoto+'" style="width: 50px; height: 50px; position: center"/></div> '
							+'								<div style="left: 13px; text-align: left;"><h5 style="margin-bottom: 3px; font-weight: bold;">'+d.comlist.comid+'</h5><p style="font-size: 7px;">'+d.comlist.cmname+'</p></div>'
							+'							<div style="position: relative; left: 30px;"><h5>'+d.comlist.comm+'</h5></div>'
							+'								</div> '		
							+'						</div> ';	
							$('.comments_list_'+x.rownum).prepend(dincomm);
							if(d.comlist.comprophoto.match('http')){
								$('.inputcomm').attr('src',d.comlist.comprophoto);
							}else{
								$('.inputcomm').attr('src','resources/img/aquagram/profilephoto/'+d.comlist.comprophoto);
							}
							
						},error:e=>{}
					});
					
					
				});
			},
			error:e=>{
				alert('에러!');
			}
			
			
		});

		
	};
	
	
	return {init:init};
	
	
})();