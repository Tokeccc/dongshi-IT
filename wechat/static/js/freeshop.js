/**
* 免费购买
* @param {function} cb 回调函数 
*/
var swiper2 = new Swiper('.small .small_swiper', {
  loop : true,
  speed:1500,
  autoplay : { delay:2000}, 
  // 如果需要分页器
  pagination: {
      el: '.small .small_swiper .swiper-pagination',
  },
});
$('.freeget').click(function(){
  $('html,body').animate({scrollTop:0})
})    
//0元购买预约
function check(){
  var phoneReg = /^1[3456789]{1}\d{9}$/;//手机号
  var yzphone=phoneReg.test($('.phonenumber').val())
  if($('.name').val()==""){
      $('.name').css({border:'1px solid red'})
      alert('请完善信息后领取');
      return false;
  }
  if($('.phonenumber').val()==""){
      $('.phonenumber').css({border:'1px solid red'})
      alert("请完善信息后领取")
  }
  if(!yzphone){
      $('.phonenumber').css({border:'1px solid red'})
      return false;
  }
  return true;
}
$('.name').blur(()=>{
  if($('.name').val()==""){
      $('.name').css({border:'1px solid red'});
      return false;
  }else{
      $('.name').css({border:''})
  }
})
$('.phonenumber').blur(()=>{
  var phoneReg = /^1[3456789]{1}\d{9}$/;//手机号
  var yzphone=phoneReg.test($('.phonenumber').val())
  if(!yzphone){
      $('.phonenumber').css({border:'1px solid red'})
      return false;
  }else{
      $('.phonenumber').css({border:''})
  }
})

//年级列表下拉
$.ajax({
    type: "GET",
    url: "http://www.u-edus.com/common/common/productType",
    dataType: "JSON",
    success: function (data) {
      var resJson = data;
      var aselect = resJson.data;
      aselect.forEach(function (item, a) {
        $('.grade').append(`<option value="${item.grade_stage_value}">${item.grade_stage_name}</option>`)
        $(".grade").eq(0).change(function() {
          $('.subject').eq(0).empty();
          $('.subject').html('');
          var optionIndex = $('.grade option:selected').index();
          console.log(optionIndex)
          if(optionIndex>0){
            var subj=aselect[optionIndex-1].subject;
            subj.forEach(function(ele,b){
              $('.subject').append(`<option value="${ele.subject_name}">${ele.subject_name}</option>`)
            })
          }else{
              $('.subject').append(`<option value="学科">学科</option>`)
          }
         
        });
      })
      var err = null;
      if (resJson.code !== 200) {
        err = new Error(resJson.message);
      }
    },
    error: function (jqXHR, textStatus, errorThrown) {
      //  console.log(textStatus)
    }
  });
  $('#freeget').click(function(){
    var yzmsg=check();
    var name=$('.name').val();
    var phonenumber=$('.phonenumber').val();
    var grade=$('.grade option:selected').val();
    var subject=$('.subject option:selected').val();
    if(yzmsg){
      $.ajax({
        type: 'GET',
        url: "http://www.u-edus.com/cc/sea/add",
        crossDomain: true,
        data: { name: name, mobile: phonenumber, grade_stage: grade, subject_intention: subject,source:19}
      }).done(function (data, textStatus, jqXHR) {
        var resJson = data;
        // console.log(resJson);
        var err = null;
        if(resJson.message=="所有值都为必填项"){
          alert('请完善信息后领取')
          return false;
        }else{
          alert('领取成功');
          window.location.href = 'http://fm.t.u-edus.com/static/bm_success.html';
        }
        if (resJson.code !== 200) {
          err = new Error(resJson.message);
        } else {
          err = null;
        }
      }).fail(function (jqXHR, textStatus, errorThrown) {
      //   cb(new Error(textStatus));
      console.log(textStatus)
      });
    }else{
        return false;
    }
  })