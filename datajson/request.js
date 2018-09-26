var Httpone ='https://xdj2.txw18.com/user'
//var Httpone = 'http://192.168.54.35:8088/user'
var Httptwo = 'https://xdj2.txw18.com/order'
var Httpthree = 'https://xdj2.txw18.com/terminal'
var Httpfour = 'https://xdj2.txw18.com/pay'
// 获取token
var Login=function(onsuccess){
 
  wx.login({
    success: res => {
      console.log(res.code)
      Ajaxpost(Httpone,'/api/auth/login',{code:res.code},function(res){
        onsuccess(res)
      })
    }
  })
}
 // 注册
var Register=function(data,onsuccess){
  Ajaxpost(Httpone,'/api/login/register',data,function(res){
    onsuccess(res)
  })
}
//发送验证码
var Sms=function(data,onsuccess){
  Ajaxget(Httpone,'/api/login/sendMessage/'+data,'',function(res){
    onsuccess(res)
  })
}
//获取个人信息
 var Getuserinfo=function(onsuccess){
   Ajaxget(Httpone,'/api/account/accountInfo','',function(res){
     onsuccess(res)
   })
 }
 //更新用户信息
 var Setuserinfo=function(data,onsuccess){
   Ajaxpost(Httpone,'/api/account/update',data,function(res){
     onsuccess(res)
   })
 }
 //个人头像信息更新
 var Setheadpic=function(data,onsuccess){
   Ajaxpost(Httpone,'/api/account/updateWxInfo',data,function(res){
     onsuccess(res)
   })
 }
 //用户确认登录结果查询
 var Usertruelogin = function (data,onsuccess) {
   Ajaxget(Httpone, '/api/account/terminalLoginResult/'+data, '', function (res) {
     onsuccess(res)
   })
 }
 //获取用户订单列表
 var Getorderlist=function(data,onsuccess){
   Ajaxpost(Httptwo,'/api/orderList/selectOrderList',data,function(res){
    onsuccess(res)
  })
 }
 //获取订单详情-正常订单
 var Getorderdetail = function (data, onsuccess) {
   Ajaxget(Httptwo, '/api/orderDetail/'+data, '', function (res) {
     onsuccess(res)
   })
 }
 //获取订单详情-异常订单
 var Geterrorderdetail = function (data, onsuccess) {
   Ajaxget(Httptwo, '/api/orderErrorDetails/selectOrderError/' + data, '', function (res) {
     onsuccess(res)
   })
 }
 //异常订单-取消订单
 var Errordercancel = function (data, onsuccess) {
   Ajaxpost(Httptwo, '/api/orderDetail/unusualDealWith', data, function (res) {
     onsuccess(res)
   })
 }
 //订单-紧急开柜
 var Emergencyask = function (data, onsuccess) {
   Ajaxpost(Httptwo, '/api/orderOpenBox/insertOrderError', data, function (res) {
     onsuccess(res)
   })
 }
 //订单评价
 var Setordereva = function (data, onsuccess) {
   Ajaxpost(Httptwo, '/api/oderComment/insertComment', data, function (res) {
     onsuccess(res)
   })
 }
 //获取充值选择列表
 var Recharge = function (data, onsuccess) {
   Ajaxget(Httptwo, '/api/chargeConfig', data, function (res) {
     onsuccess(res)
   })
 }
 //下单接口
 var Produceorder = function (data, onsuccess) {
   Ajaxpost(Httpfour, '/api/pay/unifiedPay', data, function (res) {
     onsuccess(res)
   })
 }
 //获取消费记录列表
 var Transactioncharge = function (data, onsuccess) {
   Ajaxget(Httptwo, '/api/transaction/charges/' + data.pageSize + '/' + data.pageNo, '', function (res) {
     onsuccess(res)
   })
 }
 //获取消费记录列表
 var Transactionpay = function (data, onsuccess) {
   Ajaxget(Httptwo, '/api/transaction/pays/'+data.pageSize+'/'+data.pageNo, '', function (res) {
     onsuccess(res)
   })
 }
 //获取智能柜列表
 var Getsmartask = function (data, onsuccess) {
   Ajaxget(Httpthree, '/api/cabinetList?pageNo=' + data.pageNo + '&pageSize=' + data.pageSize + '&longitude=' + data.longitude + '&latitude=' + data.latitude, '', function (res) {
     onsuccess(res)
   })
 }
 //获取洗护范围
 var Getclassification = function (data, onsuccess) {
   Ajaxget(Httpthree, '/api/clothesDetail/selectClothesType', '', function (res) {
     onsuccess(res)
   })
 }
 //获取洗护详情
 var Getclassificationdetail = function (data, onsuccess) {
   Ajaxget(Httpthree, '/api/clothesDetail/selectByType/'+data, '', function (res) {
     onsuccess(res)
   })
 }
 //授权时显示的智能柜信息
 var Smartaskinfo=function(data,onsuccess){
   Ajaxget(Httpthree, '/api/cabinetBaseInfo/' + data, '', function (res) {
     onsuccess(res)
   })
 }
 //会员登录-开柜接口
 var Viplogin=function(data,onsuccess){
   Ajaxget(Httpthree, '/api/accountLogin?cabinetNo=' + data.cabinetNo + '&type=' + data.type+'&id='+data.id, '', function (res) {
     onsuccess(res)
   })
 }
 //记录用户访问量
