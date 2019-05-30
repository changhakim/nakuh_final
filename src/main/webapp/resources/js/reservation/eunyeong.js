"use strict";
var eunyeong = eunyeong || {};
eunyeong = (()=>{
    const WHEN_ERR = '호출하는 JS파일을 찾지 못지 못했습니다.'
    let _,compojs, js;
    let homecss,admincss,rescss,instacss,calnum,pricetitle,areatitle,searchword;
    
    let init =x=>{
        _= $.ctx();
    	js = $.js();
        compojs = js + '/component/eycompo.js';
        calnum=1;
        onCreate(x);
    }

    let onCreate =(x)=>{
        setContentView(x);
    }
    
    let setContentView =(x)=>{
        $.when(
                $.getScript($.js()+'/component/eycompo.js'),
                $.getScript($.js()+'/aquagram/jeonguk.js'),
                $.getScript($.js()+'/app.js')
        ).done(()=>{
        	$('#homemainnav').remove()
			$('<header id="homemainnav">'
					+'        <section>'
					+'            <a href="#" class="header_logo off active home">'
					+'                <img src="'+$.ctx()+'/resources/img/homeimg/main/nakuhlogo.jpg" style="height: 30px;">'
					+'            </a>'
					+'            <a class="location_setting pos_addr_text btn_geo_popup">서울특별시 마포구 대흥동 백범로 23</a>'
					+'            <div class="header_menu" style="font-weight: bold;">'
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
					+'    </header>').appendTo('#navheader')
        	css();
        	
            switch(x){
            case 'ocean':

                ocean(x);
            break;
            case 'river':
                river(x);
            break;
            case 'hotel':
                hotel(x);
            break;
            case 'mypage':
            	mypage();
            }
            
            /*  네비게이션 */
            $('.home').click(e=>{
            
            e.preventDefault();
            $('.rescss').remove();
            $('.instacss').remove();
            location.assign(''+$.ctx()+'/');
            app.init();
            });
            $('.ocean').click(()=>{
            	$(window).data('resajaxready',false);
            	
            	setContentView('ocean')
            });
            
            $('.river').click(()=>{
            	$(window).data('resajaxready',false);
            	setContentView('river')
            });
            
            $('.hotel').click(()=>{
            	setContentView('hotel')
            });
            
            $('.newsfeed').click(e=>{
                e.preventDefault();
                $('.rescss').remove();
                $('#home_menu').remove();
                $(instacss).appendTo('head');
                jeonguk.init();
            });
            $('.mypage').click(()=>{
            	$('#home_menu').remove();
            	mypage();
            });
            
            $('.logout').click(function(){
        		Kakao.Auth.logout(function(){
        			sessionStorage.removeItem('userid');
        			sessionStorage.removeItem('userpo');
        			sessionStorage.removeItem('kakaosession');
        			location.assign(''+$.ctx()+'/');
        		});
        	})
        })
    };
  
    let cate_search =t=>{
    	pricetitle='최신순';
    	areatitle='지역';
    	searchword='';
    	if(typeof $(window).data('resajaxready')!= "undefined" && $(window).data('resajaxready')!=='undefined'){
    	$(window).data('resajaxready',false);
    	}
        $('#wrapper').empty();
        $('.scrolling').remove();
        $(eycompo.header()).appendTo('.header_area');
        $(eycompo.main()).appendTo('#wrapper');
        $('#category_list').empty();
        $('<div id="category_list" class="list_contents" data-start_key="0" data-offset="0" data-limit="10" data-last_offset="" style="width: 500px;">').appendTo('#category_list');
        $('<div class="category_title_line level_3" style="width: 500px;">'
        		+'                    <p>인기추천</p>'
        		+'                    <div class="ad_guide">'
        		+'                        <a>광고 <i><img src="https://img.moolban.com/unsafe/asset/www/responsive/img/basic/reserve_ico04.png" alt=""></i></a>'
        		+'                        <div class="ad_txt">인기추천 광고상품이 표시되는 영역입니다.</div>'
        		+'                    </div>')
       .appendTo('#category_list');
        
        $('<div class="search_header_box search_box pblock" style="border: 1px solid #e84418; border-radius: 0.3rem; padding: 6px 8px; width: 320px; height: 49px; margin: 12px 0; font-size: 0;">'
        		+'	<input type="text" id="search_input_box" placeholder="검색어를 입력해주세요." style="border: none; font-size: 15px; letter-spacing: -0.7px;  width: 250px; height: 30px; border-radius: 0px; vertical-align: middle; padding-bottom: 10px;">'
        		+'	<a class="search_btn" style="float: right; margin-left: 0;"><img src="https://img.moolban.com/unsafe/asset/www/responsive/img/basic/search_ico04.png" alt=""></a>'
        		+'</div>').prependTo('.filter_warp');
        $('.list_menu_area').attr('value',t)
        let searchlist='';
        $.each(['최신순','높은가격순','낮은가격순'],(x,y)=>{
        	$('<a style="font-weight: bold;font-family: Noto Sans KR, sans-serif;font-size:15px;" class="selectprice'+x+'">'+y+'</a>').appendTo('.sort > .select_option').click(function(){
        		
        		$('.price_title').text($(this).text());
        		pricetitle=$('.price_title').text();
        		areatitle=$('.area_title').text();
        		searchword=$('#search_input_box').val();
                searchlist = {cate:t};
        		$(window).data('resajaxready',false);
        		$('.list_section').empty();
            	$(eycompo.search_head()).appendTo('.list_section');
            	$("body").scrollTop(0);
            	pro_fetchList(searchlist);
        		
        	})
        })
        $.each(['지역','서울','경기','인천','전남','부산','전북','강원도','광주','충남','충북','제주'],(x,y)=>{
        	$('<a style="font-weight: bold;font-family: Noto Sans KR, sans-serif;font-size:15px;" class="selectcity'+x+'">'+y+'</a>').appendTo('.distance > .select_option').click(function(){
        		
        		$('.area_title').text($(this).text());
        		pricetitle=$('.price_title').text();
        		areatitle=$('.area_title').text();
        		searchword=$('#search_input_box').val();
                searchlist = {cate:t};
        		$(window).data('resajaxready',false);
        		$('.list_section').empty();
            	$(eycompo.search_head()).appendTo('.list_section');
            	$("body").scrollTop(0);
            	pro_fetchList(searchlist);
        		
        	})
        })
        $('.search_btn').click(()=>{
    		pricetitle=$('.price_title').text();
    		areatitle=$('.area_title').text();
    		searchword=$('#search_input_box').val();
            searchlist = {cate:t};
    		$(window).data('resajaxready',false);
    		$('.list_section').empty();
        	$(eycompo.search_head()).appendTo('.list_section');
        	$("body").scrollTop(0);
        	pro_fetchList(searchlist);
    		
        })

        
        $('.area_title').attr('value',t)
        $('.distance').click(()=>{
        	if($('.distance > .select_option').attr('value')=='block'){
            	$('.distance > .select_option').css('display','none')
            	$('.distance > .select_option').attr('value','none')
            }else{
            	$('.distance > .select_option').css('display','block')
            	$('.distance > .select_option').attr('value','block')
            }
        })

        $('.sort').click(()=>{
        	if($('.sort > .select_option').attr('value')=='block'){
        	$('.sort > .select_option').css('display','none')
        	$('.sort > .select_option').attr('value','none')
        	}else{
        	$('.sort > .select_option').css('display','block')
        	$('.sort > .select_option').attr('value','block')
        	}

        })
         if(typeof $(window).data('resajaxready')=== "undefined"||$(window).data('resajaxready')==='undefined'){
        	
        	 pro_infinitemove(t); 
        	 
         }else{
        	 
        	 pro_fetchList({cate:t});
         }
       
    };
    
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////*바다 메인화면 */   
    
    let ocean =x=>{
    	cate_search(x);

    };
    
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////*민물 메인화면 */        
    let river =x=>{
    	cate_search(x);
    	$('#cate_head').text('민물낚시');
    	$('#cate_home').text('민물 홈');
    	$('#cate_menu1').text('연안');
    	$('#cate_menu2').text('수상');
    	$('#cate_menu3').text('낚시카페');
    	$('#cate_menu4').text('배스');
    	$('#cate_menu5').text('노지');
    };
    
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////*숙박 메인화면 */  
    
    let hotel =x=>{
    	cate_search(x);
    	$('div .list_menu_area').empty();
    	$('#cate_head').text('숙박');
        
    };
    

   //////////////////////////////////////////////////////////////////////////////////////////////////////////////////*페이지네이션 : 1*/

    let pro_infinitemove =(x)=>{

    	$(function(){
            $(window).data('resajaxready',true).scroll(function(){
                    if($(window).data('resajaxready')==false) return;
                    if($(window).scrollTop() + 300 >=$(document).height()-$(window).height()){
                        $(document).ready(function(){
                            //로딩될 때 충돌막아줌
                            $('div#loadmoreajaxloader').show();
                            $(window).data('resajaxready',false);
                            pro_fetchList();
                        });
                    }        
                })
           
            pro_fetchList(x);
        });
		
	};
	let pro_fetchList=(x)=>{
		let isEnd = false;
        if(isEnd == true){
        	return;
        }
        let startNo = $('.list_section').children('.list_ad_box_area3').last().data("no") || 0;	      
		let cate =$('.list_menu_area').attr('value');
		let page = 0;
		let url = $.ctx()+'/catesearch/'+ cate;
		let data = { cate:cate,
				startRow:startNo,
				pageSize:6,
				pricetitle:pricetitle,
				areatitle:areatitle,
				searchword:searchword
				};
		
		$.ajax({
			url: url,
			type: 'post',
			data: JSON.stringify(data),
			dataType: 'json',
			contentType: 'application/json; charset=UTF-8;',
			success: d=>{
				  let length = d.list.length;
				  //alert(length);
				  //db에 있는 값이 5 이하길 경우 멈춤
                  if( length < 5 ){
                	  isEnd = true;
                	 /* alert(isEnd+'success')*/
                  }
                  if(d){
           
                	  $('div#loadmoreajaxloader').hide();
                	  $.each(d.list,(i, j)=>{
                		  pro_renderList(j); 
	                	 
	                  	});
                	 
                  }else{
                	  $('div#loadmoreajaxloader').html();
                  }
                  $(window).data('resajaxready', true);
			},
			error: e=>{
				
			}
				
		});
	};
	
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////*전체목록 :페이지네이션 */	
	
	let pro_renderList =(j)=>{
	   	$('<a class="list_box_area list_ad_box_area list_ad_box_area3" data-view_type="3" data-level="2" data-key="9296" data-no="'+j.rownum+'" style="width: 500px;">'
	   	+'    <div class="list_visual_area" style="width: 500px; padding-bottom: 10px;">'
		+'    <div class="img_box company_info" style="width: 500px;">'
		+'			<img src=' + $.img() + '/reservation/' + j.proimg + ' alt="" class="list_visual_img"  style="width: 500px;">'
		+'         </div>'
		+'        <div class="cover_area"></div>'
		+'        <div class="list_box_txt clearfix">'
		+'            <div class="list_box_left">'
		+'                <div class="list_pic">'
		+'                    '
		+'                 	<span id="fishname" class="kind_blue_txt" style=font-size: 10px;">'+ j.fishname +'</span>'
		+'                </div>'
		+'                <p name="'+j.company+'" class="list_name_line" font-family: Noto Sans KR, sans-serif;font-size:12px;>'+ j.company +'</p>'
		+'                <div class="write_comment_line">'
		+'                <p>'
		+'                <img src="https://img.moolban.com/unsafe/asset/www/responsive/img/basic/ico_fish.png" alt="">조황 2개'
		+'                 </p>'
		+'                </div>'
		+'                                <p id="address" class="list_address_line" style=font-size: 10px;">'+ j.address +'</p>'
		+'            </div>'
		+'                        <div class="list_box_right">'
		+'                <div class="live_price">'
		+'                    <p class="price_pic"  style=font-size: 10px;">'
		+'                        <span>실시간예약</span>'
		+'                                                <span class="insurance_pic">보험</span>'
		+'                                                                    </p>'
		+'                    <p id="price" class="price_pay" "font-weight: bold; font-size: 20px;">'+ j.price +'<span>원~</span></p>'
		+'                </div>'
		+'            </div>'
		+'                    </div>'
		+'    </div>'
		+'        <div class="opacity_txt"  style="padding-top: 8px;padding-bottom: 8px;">'
		+'        <!--p><strong>EVENT</strong>가족  체험낚시 또는 어린이도  낚시할 수 있도록 준비되어 있습니다. 이색 데이트 코스 및 펜션과 리조트도 소개해 드립니다.</p-->'
		+'        <div class="marquee1" style="font-size: 13px;">가족  체험낚시 또는 어린이도  낚시할 수 있도록 준비되어 있습니다. 이색 데이트 코스 및 펜션과 리조트도 소개해 드립니다.</div>'
		+'    </div>'
		+'    </a>')
   		.attr('id', j.pronum)
   		.attr('name',j.company)
		.appendTo('.list_section')
   		.click(function(){
			let company = $(this).attr('name');
   				$.ajax({
   		    		url:$.ctx()+'/products/'+ company,
   		    		type:'POST',
   		    		data : JSON.stringify(company),
   		    		dataType :'json',
   		    		contentType :'application/json',
   		    		success : d=>{   		    			
   		    			let pro ={pronum:d.product.pronum,proname:d.product.proname,price:d.product.price,company:d.product.company,address:d.product.address,category:d.product.category,
   		    					  proimg:d.product.proimg,fishname:d.product.fishname,phone:d.product.phone,lat:d.product.lat,lng:d.product.lng, today:d.today, realtoday:d.realtoday,calday:d.calday,callist:d.callist,calheader:d.calheader,prolist:d.prolist};
   		    			detail(pro);
   		    		},
   		    		error :e=>{
   		    			
   		    		}
   				});
   		})
	};
    
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////*상품정보 : 상세 */
 
    let detail =x=>{
    	let cate_title='';
    	if(x.category==='ocean'){
    		cate_title = '바다낚시';
    	}else if(x.category==='river'){
    		cate_title = '민물낚시';
    	}else{
    		cate_title = '숙  박';
    	};
    	
    	$('#wrapper').empty();
    	$('.scrolling').empty();
    	$("body").scrollTop(0);
    	$('<div id="scrolling" class="scrolling scroll_up">'
    	+'   <div class="header_title">'
    	+'      <section>'
    	+'         <h1 style="font-weight: bold;" "font-family: "Noto Sans KR", Sans-serif;">'+ cate_title +'</h1>'
    	+'      </section>'
    	+'    </div>'
    	+'</div>').appendTo('.scrolling');
    	
    	$('<div class="view_area container">'
    			+'        <!-- 업체상세 상단 -->').appendTo('#wrapper');
    	$(eycompo.pro_info()).appendTo('.view_area');
    	$(eycompo.pro_head()).prependTo('#view_reserve');
    	
    	$('.title_arrow').append(x.calheader);
    	  let calval = 0;
          let calno = 0;
          //캘린더 : 물반고기반 
          $.each([4,2,1,3,7],(a,b)=>{
              $('<tr id="rescal'+a+'">'         
                  +'</tr>').appendTo('#rescalendar')
          	for(let i=0;i<7;i++){
          		if(x.callist[calno]==='★'){
          		 $('<td style="color: #666;"><a class="off"><strong>'+x.callist[calno]+'</strong></a></td>').appendTo('#rescal'+a) 
          	    }else if(x.callist[calno]!='★'&&x.callist[calno]<x.today){
          		 $('<td style="color: #666;"><a class="off"><strong>'+x.callist[calno]+'</strong></a></td>').appendTo('#rescal'+a)
          		calval+=1;
          		}else if(x.callist[calno] === undefined){
          			$('<td style="color: #666;"><a class="off"><strong>'+""+'</strong></a></td>').appendTo('#rescal'+a)
          		}else{
          		$('<td><a class="cal_cell_date" value="'+x.calday[calval]+'"><strong>'+x.callist[calno]+'</strong><img src="https://img.moolban.com/unsafe/asset/www/responsive/img/weather/weather-30.png" alt=""><span class="mul">'+(i+a)+'물</span></a></td>')
          		.appendTo('#rescal'+a)
          		calval+=1;
          		}
          		calno+=1;
          		}
          })
          $('.miniinfo').attr('value',x.realtoday)
          $('.cal_cell_date').click(function(){
        	  $( '.cal_cell_date' ).removeClass( 'on' );
        	  $(this).addClass('on');
        	 $('.miniinfo').attr('value',$(this).attr('value'))
             let datesplit = $('.miniinfo').attr('value').split('-');
              $('.miniinfo').html('<div class="date_widget_area view_box" data-date="2019-05-13">'
          			+'        <div class="date_title">'
        			+'            <p style="font-weight: bold;font-family: Noto Sans KR, sans-serif;font-size:18px;">'+datesplit[0]+'년 '+datesplit[1]+'월 '+datesplit[2]+'일</p>'        		
        			+'        </div>'
        			+'        <div class="widget_area clearfix">'
        			+'                        <dl class="widget_box_left widget_box">'
        			+'                                <dt><img src="https://img.moolban.com/unsafe/asset/www/responsive/img/wt_big/wt-big-30.png" alt=""></dt>'
        			+'                                                <dd>'
        			+'                    <span>물때 <strong>무시</strong></span>                    <span>풍속<strong>남서풍 4.07m/s</strong></span>                </dd>'
        			+'                            </dl>'
        			+'                        <a class="widget_box_right widget_box personnel_choice_btn">'
        			+'                <img src="https://img.moolban.com/unsafe/asset/www/responsive/img/basic/ico_people.png" alt="">'
        			+'                <span>예약인원 <strong>1명</strong></span>'
        			+'                <i class="personnel_choice" data-person="60">인원선택</i>'
        			+'            </a>'
        			+'        </div>'
        			+'    </div>');
          })        
          
    		$(eycompo.pro_map()).appendTo('#view_reserve');
        	$(document).ready(function() {
            	initMap(x);
    	});
        $('.proname').text(x.proname);
        $('.price').html(x.price+'<span>원</span>');
        $('#company').text(x.company);
        $('#proimg').attr('src',$.img() + '/reservation/' + x.proimg);
        $('#category').text(x.category);
        $('#address').text(x.address);
        $('.fishname').text(x.fishname);
        $('#phone').text(x.phone);
        $('#resdate').text(x.today);
        
		$('#reserve_section').empty();
		$.each(x.prolist, (i, j)=>{
   		   $('    <a class="reserve_area  view_box" data-cg-key="5201" value="noclick" data-gi-type="1" data-gi-key="1564964">'
   				+'        <div class="reserve_con"> <span class="count_pic">남은수60명</span>'
   				+'            <p class="reserve_title proname" style="font-weight: bold;font-family: Noto Sans KR, sans-serif;font-size:20px;">'+j.proname+'</p>'
   				+'            <div class="reserve_price">'
   				+'                <p class="price reserve_pay" value="'+j.price+'">'+j.price+'<span>원</span></p>'
   				+'                <!-- <p class="coupon_pay"><strong>50% 반덤 쿠폰 지급</strong>75,000<span>원</span><i>예약하기</i></p> <p class="one_pay"><strong>천원 한장</strong>1,000<span>원</span><i>예약하기</i></p> -->'
   				+'            </div>'
   				+'            <div class="reserve_dot">'
   				+'                <p style="font-family: Noto Sans KR, sans-serif;font-size:15px;">최소인원 10명 / 최대인원 60명</p>'
   				+'                <p style="font-family: Noto Sans KR, sans-serif;font-size:15px;>오전 7시 ~ 오전 12시 30분 (5시간 30분)</p>'
   				+'                <p style="font-family: Noto Sans KR, sans-serif;font-size:15px; class="fishname">'+j.fishname+'</p>'
   				+'            </div>'
   				+'        </div>'
   				+'    </a>').attr('id', j.pronum)
   				.appendTo('#reserve_section')
   		   		.click(function(){
   		   			if($(this).attr('value')=='noclick'){
   		   				$(this).attr('value','click').css('border', 'solid 1px red');
   		   				
   		   			}else{
   		   				$(this).attr('value','noclick').css('border', '');
   		   			}
   		   
  			});

        });
		let details = []; 
  		$('.sel_reserve_goods').attr('data-toggle','modal').attr('data-target','#myModal').click(function(e){
		        	$('#myModal').attr('style','display: block; z-index:99999;').appendTo('#myModal');
		  			$('.modal-dialog').attr('style','top:200px;');
		  			$('.modal-content').attr('style','margin:auto; width: 502px;height: 202px;');
		  			$('.modal-title').empty();
		  			$('.modal-body').empty();
		  			$('.modal-footer').empty();
		  			details = []
		  			$.each($('.reserve_area[value=click]'),(x,item)=>{
		  			details.push({'proname':$(item).find('.proname').text(),price:$(item).find('.price').attr('value'),pronum:$(item).attr('id')})
		  			$('<div class="checkbox"><label><input class="checkbox" type="checkbox" value="">'+$(item).find('.proname').text()  + '[가격 : ' +$(item).find('.price').attr('value')+ '원]</label></div>').appendTo('.modal-body');
		  			})
		  		  let pro ={company:x.company,address:x.address,category:x.category,proimg:x.proimg,
				  regidate:x.today,realtoday:x.realtoday,fishname:x.fishname,phone:x.phone,
				  lat:x.lat,lng:x.lng, today:x.today, realtoday:x.realtoday,startdate:$('.miniinfo').attr('value'),details:details};
		  			$('<button id="paybtn" type="button" class="btn btn-default" data-dismiss="modal">결제하기</button>').prependTo('.modal-footer').click(e=>{
		  				prdres(pro);
		  			$(' <h4 class="modal-title"> 상품선택하기 </h4>').appendTo('.modal-title');
		  			$('<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>').appendTo('.modal-footer');
		  			});
		});
     };
    
     //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////*상품예약 : 인원선택*/
     
     let prdres =x=>{
     	$('#wrapper').empty();
    	$('.scrolling').empty();
    	$("body").scrollTop(0);
     	$(eycompo.product_res()).appendTo('#wrapper');
		let count = '';
		let pro = [];
		$.each(x.details,(a,b)=>{
			$('<div class="goods_area reserve_area secInner">'
					+'                            <div class="box_title clearfix count">'
					+'                                <p class="proname'+a+'" class="ico_goods">'+b.proname+'<span id="price">'+b.price+'원</span>'
					+'                                    <!---->'
					+'                                </p>'
					+'                                <div class="count_box"id="count_box'+a+'">'
					+'</div>'
					+'                            </div>'
					+'                            <!---->'
					+'                            <dl class="price_box clearfix"><dt>상품금액</dt>'
					+'                                <dd><p class="price'+a+' pricestyle" style=" font-size: 17px; color: #ff724c;">'+b.price+'</p><span style="display: inline;">원</span></dd>'
					+'                            </dl>'
					+'                        </div>').appendTo('.step_2')
				$('<a class="count_minus" value="count_minus'+a+'"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAECAYAAACQli8lAAAAAXNSR0IArs4c6QAAAClJREFUGBljYKATYATZ4+rquhVIedHIzm27d+/2ZqKR4cjG/kfm0JwNAEZQBgMM6SkpAAAAAElFTkSuQmCC" alt="" ></a>'
 	    		+'<input id="count'+a+'" type="tel" value="1">'
 	    		+'<a class="count_plus" value="count_plus'+a+'"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAGVJREFUSA1jYCABvH79eisIk6CFgYUUxUC1XiSqZ2AiVQOp6kctIBhio0E0AoKIEZr1Sc6hBMMGomAbrVPRfyIdAlEG9O1/ECZFE619MFrYEY6N0TggGEZDP4hIbVVsA4YJSTkZAPigFhD8xoqXAAAAAElFTkSuQmCC" alt="" style="display: none;"> <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAGVJREFUSA1jYCABuLq6bgVhErQwsJCiGKjWi0T1DEykaiBV/agFBENsNIhGQBAxQrM+yTmUYNhAFGyjdSr6T6RDIMqAvv0PwqRoorUPRgs7wrExGgcEw2joBxGprYptwDAhKScDAEDZDFaet43aAAAAAElFTkSuQmCC" alt="">'
 	    		+'</a>').appendTo('#count_box'+a).click(function(){
 	    			switch($(this).attr('value')){
 	    			case 'count_plus'+a:
 	    				count = Number($('#count'+a).attr('value'));
 	    				count++;
 	    				$('#count'+a).attr('value',count);
 	    				$('.price'+a).text(Number(b.price)*count);
 	    				break;
 	    			case 'count_minus'+a:
 	    				count = Number($('#count'+a).attr('value'));
 	    				count--;
 	    				$('#count'+a).attr('value',count);
 	    				$('.price'+a).text(Number(b.price)*count);

 	    				break;

 	    			}
 	    		})
 	    $('.reserve_btn').click(e=>{
		e.preventDefault();			
		pro.push({pronum:b.pronum,proname:b.proname,price:$('.price'+a).text(),
				  regidate:x.today,realtoday:x.realtoday,fishname:x.fishname,today:x.today,realtoday:x.realtoday,startdate:x.startdate,rescount:$('#count'+a).attr('value')});
		if(x.details.length==a+1){
		reserve_pro(pro);
		}
			});
		})
		$('.fishname').text(x.fishname);
 		$('#company').text(x.company);
 	    
     };
     
     //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////*상품결제 : 결제값입력*/
  
     let reserve_pro =x=>{
			$('#wrapper').empty();
			$("body").scrollTop(0);
			$(eycompo.reserve_pro()).appendTo('#wrapper');
			$('.proname').text(x.proname);
			$('.price').text(x.price);
			
			let res = [];
			let totalmoney = 0;
			$.each(x,(a,b)=>{
			totalmoney += Number(b.price)
			$('                        <div class="reserve_area secInner result_area">'
					+'                            <div class="box_title clearfix">'
					+'                                <p class="ico_goods">'+b.proname+'</p>'
					+'                            </div>'
					+'                            <div class="inner reserve_tb">'
					+'                                <div class="reserve_td_tit clearfix">'
					+'                                    <p class="tb1">상품정보</p>'
					+'                                    <p class="tb2">수량</p>'
					+'                                    <p class="tb3">금액</p>'
					+'                                </div>'
					+'                                <div class="reserve_td_con">'
					+'                                    <div class="clearfix">'
					+'                                        <p class="tb1 proname">'+b.proname+'</p>'
					+'                                        <p class="tb2 rescount">'+b.rescount+'명</p>'
					+'                                        <p class="tb3 price">'+b.price+'원</p>'
					+'                                    </div>'
					+'                                </div>'
					+'                            </div>'
					+'                            <div class="result_price">'
					+'                                <div class="price_box clearfix">'
					+'                                    <dl><dt>상품 금액</dt>'
					+'                                        <dd class="price" >'+b.price+'원</dd>'
					+'                                    </dl> <i>-</i>'
					+'                                    <dl><dt class="mulban_txt">할인 금액</dt>'
					+'                                        <dd class="mulban_txt"><strong><span class="mulban_txt" style="display: inline;">0원</span></strong></dd>'
					+'                                    </dl> <i>=</i>'
					+'                                    <dl><dt>쿠폰 적용 금액</dt>'
					+'                                        <dd><strong><span class="price" style="display: inline;">'+b.price+'원</span></strong></dd>'
					+'                                    </dl>'
					+'                                </div>'
					+'                            </div>'
					+'                            <!---->'
					+'                            <!---->'
					+'                        </div>').appendTo('#productinfo');
			$('<p class="proname"><span>상품</span>'+b.proname+''
			  +'</p>').appendTo('.innerproname')
				
			  
			  $('.reserve_btn').click(e=>{
					e.preventDefault();
			    	 res.push({
			    		/*mid : 세션에서 들어온 값
		   				deposit : 자바에서 계산*/ 
		     			 mid : sessionStorage.getItem('userid'),
		     			 resname : $('#resname').val(),
		     			 startdate : b.startdate,
		     			 phone : $('#phone').val(),
		     			 resdate : b.realtoday,
		     			 rescount : b.rescount,	     			 
		     			 pronum :  b.pronum,
		     			 proname : b.proname,
		     			 deposit : b.price});
			    	 
			  if(x.length==a+1){
		     	 $.ajax({
		     		 url : $.ctx()+'/reservation',
		     		 type : 'PUT',
		     		 data : JSON.stringify(res),
		     		 dataType : 'json',
		     		 contentType : 'application/json',
		     		 success : d=>{
		     			 respay();
		     		 },
		     		 error : e=>{
		     			 
		     		 }
		     	 });
			  }
			})
			
		});
		$('.totalmoney').text(totalmoney+'원');
     }
     
     //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////*상품결제 : 완료*/
     
    let respay =()=>{
    	$('#wrapper').empty();
		$(eycompo.complete_pay()).appendTo('#wrapper');
		$('#check_res').click(e=>{
			mypage();
		});
    }; 
 
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////*마이페이지*/
    
    let mypage =()=>{
      	let mid = sessionStorage.getItem('userid');
      		$.ajax({
    			url :$.ctx()+'/reservation/' + mid,
    			type :'POST',
    			data : JSON.stringify(mid),
    			dataType : 'json',
    			contentType : 'application/json',
    			success : d=>{
    				$('#wrapper').empty();
    		      	$(eycompo.mypage()).appendTo('#wrapper');
    		      	$('.rtreserve_more_list').empty();
    		      	$.each(d.list, (i,j)=>{
        		      	$('<div class="rtreserve_more_list clearfix" id="reserveList" data-start_key="0" data-offset="0" data-limit="5" data-last_offset=""><div class="rtreserve_list_box">'
        		    			+'    <div class="rtreserve_con ">'
        		    			+'        <a class="clearfix" href="#">'
        		    			+'            <div class="img_box">'
        		    			+'                <img src="' + $.img() + '/reservation/' + j.proimg + '" alt="" class="">'
        		    			+'            </div>'
        		    			+'            <div class="txt_box">'
        		    			+'                <p class="pic_line">'
        		    			+'                                        <span class="pic_wait">예약대기</span>'
        		    			+'                                                            <span class="pic_none">보험미적용</span>'
        		    			+'                                    </p>'
        		    			+'                <p id="proname" class="title_line">'+j.proname+'</p>'
        		    			+'                <p class="address_line">'
        		    			+'                    <span id="category" class="place">선상</span>'
        		    			+'                    <span id="address" class="km">'+j.deposit+'</span>'
        		    			+'                </p>'
        		    			+'                <div class="order_line ">'
        		    			+'                                    <p><span id="startdate">이용일</span>'+j.startdate+'</p>'
        		    			+'                    <p><span id="resnum">예약번호</span>'+j.resnum+'</p>'
        		    			+'                                </div>'
        		    			+'            </div>'
        		    			+'        </a>'
        		    			+'            </div>'
        		    			+'</div></div>')
        		    			.attr('id', j.resnum)
        		    			.appendTo('.rtreserve_guide');
    		      	});
    			},
    			error: e=>{
    				
    			}
    		});
    };
    
    let navcss = ()=>{
        $(document).ready(function() {
             $('#comnav').affix({
              offset: {
              top: 1
              }
             });
         });
    };
    
/*    지도*/
    function initMap(x) {
  	  // The location of Uluru
  	  var uluru = {lat: x.lat, lng: x.lng};
  	  // The map, centered at Uluru
  	  var map = new google.maps.Map(
  	      document.getElementById('map'), {zoom: 15, center: uluru});
  	  // The marker, positioned at Uluru
  	  var marker = new google.maps.Marker({position: uluru, map: map});
    };

    let css = ()=>{
         homecss ='<link class="homecss" rel="stylesheet" type="text/css" href="'+$.ctx()+'/resources/css/home/homemain.css">'
        	+'<link class="homecss" href="'+$.ctx()+'/resources/css/home/style.css" rel="stylesheet">'
            +'<link class="homecss" href="https://fonts.googleapis.com/css?family=Raleway:300,400,600,600i,700" rel="stylesheet">'
            +'<link class="homecss" href="'+$.ctx()+'/resources/css/home/style.css" rel="stylesheet">';
         
         rescss = '<link class="rescss" rel="stylesheet" type="text/css" href="'+$.ctx()+'/resources/css/reservation/modal.css"> '
             +'<link class="rescss" rel="stylesheet" href="'+$.ctx()+'/resources/css/reservation/resdetail.css">'
             +'<link class="rescss" rel="stylesheet" href="'+$.ctx()+'/resources/css/reservation/prdpay.css">';
         
         instacss =' <link class="instacss" rel="stylesheet" type="text/css" href="'+$.ctx()+'/resources/css/aquagram/style.css">'
             +' <link class="instacss" rel="stylesheet" type="text/css" href="'+$.ctx()+'/resources/css/aquagram/animate.css">'
             +' <link class="instacss" rel="stylesheet" type="text/css" href="'+$.ctx()+'/resources/css/aquagram/structure.css">'
             +' <link class="instacss" rel="stylesheet" type="text/css" href="'+$.ctx()+'/resources/css/aquagram/docs.min.css"> '
             +' <link class="instacss" rel="stylesheet" type="text/css" href="'+$.ctx()+'/resources/css/aquagram/default_css.css">';
             
    };
    return {init:init, ocean:ocean, river:river, hotel:hotel, detail:detail, prdres:prdres};
})();