"use strict";
function Session(x){
	
	sessionStorage.setItem('ctx',x);
    sessionStorage.setItem('js',x+'/resources/js');
    sessionStorage.setItem('img',x+'/resources/img');
    sessionStorage.setItem('css',x+'/resources/css');
    sessionStorage.setItem('jq',x+'/resources/jquery');
    sessionStorage.setItem('font',x+'/resources/font');
    return {
    	
    	ctx : ()=>{return sessionStorage.getItem('ctx')},
		   js : ()=>{return sessionStorage.getItem('js')},
		   css : ()=>{return sessionStorage.getItem('css')},
		   img : ()=>{return sessionStorage.getItem('img')},
		   jq : ()=>{return sessionStorage.getItem('jq')},
		   font : ()=>{return sessionStorage.getItem('font')}
    }
}