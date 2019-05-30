var adminres = adminres||{}

adminres = (()=>{
	let cate;
let init = ()=>{
	onCreate();
}
let onCreate=()=>{
	setContentView();
}
let setContentView=()=>{
	$.when(
	$.getScript($.js()+'/component/chcompo.js'),
	$.getScript($.js()+'/admin/changha.js')	
	).done(()=>{
		$('.main-panel').html(chcompo.admin)
		dateficker();
		$('#memnav').click(e=>{
			e.preventDefault();
			changha.init();
		})
		$.getJSON($.ctx()+'/admin/reschart',d=>{
			reschart(d);
			rescharttwo(d);
			reslist(1);
		})
		
		$('#searchgo').click(()=>{
			searchres();
		})
	})

}
let reslist=x=>{
	$.getJSON($.ctx()+'/admin/reserv/'+x,d=>{
		$('#restable').html('<thead>'
					+'    <tr>'
					+'      <th style="text-align: center;"scope="col">예약번호</th>'
					+'      <th style="text-align: center;"scope="col">고객아이디</th>'
					+'      <th style="text-align: center;"scope="col">예약자명</th>'
					+'      <th style="text-align: center;"scope="col">상호명</th>'
					+'      <th style="text-align: center;"scope="col">상품명</th>'
					+'      <th style="text-align: center;"scope="col">상품종류</th>'
					+'      <th style="text-align: center;"scope="col">출발날짜</th>'
					+'      <th style="text-align: center;"scope="col">오전/오후</th>'
					+'      <th style="text-align: center;"scope="col">H.P</th>'
					+'      <th style="text-align: center;"scope="col">예약날짜</th>'
					+'      <th style="text-align: center;"scope="col">결제금액</th>'
					+'    </tr>'
					+'  </thead>'
					+'<tbody id="restable">'
					+' </tbody>')
		$('#adresnav').html('<ul class="pagination justify-content-center respage"style="cursor: pointer;">'
						 +'</ul>')
		$.each(d.reslist,(x,y)=>{
			if(y.category==='river'){
				cate='민물낚시'
			}else if(y.category==='ocean'){
				cate='바다낚시'
			}else{
				cate='숙박'
			}
			
		$('<tr>' 
		  +'<th scope="row">'+y.resnum+'</th>'
		  +'<td>'+y.mid+'</td>'
		  +'<td>'+y.resname+'</td>'
		  +'<td>'+y.company+'</td>'
		  +'<td>'+y.proname+'</td>'
		  +'<td>'+cate+'</td>'
		  +'<td>'+y.startdate+'</td>'
		  +'<td>'+y.ampm+'</td>'
		  +'<td>'+y.phone+'</td>'
		  +'<td>'+y.resdate+'</td>'
		  +'<td>'+y.deposit+'</td>'
		  +'</tr>').appendTo('#restable').appendTo('#restable')
		})/*each*/
		if(d.pxy.existPrev){
			$('<li class="page-item disabled"><a id="previous" class="page-link" style="cursor: pointer;">Previous</a></li>').appendTo('.respage')
		}
		let i=0;
		for(i=d.pxy.startpage;i<=d.pxy.endpage;i++){
			if(d.pxy.pageNum === i){
				$('<li class="page-item"><a class="pages page-link active">'+i+'</a></li>')
				.attr('href','/phones/page/'+i)
				.appendTo('.respage')
				.click(function(){
					reslist($(this).text());
				})
				}else{
				$('<li class="page-item"><a class="pages page-link">'+i+'</a></li>')
				.attr('href','/phones/page/'+i)
				.appendTo('.respage')
				.click(function(){
					reslist($(this).text());
				})
				
			}
		}
		if(d.pxy.existNext){
			$('<li class="page-item"><a id="next"class="page-link">Next</a></li>').appendTo('.respage')
		}
		$('#previous').click(()=>{
			reslist(d.pxy.prevBlock)
		})
		$('#next').click(()=>{
			reslist(d.pxy.nextBlock)
		})
		})/*getJSON*/
	
}
let searchres = ()=>{
	if($('#datepicker').val()!='' && $('#resselect option:selected').val()==='전체날짜'){
		alert('출발/예약 날짜 설정을 해주세요')
		return
	}
	if($('#datepicker').val()==='' && $('#resselect option:selected').val()!='전체날짜'){
		alert('날짜를 입력해주세요')
		return
	}
	if($('#resselect option:selected').val()==='전체날짜' 
	  && $('#proselect option:selected').val()==='전체상품'
	  && $('#searchbar').val()===''
	  && $('#datepicker').val()===''){
		alert('값을 입력해주세요')
		return
	}
	if($('#searchbar').val()===''){
		alert('검색어를 입력해주세요')
		return
	}
	
	let proselect = '';
	let searchword = $('#searchbar').val();
	if($('#proselect option:selected').val()==='바다낚시'){
		proselect = 'ocean';
	}else if($('#proselect option:selected').val()==='민물낚시'){
		proselect = 'river';
	}else if($('#proselect option:selected').val()==='숙박'){
		proselect = 'hotel';
	}
	if($('#searchbar').val()==='민물'){
		searchword = 'river';
	}
	if($('#searchbar').val()==='바다'){
		searchword = 'ocean';
	}
	if($('#searchbar').val()==='숙박'){
		searchword = 'hotel';
	}
	let word = {searchdate:$('#datepicker').val(),
				resselect:$('#resselect option:selected').val(),
				proselect:proselect,
				searchword:searchword,
				number:1}
	searchpage(word);
	
	}
let searchpage=x=>{
	let data = {searchdate:x.searchdate,
				resselect:x.resselect,
				proselect:x.proselect,
				searchword:x.searchword,
				number:x.number}
	$.ajax({
		url:$.ctx()+'/admin/search',
		type:'post',
		data:JSON.stringify(data),
		dataType:'JSON',
		contentType:'application/json',
		success:d=>{
			$('#restable').html('<thead>'
					+'    <tr>'
					+'      <th style="text-align: center;"scope="col">예약번호</th>'
					+'      <th style="text-align: center;"scope="col">고객아이디</th>'
					+'      <th style="text-align: center;"scope="col">예약자명</th>'
					+'      <th style="text-align: center;"scope="col">상호명</th>'
					+'      <th style="text-align: center;"scope="col">상품명</th>'
					+'      <th style="text-align: center;"scope="col">상품종류</th>'
					+'      <th style="text-align: center;"scope="col">출발날짜</th>'
					+'      <th style="text-align: center;"scope="col">오전/오후</th>'
					+'      <th style="text-align: center;"scope="col">H.P</th>'
					+'      <th style="text-align: center;"scope="col">예약날짜</th>'
					+'      <th style="text-align: center;"scope="col">결제금액</th>'
					+'    </tr>'
					+'  </thead>'
					+'<tbody id="restable">'
					+' </tbody>')
		$('#adresnav').html('<ul class="pagination justify-content-center respage"style="cursor: pointer;">'
						 +'</ul>')			
		$.each(d.reslist,(x,y)=>{
			if(y.category==='river'){
				cate='민물낚시'
			}else if(y.category==='ocean'){
				cate='바다낚시'
			}else{
				cate='숙박'
			}
		$('<tr>' 
		  +'<th scope="row">'+y.resnum+'</th>'
		  +'<td>'+y.mid+'</td>'
		  +'<td>'+y.resname+'</td>'
		  +'<td>'+y.company+'</td>'
		  +'<td>'+y.proname+'</td>'
		  +'<td>'+cate+'</td>'
		  +'<td>'+y.startdate+'</td>'
		  +'<td>'+y.ampm+'</td>'
		  +'<td>'+y.phone+'</td>'
		  +'<td>'+y.resdate+'</td>'
		  +'<td>'+y.deposit+'</td>'
		  +'</tr>').appendTo('#restable').appendTo('#restable')
		})/*each*/
		if(d.pxy.existPrev){
			$('<li class="page-item disabled"><a id="previous" class="page-link" style="cursor: pointer;">Previous</a></li>').appendTo('.respage')
		}
		let i=0;
		for(i=d.pxy.startpage;i<=d.pxy.endpage;i++){
			if(d.pxy.pageNum === i){
				$('<li class="page-item"><a class="pages page-link active">'+i+'</a></li>')
				.attr('href','/phones/page/'+i)
				.appendTo('.respage')
				.click(function(){
					searchpage(	{searchdate:x.searchdate,
								resselect:x.resselect,
								proselect:x.proselect,
								searchword:x.searchword,
								number:$(this).text()});
				
				})
				}else{
				$('<li class="page-item"><a class="pages page-link">'+i+'</a></li>')
				.attr('href','/phones/page/'+i)
				.appendTo('.respage')
				.click(function(){
					searchpage({searchdate:x.searchdate,
								resselect:x.resselect,
								proselect:x.proselect,
								searchword:x.searchword,
								number:$(this).text()});
				})
				
			}
		}
		if(d.pxy.existNext){
			$('<li class="page-item"><a id="next"class="page-link">Next</a></li>').appendTo('.respage')
		}
		$('#previous').click(()=>{
			searchpage(	{searchdate:x.searchdate,
						resselect:x.resselect,
						proselect:x.proselect,
						searchword:x.searchword,
						number:d.pxy.prevBlock})
		
		})
		$('#next').click(()=>{
			searchpage({searchdate:x.searchdate,
						resselect:x.resselect,
						proselect:x.proselect,
						searchword:x.searchword,
						number:d.pxy.nextBlock})
				
		})		
		},
		error:e=>{
			alert('실패')
		}
		
		
	})
}
let dateficker=()=>{
	$(document).ready(function() {
		$( "#datepicker" ).datepicker({
			dateFormat: 'yy-mm-dd',
		    inline: true,
		    disabled: false,
		    showOtherMonths: true,
		    showMonthAfterYear: true,
		    monthNames: [ '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12' ],
		    dayNamesMin: ['일', '월', '화', '수', '목', '금', '토'],
		    
		});			
	});
}
function reschart(x){
	var rr = document.getElementById('resChart');
	let respie=[];
	$.each(x.catecount,(x,y)=>{
		respie.push(y.rescount)
	})
	var resdata = {
		    labels: ['호텔','바다낚시','민물낚시'],
		      datasets: [
		        {
		            fill: true,
		            backgroundColor: [
		                '#15607a',
		                '#18a1cd',
		                '#39f3bb'],
		            data: respie
		// Notice the borderColor 
		        }
		    ]
		};
	var options = {
	        title: {
	                  display: true,
	                  text: '상품종류별 예약현황',
	                  position: 'top'
	              },
	        rotation: -0.7 * Math.PI,
	        responsive: true
	       
	};
	var myPieChart = new Chart(rr, {
	    type: 'pie',
	    data: resdata,
	    options: options
	});
}
function rescharttwo(x){
	let chartdate = [];
	let chartocean=[];
	let chartriver=[];
	let charthotel=[];
	$.each(x.chartlist,(x,y)=>{
		chartdate.push(y.resdate)
		chartocean.push(y.ocean)
		chartriver.push(y.river)
		charthotel.push(y.hotel)
		
	})
	
var ctx = document.getElementById('resCharttwo');	
var reslinechart = new Chart(ctx, {
		  type: 'line',
		  data: {
		    labels: chartdate,
		    datasets: [{ 
		        data: chartocean,
		        label: "바다낚시",
		        borderColor: "#226fc1",
		        fill: false
		      }, { 
		        data: chartriver,
		        label: "민물낚시",
		        borderColor: "#f4a250",
		        fill: false
		      }, { 
		        data:charthotel,
		        label: "숙박",
		        borderColor: "#e56e70",
		        fill: false
		      }]
		  },
		  options: {
		    title: {
		      display: true,
		      text: '기간별 예약변동 현황'
		    },  
		  responsive: true
		  }
		});
}
return {init:init}
})();