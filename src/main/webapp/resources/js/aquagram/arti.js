var arti = arti || {};
arti =(()=>{
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
				$.getScript($.js()+'/reservation/eunyeong.js')
			).done(()=>{
				
				arti_default_loader();
			});  
		
		
	};
	
	let arti_default_loader=()=>{
		$("#wrapper").scrollTop(0);
		$(window).data('ajaxready',false);
		$('#donw_content').html(jwcompo.insta_base());
		$('.instagram-wrap').attr('style','background-color: white;');
		$('#donw_content').attr('style','background-color: white;');
		$('#photo_feed_css_hover').remove();
		$('head').after(jwcompo.photo_feed_css_hover());
		feed_my();
		move();
		if(typeof $(window).data('ajaxready2') == "undefined"){
		
			infinitemove();
			$(window).data('ajaxready2',false);
			
		}else{
			fetchList();
		}
		
		arti_img_upload();
		
		
	};
	let move =()=>{
		$('#feed_fv').attr('style','cursor:pointer').click(function(e){
			e.preventDefault();
			$(window).data('ajaxready',false);
			$(window).data('ajaxready2',false);
			$('#photo_feed_css_hover').remove();
			$('.instagram-wrap').empty();
			$('#donw_content').append('<div id="leftbar_content" class="col-md-8"></div>');
			$('<div id="right_nav" class="col-md-4" role="complementary"><nav id="right_nav_cont" class="bs-docs-sidebar hidden-print hidden-xs hidden-sm affix-top" data-spy="affix"></div></div>').appendTo('#donw_content');
/*			$(jwcompo.left_content()).appendTo('#leftbar_content');
			$(jwcompo.right_nav()).appendTo('#right_nav_cont');*/
/*			$('#leftbar_content').empty();
			$('#right_nav').empty();*/
			auth.init();
		});
		
	};
	
	let feed_my=()=>{
		$('head').children('style').empty();
	};
	
	let infinitemove =()=>{
		
		
			$(document).ready(function(){
				$(window).data('ajaxready2',true).scroll(function(){
					if($(window).data('ajaxready2')==false) return;
					if($(window).scrollTop() + 600>=$(document).height()-$(window).height()){
						$(document).ready(function(){
							$('div#loadmoreajaxloader2').show();
							$(window).data('ajaxready2',false);
							fetchList();
						});
							
						
					}		
				})
				
			});
			fetchList(); 
		
		
		
	};
	let fetchList=()=>{
		let isEnd = false;
        if(isEnd == true){
       
        	return;
        }
        let startNo = $("#instafeed").children('.feeds').last().data("no") || 0;
		let mid = sessionStorage.getItem('userid');
		let page = 0;
		let url = $.ctx()+'/myfeed/'+mid;
		let data = { mid:mid,
				startRow:startNo,
				pageSize:6};

		
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
           
                	  $('div#loadmoreajaxloader2').hide();
                	  $.each(d.myList,(i, j)=>{
	                	  renderList(false, j); 
	                	 
	                  	});
                  }else{
                	  $('div#loadmoreajaxloader2').html();
                  }
                  $(window).data('ajaxready2', true);
			},
			error: e=>{
				alert('에러!');
			}
				
		});
		
	};


	
	let renderList =(mode,x)=>{
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
        	   arti_detail(x.artnum);

           });
		
	};
	
	let arti_detail =(x)=>{
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
				$('#change_modal_3').attr('style','top:200px;');
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
						+'                        <img id="user_info'+x.rownum+'" class="img-circle" alt="Cinque Terre" src="resources/img/aquagram/profilephoto/'+d.als.profilephoto+'" style="width: 50px; height: 50px; position: center"/>'
						+'                        <div style="margin-left: 11px;"><h5 style="top:-5px; left: -1px; font-weight:bold; margin-bottom: 0px;" >'+d.als.mid+'</h5><div style="font-size: 5px;">'+d.als.mname+'</div></div>'
						+'                            <div style="top:-55px; left: 60px; font-size: 5px; display:-webkit-inline-box;"> </div>'
						+'                              <div style="right: 0"><h5 style="top: 0px; left: -10px; font-weight:bold; margin-left: 135px;" ><i class="glyphicon glyphicon-option-horizontal"></i></h5></div>'
						+'                        </div> '
						+'                    </div> '
						+'           <div class="row">'
						+'    <ul class="nav bs-docs-sidenav" style="-ms-overflow-style: none; overflow:scroll; width:100%; height:335px; border:1px solid #ddd; border-top: none;">'
						+'     		<div id="item" style="top: 5px;">'
						+'                  <div class="list-group-item list-group-item-action" id="comments_my" style="height: 58px; border: none; display: -webkit-box;"> '
						+'                <img id="user_info_down'+x.rownum+'" class="img-circle" alt="Cinque Terre" src="resources/img/aquagram/profilephoto/'+d.als.profilephoto+'" style="width: 40px; height: 40px; position: center"/>'
						+'                 <div style="display: -webkit-box;"><h5 style="top:0px; left: 7px; font-weight:bold;">'+d.als.mid+'</h5><div><h6 id="contag" style="left: 15px; width: 90%; display: initial;">'+d.als.content+'</h6></div></div>'
						+'                   <div style="font-size: 5px; left: 105px; top: 8px;">'+d.als.artdate+'</div>'
						+'                </div> '
						+'              </div> '
						+'         <li>'
						+'         <div class="comments_list_'+x.rownum+'" id="comments_list_'+x.rownum+'">'
						+'             </div>               '
						+'        </li>'
						+'          </ul>'
						+'            </div>'
						+'				<div sytle="height: 147px;">	'
						+'				</div>		'
						+'							    	<div class="input-group" id="input-group_'+x.rownum+'">'
						+'										<input style="border: none; background: transparent;" id="dicomment_'+d.als.artnum+'" type="text" class="form-control" name="" placeholder="댓글입력">'
						+'										<span style="border: none; background: transparent; cursor:pointer;" class="input-group-addon" value="'+d.als.artnum+'"><p>게시</p></span>'
						+'									    </div>'
						+'									</div>'
						+'        </div>'
						+'    </div>'
						+'  </div>'
						+'</div>');
				
				if(d.als.profilephoto.match('http')){
					$('#user_info_down'+x.rownum).attr('src',d.als.profilephoto);
					$('#user_info'+x.rownum).attr('src',d.als.profilephoto);
				}else{
					$('#user_info_down'+x.rownum).attr('src','resources/img/aquagram/profilephoto/'+d.als.profilephoto);
					$('#user_info'+x.rownum).attr('src','resources/img/aquagram/profilephoto/'+d.als.profilephoto);
				}
				$.each(d.tls,(i,j)=>{
					if(j.tagname==null){
						$('#contag').append('&nbsp;<a> </a>');
					}
					$('#contag').append('&nbsp;<a>'+j.tagname+'</a>');
				});
				$.each(d.cls,(i,j)=>{
					comlist =					'			<div class="item" style="display: -webkit-box; " value="'+j.comid+'">'	
					+'				        	<div class="list-group-item list-group-item-action" style="height: 58px; width: 100%; top: 11px; border: none; display: -webkit-box;"> '
					+'							 <div> <img  id="co_pho'+i+'" class="img-circle" alt="Cinque Terre" src="resources/img/aquagram/profilephoto/'+j.comprophoto+'" style="width: 50px; height: 50px; position: center"/></div> '
					+'								<div style="left: 13px; text-align: left;"><h5 style="margin-bottom: 3px; font-weight: bold;">'+j.comid+'</h5><p style="font-size: 7px;">'+j.cmname+'</p></div>'
					+'							<div style="position: relative; left: 30px;"><h5>'+j.comm+'</h5></div>'
					+'								</div> '		
					+'						</div> ';
					$(comlist).appendTo('#comments_list_'+x.rownum);
					if(j.comprophoto.match('http')){
						$('#co_pho'+i).attr('src',j.comprophoto);
					}else{
						$('#co_pho'+i).attr('src','resources/img/aquagram/profilephoto/'+j.comprophoto);
					}
				});

				$('#input-group_'+x.rownum).children('span').click(function(e){
					e.preventDefault();
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
							+'							 <div> <img id="n_co_pho'+i+'" class="img-circle" alt="Cinque Terre" src="'+sessionStorage.getItem('userpo')+'" style="width: 50px; height: 50px; position: center"/></div> '
							+'								<div style="left: 13px; text-align: left;"><h5 style="margin-bottom: 3px; font-weight: bold;">'+d.comlist.comid+'</h5><p style="font-size: 7px;">'+d.comlist.cmname+'</p></div>'
							+'							<div style="position: relative; left: 30px;"><h5>'+d.comlist.comm+'</h5></div>'
							+'								</div> '		
							+'						</div> ';	
							$('.comments_list_'+x.rownum).prepend(dincomm);
							if(sessionStorage.getItem('userpo').match('http')){
								$('#n_co_pho'+i).attr('src',sessionStorage.getItem('userpo'));
							}else{
								$('#n_co_pho'+i).attr('src','resources/img/aquagram/profilephoto/'+sessionStorage.getItem('userpo'));
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
	let arti_img_upload =()=>{
		$('#art_upload').attr('style','cursor:pointer').attr('data-toggle','modal').attr('data-target','#myModal').click(function(e){
			e.preventDefault();
			$('#myModal').attr('style','display: block; z-index:99999;');
			$('.modal-dialog').attr('class','modal-dialog');
			$('.modal-dialog').attr('style','top:200px;')
			$('.modal-content').attr('style','margin:auto;');
			$('.modal-header').hide();
			$('.modal-body').hide();
			$('.modal-footer').remove();
			$('#change_modal_2').attr('sytle','top: 200px; width: 40%;').html('<div class="modal-body">'
					+'          <div class="col-sm-4" style="background-color:#fff; height: 600px; width: 100%; ">'
					+'            	  <div class="row" id="user_info" style="padding-bottom: 7px; border-bottom: 1px solid #ddd;">'
					+'						                    <div class="group-item" style="height: 58px; border: none; margin-top: 15px; margin-left: 0px; display: inline-flex;">'
					+'						                        <img class="imguploadart img-circle" alt="Cinque Terre" src="resources/img/aquagram/profilephoto/'+sessionStorage.getItem('userpo')+'" style="width: 50px; height: 50px; position: center"/>'
					+'						                        <div style="margin-left: 11px;"><h5 style="top:-5px; left: -1px; font-weight:bold; margin-bottom: 0px;" >'+sessionStorage.getItem('userid')+'</h5><div style="font-size: 5px;">'+sessionStorage.getItem('userid')+'</div></div>'
					+'						                            <div style="top:-55px; left: 60px; font-size: 5px; display:-webkit-inline-box;"> </div>'
					+'						                              <div style="right: 0"><h5 style="top: 0px; left: -10px; font-weight:bold; margin-left: 135px;" ><i class="glyphicon glyphicon-option-horizontal"></i></h5></div>'
					+'						                        </div> '
					+'						                    </div> '
					+'						           <div class="row">'
					+'						    <ul class="nav bs-docs-sidenav" style="-ms-overflow-style: none; overflow:scroll; width:100%; height:400px; border:1px solid #ddd; border-top: none;">'
					+'						     		<div style="top: 5px;">'
					+'										    <div class="form-group">'
					+'										      <label for="focusedInput">tag</label>'
					+'										      <input class="form-control" id="taginput" type="text">'
					+'										    </div>'
					+'										  	<div class="form-group">'
					+'										      <label for="focusedInput">content</label>'
					+'										      <textarea class="form-control" rows="8" cols=8 id="commentinput"></textarea>'
					+'										    </div>'
					+'						              </div> '
					+'						         <li>'
					+'						         <div class="comments_list" id="comments_list">'
					+'						             </div>               '
					+'						        </li>'
					+'						          </ul>'
					+'						            </div>'
					+'						            <div style="text-align: center; padding: 6px; display: -webkit-box; margin-left: 35px; left: 360px;">'
					+' 										<div style="margin: 1px"><button id="cancel" type="button" class="btn btn-danger">취소</button></div>'
					+' 										<div style="margin: 1px"><button type="submit" class="btn btn-primary" id="from_submit_btn">등록</button></div>'
					+'						      		</div>'
					+'						        </div>'
					+'						  </div>'
					
					
			
			);
			$(jwcompo.img_upload_from()).appendTo('#comments_list');
			if(sessionStorage.getItem('userpo').match('http')){
				$('.imguploadart').attr('src',sessionStorage.getItem('userpo'));
			}else{
				$('.imguploadart').attr('src','resources/img/aquagram/profilephoto/'+sessionStorage.getItem('userpo'));
			}
			
		/*			
			$(document).ready(function(){
				let inputres =  $('input[name=photo]');
				var blob = new Blob(inputres, {type:'image/jpg'});
				function readURL(inputres) {
					 
				    if (blob) {
				        var reader = new FileReader();
				        
				        reader.onload = function (e) {
				            $('#mirror_img').attr('src', e.target.result);
				        }
				        
				        reader.readAsDataURL(blob);
				    }
				}
				 
				$("#photo").change(function(){
				    readURL(this);
				    $('#mirror_img').attr('src', blob);
				});
				
			});*/

					
	/*		
				$('#photo').change(function(){
					const target = $('input[name=photo]');
					var blob = new Blob(target, {type:'image/jpg'});
					var vimg = URL.createObjectURL(blob);
					alert('????'+vimg);
					$('#mirror_img').attr('src',vimg);
					 console.log(vimg);
					 URL.revokeObjectURL(this.src);
				});*/

			//const blobUrl = window.URL.createObjectURL(blob); 
				//URL.revokeObjectURL()은 URL.createObjectURL()을 통해 생성한 기존 URL을 해제(폐기)합니다.
			$('#cancel').click(function(){
				$('#myModal').modal('hide');
			})
			$('#from_submit_btn').click(function(e){
				e.preventDefault();

				//alert('??'+$('#photo').val())
				 $('#img_upload_frm').ajaxForm({
	                    url : $.ctx()+'/upload/image',
	                    dataType : 'json',
	                    enctype: "multipart/form-data",
	                    type : 'POST',
	                    beforeSubmit : function() {
	                        if($('#photo').val() === ""){
	                             alert("첨부파일 선택 필수");
	                             return false;
	                        }else{
	                             let ext =  $("#photo").val().split(".").pop().toLowerCase();
	                            if($.inArray(ext,  ['jpg','png','jpeg']) == -1){
	                                   alert('jpg , png,jpeg 파일만  업로드 가능함' );
	                                   return false;
	                             }
	                        }
	                    },
	                    success : function(d) {
	                    	
	                		let tagarr = $('#taginput').val().split('#');
	                		let art_upload_data = {
	                				subCont:$('#commentinput').val(),
	                				subid:sessionStorage.getItem('userid')
	                				};

	                			$.ajax({
	                				url: $.ctx()+'/upload/arti',
	                				type: 'put',
	                				data: JSON.stringify(art_upload_data),
	                				dataType: 'json',
	                				contentType: 'application/json; charset=UTF-8;',
	                				success: d=>{
	                					//alert('seq??:::'+d.seq.artnum);
	                					$.each(tagarr,(i,j)=>{
	                						let tagdata = {artseq:d.seq.artnum,
	                								tagname:tagarr[i]}
	                						if(tagdata.tagname != ''){
	                							//alert(tagdata.tagname);
			                					$.ajax({
		        	                				url: $.ctx()+'/upload/tag',
		        	                				type: 'post',
		        	                				data: JSON.stringify(tagdata),
		        	                				dataType: 'json',
		        	                				contentType: 'application/json; charset=UTF-8;',
		        	                				success: d=>{
		        	                					//alert(d.msg);
		        	                						
		        	                					
		        	                				},error: e=>{
		        	                					
		        	                				}
	        	                			});	 	
	                						}
	                					});
	                					
	                					$('#myModal').modal('hide');
	                					//window.location.reload(true);
	                					setContentView();
	                				},error: e=>{
	                					
	                				}
	                				
	                			});
	                    }
	               }).submit();

	            });

		});
	};

	
	
	return {init:init, arti_img_upload:arti_img_upload};
	
	
})();