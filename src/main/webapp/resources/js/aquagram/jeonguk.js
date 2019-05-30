"use strict";
var jeonguk = jeonguk || {};
jeonguk =(()=>{
	
	let init =()=>{
		onCreate();
		
	};
	let onCreate =()=>{
		setContentView();
	};
	let setContentView =()=>{		
		$.when(
				$.getScript($.js()+'/component/jwcompo.js'),
				$.getScript($.js()+'/aquagram/auth.js')
			).done(()=>{
				
				$('#wrapper').html(jwcompo.j_main())
				auth.init();
				/*$(compo.j_main()).appendTo('#default_css');*/
				/*$(compo.j_default_script()).html('#test');*/
				
			});  
		
	};
	
	
	
/*	피드 js 방법*/
/*	let feed = ()=>{
		new Instafeed({
	        clientId: '97ae5f4c024c4a91804f959f43f2635f',
	        target: 'instafeed',
	        get: 'tagged',
	        tagName: 'photographyportfolio',
	        links: true,
	        limit: 8,
	        sortBy: 'most-recent',
	        resolution: 'standard_resolution',
	        template: '<div class="col-xs-12 col-sm-6 col-md-4 col-lg-3"><div class="photo-box"><div class="image-wrap"><a href="{{link}}"><img src="{{image}}"></a><div class="likes">{{likes}} Likes</div></div><div class="description">{{caption}}<div class="date">{{model.date}}</div></div></div></div>'
	    });
	    feed.run();
	};
	*/
	return {init:init, onCreate:onCreate}
	
})();