var Uservisit=function(data,onsuccess){
   Ajaxpost(Httpone,'/api/browseRecord/save',data,function(res){
     onsuccess(res)
   })
 }
//post请求
var Ajaxpost=function(Http,url,data,onsuccess){
  wx.request({
    method:"POST",
    url: Http + url,
    data:data,
    header: {
      'content-type': 'application/json',
      'Authorization':"Bearer "+wx.getStorageSync("token")||'' 
    },
    success: function (res) {
      onsuccess(res)
    },
    fail:function(res){
      onsuccess(res)
      wx.showToast({
        title: '网络错误，请等待网络正常之后重试',
        icon: "none",
        duration:4000
      })
    },
    complete:function(res){
      console.log("23232",res)
      let i=0
      if (res.statusCode == 401  ){
        if(i<3){
          i++;
          Login(function (res) {
            wx.setStorageSync("token", res.data.data.token)
            wx.setStorageSync("isBindPhone", res.data.data.isBindPhone)
            if (res.statusCode == 200) {
              setTimeout(function () {
                Ajaxpost(Http, url, data, onsuccess)
              }, 2000)
            }
          })
        }
      } else if (res.statusCode == 405){
        wx.setStorageSync("isBindPhone", "0")
      } else if (res.statusCode == 402) {
        wx.showToast({
          title: '该账户已被冻结',
          icon:"none",
          duration: 2000
        })
      }
    }
  })
}
//get请求
var Ajaxget = function (Http,url, data, onsuccess) {
  wx.request({
    method:"GET",
    url: Http + url, 
    data: data,
    header: {
      'content-type': 'application/json',
      'Authorization': "Bearer " + wx.getStorageSync("token") || '' 
    },
    success: function (res) {
      onsuccess(res)
    },
    fail: function (res) {
      onsuccess(res)
      wx.showToast({
        title: '网络错误，请等待网络正常之后重试',
        icon:"none",
        duration: 4000
      })
    },
    complete: function (res) {
      let i = 0;
      if (res.statusCode == 401) {
        if (i < 3) {
        i++;
        setTimeout(function () {
          Login(function (res) {
            wx.setStorageSync("token", res.data.data.token)
            wx.setStorageSync("isBindPhone",res.data.data.isBindPhone)
            if (res.statusCode==200){
              setTimeout(function(){
                Ajaxget(Http, url, data, onsuccess)
              },2000)
            }
          })
        }, 2000)
        }
      } else if (res.statusCode == 405) {
        wx.setStorageSync("isBindPhone", "0")
      } else if (res.statusCode == 402) {
        wx.showToast({
          title: '该账户已被冻结',
          icon: "none",
          duration: 2000
        })
      }
        
    }
  })
}
module.exports={
  Ajaxpost: Ajaxpost,
  Ajaxget: Ajaxget,
  Login: Login,
  Register: Register,
  Sms:Sms,
  Getuserinfo: Getuserinfo,
  Setuserinfo: Setuserinfo,
  Setheadpic: Setheadpic,
  Getorderlist: Getorderlist,
  Getorderdetail: Getorderdetail,
  Geterrorderdetail: Geterrorderdetail,
  Errordercancel: Errordercancel,
  Getsmartask: Getsmartask,
  Getclassification: Getclassification,
  Getclassificationdetail:Getclassificationdetail,
  Setordereva: Setordereva,
  Emergencyask: Emergencyask,
  Smartaskinfo: Smartaskinfo,
  Viplogin: Viplogin,
  Usertruelogin: Usertruelogin,
  Uservisit: Uservisit,
  Recharge: Recharge,
  Transactionpay: Transactionpay,
  Transactioncharge: Transactioncharge,
  Produceorder: Produceorder
}