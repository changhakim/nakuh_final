"use strict";
var changha = changha||{};

changha = (()=>{
	let init = ()=>{
		onCreate();
	}
	let onCreate=()=>{
		setContentView();
	}
	let setContentView=()=>{
		$.when(
		$.getScript($.js()+'/component/chcompo.js'),
		$.getScript($.js()+'/admin/adminres.js')
		).done(()=>{
		$('#wrapper').html(chcompo.member())
			        $('<li class="active">'
                    +'<a id="memnav" href="#">'
                    +'<i class="member"></i>'
                    +'<img src="'+$.img()+'/admin/member.png"'
                    +'<p>회원관리</p>'
                +'</a>'
            +'</li>'
            +'<li>'
                +'<a id="resnav" href="#">'
                    +'<i class="reservation"></i>'
                    +'<img src="'+$.img()+'/admin/reservation.png"'
                    +'<p>예약관리</p>'
                +'</a>'
            +'</li>').appendTo('.nav')
		let a = 'vis'
		$.getJSON($.ctx()+'/admin/visitor',d=>{
	        jQuery(document).ready(function($) {
	            $('.counter').counterUp({
	                delay: 11,
	                time: 1000
	            });
	        });
			$('#total').text(d.total)
			$('#today').text(d.today)
			$('#yesterday').text(d.yesterday)
			let visitcount = [];
			let visittime = [];
			let agecount=[d.agegroup.tengroup,
						 d.agegroup.twentygroup,
						 d.agegroup.thirtygroup,
						 d.agegroup.fourtygroup,
						 d.agegroup.fiftygroup,
						 d.agegroup.sixtygroup];
			$.each(d.term,(x,y)=>{
				visitcount.push(y.visitcount)
				visittime.push(y.visittime)
			})
			
			let visit = {visitcount:visitcount,visittime:visittime}
			visitor(visit);
			age(agecount);
		})
		$('#resnav').click(function(e){
			e.preventDefault();
			adminres.init();
		})

		
		})
	}
	return {init:init}
	
	
})();
function visitor(x){
	var ctx = document.getElementById('myChart');
	let b = [1,2,3,4,5,6]

	
	var myChart = new Chart(ctx, { 
	    type: 'line',
	    data: {
	        labels:x.visittime,
	        datasets: [{
	            label: '방문자수',
	            data: x.visitcount,
	            
                fillColor : "#5dc6c6",
                strokeColor : "#5dc6c6",
                pointColor : "#fff",
                pointStrokeColor : "#9DB86D",
	            borderWidth: 1,
	            borderColor: "#226fc1",
	            hoverBorderWidth:3,
	            hoverBorderColor:'#000'
	        }]
	    },
	    options: {
	    	title:{
	    		display:true,
	    		text:'최근 방문자 통계',
	    		fontSize:25
	    	},
	        scales: {
	            yAxes: [{
	                ticks: {
	                    beginAtZero: true
	                }
	            }]
	        },
	        layout:{
	        	
	        },
	        pointBackgroundColor:'black'
	    }
	    
	});
}
function age(x){
	var ctx = document.getElementById('age');
	
	var age = new Chart(ctx, {
	    type: 'bar',
	    data: {
	        labels: ['10대', '20대', '30대', '40대', '50대', '60대'],
	        datasets: [{
	            label: '10대',
	            data: x,
	            backgroundColor: [
	                'rgba(255, 99, 132, 0.9)',
	                'rgba(54, 162, 235, 0.9)',
	                'rgba(255, 206, 86, 0.9)',
	                'rgba(75, 192, 192, 0.9)',
	                'rgba(153, 102, 255, 0.9)',
	                'rgba(255, 159, 64, 0.9)'
	            ],
	            borderColor: [
	                'rgba(255, 99, 132, 1)',
	                'rgba(54, 162, 235, 1)',
	                'rgba(255, 206, 86, 1)',
	                'rgba(75, 192, 192, 1)',
	                'rgba(153, 102, 255, 1)',
	                'rgba(255, 159, 64, 1)'
	            ],
	            borderWidth: 1
	        }]
	    },
	    options: {
	    	 legend: {
	    	        display: false
	    	},
	    	title:{
	    		display:true,
	    		text:'연령대별 가입자 통계',
	    		fontSize:25
	    	},
	        scales: {
	            yAxes: [{
	            	barThickness : 65,
	                ticks: {
	                    beginAtZero: true
	                }
	            }]
	        }
	    }
	});
}