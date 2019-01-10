
/**
 * 公共url
 */
var urlArray=[
	{
		'apiBaseURL':'http://www.u-edus.cn',
		'myURL':'http://my.u-edus.cn',
	},{
		'apiBaseURL':'http://www.beta_u-edus.cn',
		'myURL':'http://my.beta_u-edus.cn',
	},{
		'apiBaseURL':'http://www.u-edus.com',
		'myURL':'http://my.u-edus.com',
	},{
		'apiBaseURL':'http://t2.u-edus.com',
		'myURL':'http://my.u-edus.com',
	}
]
var apiBaseURL;
var myURL;
var currentUrl = window.location.href;
var targetUrl = currentUrl.split('/');
targetUrl = 'http://'+targetUrl[2];

if(currentUrl=='http://www.u-edus.cn/' || targetUrl=='http://www.u-edus.cn'){
	apiBaseURL=urlArray[0].apiBaseURL;
	myURL=urlArray[0].myURL;
}else if(currentUrl=='http://www.beta_u-edus.cn/' || targetUrl=='http://www.beta_u-edus.cn'){
	apiBaseURL=urlArray[1].apiBaseURL;
	myURL=urlArray[1].myURL;
}else if(currentUrl=='http://www.u-edus.com/' || targetUrl=='http://www.u-edus.com'){
	apiBaseURL=urlArray[2].apiBaseURL;
	myURL=urlArray[2].myURL;
}else if(currentUrl=='http://t2.u-edus.com/' || targetUrl=='http://t2.u-edus.com'){
	apiBaseURL=urlArray[3].apiBaseURL;
	myURL=urlArray[3].myURL;
}
//var apiBaseURL = 'http://www.u-edus.cn';
//var myURL = 'http://my.u-edus.cn';
//var onlineURL='http://1v1.u-edus.cn';


//获取get传值的方法  
function GetQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg); //获取url中"?"符后的字符串并正则匹配
    var context = "";
    if (r != null)
        context = r[2];
    reg = null;
    r = null;
    return context == null || context == "" || context == "undefined" ? "" : context;
}
var pre_url = GetQueryString('url');
pre_url=decodeURIComponent(pre_url);
/**
 * 登录信息
 */
var loginObj = {
  url: {
    login: apiBaseURL + '/user/student/login',
    logout: apiBaseURL + '/user/student/logout',
    getselt: apiBaseURL + '/common/common/gradestage',
    regzc: apiBaseURL + '/user/student/register',
    resetpasw: apiBaseURL + 'user/student/findpassword',
    getsco: apiBaseURL + '/user/student/smscode',
    region: apiBaseURL + "/common/common/region",
    productType: apiBaseURL + "/common/common/productType",
    freeStudy: apiBaseURL + "/cc/sea/add",
    show: apiBaseURL + "/subject/xdy/get"
  },
  cookie: {
    auth: 'yyx_auth',
    user: 'yyx_user'
  },
  user: null
};
/**
 * 检查用户是否登录
 */
function checkLogin() {
  // 获取cookie，并检查是否登录s

  var cookieUser = Cookies.get('ypzj_user');
  if (cookieUser == null) return null;
  //已登录
  var cookieUserObj = JSON.parse(cookieUser);

  return {
    id: cookieUserObj[0],
    name: cookieUserObj[1],
    tx: '/img/tx.png'
  };
}

//登录状态检查
//var loginObj;
loginObj.user = checkLogin();
if(loginObj.user != null) {
	//登录成功，把登录按钮换成用户头像
	$('.login1').hide();
	$('.login2').show();
} else {
	$('.login1').show();
	$('.login2').hide();
}


/**
 * 用户登录接口
 * @param {string} username 
 * @param {string} password 
 * @param {function} cb 
 */
