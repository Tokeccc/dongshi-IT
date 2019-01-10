var mySwiper = new Swiper ('.small .swiper-container',{
    noSwiping : true,
    on:{
    init: function(){
        swiperAnimateCache(this); //隐藏动画元素 
        swiperAnimate(this); //初始化完成开始动画
    }, 
    slideChangeTransitionEnd: function(){ 
        swiperAnimate(this); //每个slide切换结束时也运行当前slide动画
    } 
    },
})
/*70 80 90选择*/
$('.chooseage li').click(function(){
    $(this).css('background','#ffd220').siblings().css('background','')
    $(this).addClass('active').siblings().removeClass('active');
    $('.navage ul li').eq($(this).index()).addClass('active').siblings().removeClass('active');
    $('.row ol').eq($(this).index()).show().siblings().hide();
    setTimeout(()=>{
        mySwiper.slideTo(1,0,true);
    },500)
})

$(".swiper-slide").addClass('swiper-no-swiping');
//从一个给定的数组arr中,随机返回num个不重复项
function getArrayItems(arr, num) {
    //新建一个数组,将传入的数组复制过来,用于运算,而不要直接操作传入的数组;
    var temp_array = new Array();
    for (var index in arr) {
        temp_array.push(arr[index]);
    }
    //取出的数值项,保存在此数组
    var return_array = new Array();
    for (var i = 0; i<num; i++) {
        //判断如果数组还有可以取出的元素,以防下标越界
        if (temp_array.length>0) {
            //在数组中产生一个随机索引
            var arrIndex = Math.floor(Math.random()*temp_array.length);
            //将此随机索引的对应的数组元素值复制出来
            return_array[i] = temp_array[arrIndex];
            //然后删掉此索引的数组元素,这时候temp_array变为新的数组
            temp_array.splice(arrIndex, 1);
        } else {
            //数组中数据项取完后,退出循环,比如数组本来只有10项,但要求取出20项.
            break;
        }
    }
    return return_array;
}

