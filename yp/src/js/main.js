requirejs.config({
	baseUrl:"js/lib",
	paths:{
		jQuery:'jquery.min',
		baiduT:'baiduTemplate',
		swiper:'swiper.min',
		lazyload:'lazyload.min',
		extend:'jquery.extend'
	}
});
requirejs(['jQuery','baiduT','swiper','lazyload','extend'],function(
	$,template,Swiper,lazyload){
	console.log($,template,Swiper,lazyload);
	// setInterval(function(){
	// 	$(".slider_txt dl").stop().animate({top:9},function(){
	// 		// $(this).append($(this).children().eq(0));
	// 		$(this).children().eq(0).appendTo($(this));
	// 		$(this).css("top",40);
	// 	});
	// },2000);
	$(".slider_txt dl").scrollItem("top",40,1000);
	$(".list ul").scrollItem("left",200,2000);
	$(".menu").switchTab('.submenu');
})