function login(username, password, cb) {
  $.ajax({
    type: 'post',
    url: loginObj.url.login,
    crossDomain: true,
    // 将XHR对象的withCredentials设为true
   	xhrFields: {
      	withCredentials: true
   	},
//  async: false,
    timeout: 5000,
    data: { username: username, password: password }
  }).done(function (data, textStatus, jqXHR) {
    var resJson = data;
    var err = null;
    if (resJson.code !== 200) {

      err = new Error(resJson.message);
      $('#errTopic').text("");
      $('#errTopic').text(resJson.message);
    } else {
      window.location.href = pre_url;
      loginObj.user = checkLogin();


    }
    cb(err, loginObj.user);
  }).fail(function (jqXHR, textStatus, errorThrown) {
    cb(new Error(textStatus));
  })
}
/**
 * 退出登录
 * @param {function} cb 回调函数
 */
function logout(cb) {
  $.ajax({
    type: 'GET',
    url: loginObj.url.logout,
    // 将XHR对象的withCredentials设为true
   	xhrFields: {
      	withCredentials: true
   	},
    crossDomain: true
  }).done(function (data, textStatus, jqXHR) {
    var resJson = data;
    var err = null;
    if (resJson.code !== 200) {
      err = new Error(resJson.message);
//       console.log("err:"+err);
    } else {
      Cookies.remove('name');

      $('.login1').show();
      $('.login2').hide();
    }
    cb(err);
  }).fail(function (jqXHR, textStatus, errorThrown) {
    cb(new Error(textStatus));
  });
}
$("#phonenumber").focus(function () {
  $("#phonenumber").css("border", "1px solid #e6e6e6");
});
$("#password").focus(function () {
  $("#password").css("border", "1px solid #e6e6e6");
});




/**
* 行政区域
* @param {function} cb 回调函数 
*/
//function region(cb) {
//  $.ajax({
//  	type:"get",
//    	url: loginObj.url.region,
//    	dataType:"JSON",
//    	success:function(data){
//    		console.log(data);
//    		var resJson = JSON.parse(data);
//    		var err = null;
//    		if (resJson.code !== 200) {
//	        	err = new Error(resJson.message);
//	      	}
//    		cb(err,resJson);
//    		console.log(resJson);
//    	},
//    	error:function (jqXHR, textStatus, errorThrown) {
//		    cb(new Error(textStatus))
//		}
//  });
//}
function region(cb) {
  $.ajax({
    type: "GET",
    url: loginObj.url.region,
    crossDomain: true,
  }).done(function (data, textStatus, jqXHR) {
    var resJson = data;
    var err = null;
    if (resJson.code !== 200) {
      err = new Error(resJson.message);
    }
    cb(err, resJson);
  }).fail(function (jqXHR, textStatus, errorThrown) {
    cb(new Error(textStatus));
  });
}

/**
* 课程类型
* @param {function} cb 回调函数 
*/
function productType(cb) {
  $.ajax({
    type: 'GET',
    url: loginObj.url.productType,
    crossDomain: true
  }).done(function (data, textStatus, jqXHR) {
    var resJson = data;
    var err = null;
    if (resJson.code !== 200) {
      err = new Error(resJson.message);
    }
    
    cb(err, resJson);
  }).fail(function (jqXHR, textStatus, errorThrown) {
    cb(new Error(textStatus));
  });
}

/**
* 免费试学
* @param {function} cb 回调函数 
*/
function freeStudy(personName, phoneNum, graText, studyType, product_Type, cb) {
  $.ajax({
    type: 'GET',
    url: loginObj.url.freeStudy,
    crossDomain: true,
    data: { name: personName, mobile: phoneNum, grade_stage: graText, subject_intention: studyType, product_type: product_Type }
  }).done(function (data, textStatus, jqXHR) {
    var resJson = data;

    var err = null;
    if (resJson.code !== 200) {
      err = new Error(resJson.message);
    } else {
      err = null;
    }

    cb(err, resJson);
  }).fail(function (jqXHR, textStatus, errorThrown) {
    cb(new Error(textStatus));
  });
}


//监听登录按键

function keyLogin() {
  if (event.keyCode != 13) {
    return null;
  } else {
    $('#rightAwayBtn').click();
  }
}
