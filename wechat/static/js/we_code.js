$(".bg .code li").hide();
$('.bg .hit li').eq(0).css({background:'#fa5a03'});
$('.bg .hit li').eq(0).css({color:'white'});
$('.bg .code li').eq(0).show();
$('.bg .hit li').click(function(){
    $(".bg .code li").eq($(this).index()).show().siblings().hide();
    $(this).css({background:'#fa5a03'}).siblings().css({background:''});
    $(this).css({color:'white'}).siblings().css({color:''});
})