// $('.navage .bgcover div').eq(4).show()
//测试
var ArrList=[2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21];
var rmsg=getArrayItems(ArrList,6);
var num=0;
var msg=rmsg[num];
$(".pdd").click(function(){
    mySwiper.slideTo(msg,0,true);
})
var addNum=0;
var oparr=[];
$('.num_ten').click(function(){
    var qid=parseFloat($(this).parent().attr('id'));
    oparr.push({question_id:qid,option_id:$(this).index()+1});
     
    addNum+=10;
    num++;
    msg=rmsg[num];
    mySwiper.slideTo(msg,0,true);
    
})
$('.num_six').click(function(){
    var qid=parseFloat($(this).parent().attr('id'));
    oparr.push({question_id:qid,option_id:$(this).index()+1});
     
    addNum+=6;
    num++;
    msg=rmsg[num];
    mySwiper.slideTo(msg,0,true);
    
})
$('.num_three').click(function(){
    var qid=parseFloat($(this).parent().attr('id'));
    oparr.push({question_id:qid,option_id:$(this).index()+1});
     
    addNum+=3;
    num++;
    msg=rmsg[num];
    mySwiper.slideTo(msg,0,true);
    
})
$('.num_zero').click(function(){
    var qid=parseFloat($(this).parent().attr('id'));
    oparr.push({question_id:qid,option_id:$(this).index()+1});
     
    addNum+=0;
    num++;
    msg=rmsg[num];
    mySwiper.slideTo(msg,0,true);
})
$('.num_ten,.num_six,.num_three,.num_zero').click(function(){
    var newNum=Math.floor(addNum*(5/3));
    if(num==6 && 0<=newNum && newNum<=29){
        mySwiper.slideTo(22,0,true);
        var yeart=$('.chooseage li.active').index()+1;
        $('.getgrade').html(`${newNum}`)
        var getnum=$('.getgrade').html();
        $('.grades').html(getnum)
        localStorage.news = getnum;
        $('.rmmname').addClass('shake-rotate');
        $('.coverc img').click(function(){
            $('.rmmname').removeClass('shake-rotate')
            $('.mlfname,.zhname,.dkname,.hhname').addClass('shake-rotate');
        })
        $('.dbman').html('代表人物【容嬷嬷】')
        $('.coverc img').eq(3).show();
        $('.hid').eq(3).show();
        $('.coverc img').eq(3).css('zIndex',1)
        $('.hid').eq(3).css('zIndex',2)
        $('.getbtn').click(function(){
            $('.bgcover').show();
           
            $('.midhb_rmm').show()
            
        })
        $.ajax({
            type:'get',
            url:'http://fm.t.u-edus.com/user/user/answerSubmit',
            crossDomain: true,
            data:{"data":JSON.stringify(oparr),"yeartype":yeart},
            success:function(data){
                // console.log(data)
            },
            error:function(error){
                // console.log(error)
            }
        })
    }else if(num==6 && 30<=newNum && newNum<=59){
        mySwiper.slideTo(24,0,true);
        var yeart=$('.chooseage li.active').index()+1;
        $('.getgrade').html(`${newNum}`)
        var getnum=$('.getgrade').html();
        $('.grades').html(getnum)
        localStorage.news = getnum;
        $('.zhname').addClass('shake-rotate');
        $('.coverc img').click(function(){
            $('.zhname').removeClass('shake-rotate')
            $('.mlfname,.dkname,.rmmname,.hhname').addClass('shake-rotate');
        })
        $('.dbman').html('代表人物【甄嬛】')
        $('.coverc img').eq(0).show();
        $('.hid').eq(0).show();
        $('.coverc img').eq(0).css('zIndex',1)
        $('.hid').eq(0).css('zIndex',2)
        $('.getbtn').click(function(){
            $('.bgcover').show();
           
            $('.midhb_zh').show()
            
        })
        $.ajax({
            type:'get',
            url:'http://fm.t.u-edus.com/user/user/answerSubmit',
            crossDomain: true,
            data:{"data":JSON.stringify(oparr),"yeartype":yeart},
            success:function(data){
                // console.log(data)
            },
            error:function(error){
                // console.log(error)
            }
        })
    }else if(num==6 && 60<=newNum && newNum<=79){
        mySwiper.slideTo(25,0,true);
        var yeart=$('.chooseage li.active').index()+1;
        $('.getgrade').html(`${newNum}`)
        var getnum=$('.getgrade').html();
        $('.grades').html(getnum)
        localStorage.news = getnum;
        $('.dkname').addClass('shake-rotate');
        $('.coverc img').click(function(){
            $('.dkname').removeClass('shake-rotate')
            $('.mlfname,.zhname,.rmmname,.hhname').addClass('shake-rotate');
        })
        $('.dbman').html('代表人物【达康书记】')
        $('.coverc img').eq(1).show();
        $('.hid').eq(1).show();
        $('.coverc img').eq(1).css('zIndex',1)
        $('.hid').eq(1).css('zIndex',2)
        $('.getbtn').click(function(){
            $('.bgcover').show();
            
            $('.midhb_dk').show()
            
        })
        $.ajax({
            type:'get',
            url:'http://fm.t.u-edus.com/user/user/answerSubmit',
            crossDomain: true,
            data:{"data":JSON.stringify(oparr),"yeartype":yeart},
            success:function(data){
                // console.log(data)
            },
            error:function(error){
                // console.log(error)
            }
        })
    }else if(num==6 && 80<=newNum && newNum<=99){
        mySwiper.slideTo(23,0,true);
        var yeart=$('.chooseage li.active').index()+1;
        $('.getgrade').html(`${newNum}`)
        var getnum=$('.getgrade').html();
        $('.grades').html(getnum)
        localStorage.news = getnum;
        $('.hhname').addClass('shake-rotate');
        $('.coverc img').click(function(){
            $('.hhname').removeClass('shake-rotate')
            $('.mlfname,.zhname,.rmmname,.dkname').addClass('shake-rotate');
        })
        $('.dbman').html('代表人物【贺涵】');
        $('.coverc img').eq(2).show();
        $('.hid').eq(2).show();
        $('.coverc img').eq(2).css('zIndex',1)
        $('.hid').eq(2).css('zIndex',2)
        $('.getbtn').click(function(){
            $('.bgcover').show();
           
            $('.midhb_hh').show()
            
        })
        $.ajax({
            type:'get',
            url:'http://fm.t.u-edus.com/user/user/answerSubmit',
            crossDomain: true,
            data:{"data":JSON.stringify(oparr),"yeartype":yeart},
            success:function(data){
                // console.log(data)
            },
            error:function(error){
                // console.log(error)
            }
        })
    }else if(num==6 && newNum==100){
        mySwiper.slideTo(26,0,true);
        var yeart=$('.chooseage li.active').index()+1;
        $('.getgrade').html(`${newNum}`)
        var getnum=$('.getgrade').html();
        $('.grades').html(getnum)
        localStorage.news = getnum;
        $('.mlfname').addClass('shake-rotate');
        $('.coverc img').click(function(){
            $('.mlfname').removeClass('shake-rotate');
            $('.hhname,.zhname,.rmmname,.dkname').addClass('shake-rotate');
        })
        $('.dbman').html('代表人物【弥勒佛】')
        $('.coverc img').eq(4).show();
        $('.hid').eq(4).show();
        $('.coverc img').eq(4).css('zIndex',1)
        $('.hid').eq(4).css('zIndex',2)
        $('.getbtn').click(function(){
            $('.bgcover').show();
            $('.midhb_mlf').show()
        })
        $.ajax({
            type:'get',
            url:'http://fm.t.u-edus.com/user/user/answerSubmit',
            crossDomain: true,
            data:{"data":JSON.stringify(oparr),"yeartype":yeart},
            success:function(data){
                // console.log(data)
            },
            error:function(error){
                // console.log(error)
            }
        })
    }
})
$('.bigcloud').click(function(){
    window.location.href="http://fm.t.u-edus.com/user/user/signup"
})
/*数据分析接口*/
$('.edbtn').click(function(){
    $.ajax({
    url:'http://fm.t.u-edus.com/user/user/statistics',
    type:'get',
    success:function(data){
        var datamsg=data.data;
        $('.navage .fontest .totalPeople').html(`${datamsg.totalPeople}`);//总人数
        $('.navage .parctshow').html(`${datamsg.personal.rank}%`);//百分比
        var ranks=datamsg.personal.rank;
        $('.pcshow').html(ranks+'%');
        var headlogo=datamsg.personal.avatar;
        getBase64(headlogo);
        function getBase64(imgUrl) {
            window.URL = window.URL || window.webkitURL;
            var xhr = new XMLHttpRequest();
            xhr.open("get", imgUrl, true);
            // 至关重要
            xhr.responseType = "blob";
            xhr.onload = function () {
                if (this.status == 200) {
                    //得到一个blob对象
                    var blob = this.response;
                    
                    //  至关重要
                    let oFileReader = new FileReader();
                    oFileReader.onloadend = function (e) {
                        let base64 = e.target.result;
                    };
                    oFileReader.readAsDataURL(blob);
                    let src = window.URL.createObjectURL(blob);
                    $('.headt').attr('src',src)

                }
            }
            xhr.send();
        }
        localStorage.ranks=ranks;
        var arr_70=datamsg.statistics[0].total;
        var arr_80=datamsg.statistics[1].total;
        var arr_90=datamsg.statistics[2].total;
        arr_70.forEach(function(item,i){
                $('.navage .row .age_seven span').eq(i).html(item)
                $('.navage .row .age_seven .progress-bar').eq(i).css('width',item/datamsg.totalPeople*100)
        })
        arr_80.forEach(function(item,i){
                $('.navage .row .age_eight span').eq(i).html(item)
                $('.navage .row .age_eight .progress-bar').eq(i).css('width',item/datamsg.totalPeople*100)
        })
        arr_90.forEach(function(item,i){
                $('.navage .row .age_nine span').eq(i).html(item)
                $('.navage .row .age_nine .progress-bar').eq(i).css('width',item/datamsg.totalPeople*100)
        })
    },
    error:function(error){
        // console.log(error)
    }
})
})

