$(window).on('scroll', function(){
scrollTop = $(window).scrollTop();
if(scrollTop >= 40){
$('.commonnav').addClass('scroll');
$('.commonnav').stop(true).css({'position' : 'fixed'});
}else{
$('.commonnav').removeClass('scroll');
$('.commonnav').stop(true).css({'position' : ''});
}
});