/*点击查看数据*/
$('.people .edbtn').click(function(){
    mySwiper.slideTo(32,0,true);
})
/*708090选项卡*/
$('.navage ul li').click(function(){
    $(this).addClass('active').siblings().removeClass('active');
    $('.row ol').eq($(this).index()).show().siblings().hide();
    $('.row ol').eq($(this).index()).find('.namef').addClass('shake-rotate')
})
/*隐藏对应的数据*/
$('.row ol').hide()
$('.row ol').eq(0).show();

/*隐藏遮罩层*/
$('.coverc img').hide();
$('.hid').hide();
$('.bgcover').hide()
$('.bgcover .showimg').hide();
$('.navage .bgcover .showimg').hide();
$('.coverc img').click(function(){
    $(this).hide();
    $('.hid').eq($(this).index()).hide()
})
/*判断年龄并且让对应的角色晃动*/

/*生成海报*/
$('.hoverbtn').click(function(){
    var news=localStorage.news;
    var ranks=localStorage.ranks;
    if(news != null && news != ''){
        localStorage.news = news;
      }else{
        news = localStorage.news;
        this.news=news;
    }
    if(ranks != null && ranks != ''){
        localStorage.ranks = ranks;
      }else{
        ranks = localStorage.ranks;
        this.ranks=ranks;
    }
})
$('.zhname').click(function(){
    $(this).removeClass('shake-rotate');
    $('.hid').eq(0).show();
    $('.hid').click(function(){
        $(this).hide();
    })
})
$('.hhname').click(function(){
    $(this).removeClass('shake-rotate');
    $('.hid').eq(2).show();
    $('.hid').click(function(){
        $(this).hide();
    })
})
$('.mlfname').click(function(){
    $(this).removeClass('shake-rotate');
    $('.hid').eq(4).show();
    $('.hid').click(function(){
        $(this).hide();
    })
})
$('.dkname').click(function(){
    $(this).removeClass('shake-rotate');
    $('.hid').eq(1).show();
    $('.hid').click(function(){
        $(this).hide();
    })
})
$('.rmmname').click(function(){
    $(this).removeClass('shake-rotate');
    $('.hid').eq(3).show();
    $('.hid').click(function(){
        $(this).hide();
    })
})