//app.js
import Request from './datajson/request.js';
App({
  onLaunch: function (options) {
    // 展示本地存储能力
  },
  onShow:function(options){
    var that=this;
    this.smartdata = options.query;  //{ scene: "no%3D000117023%26tp%3D552%26id%3Daqrb7333" };
    if (wx.getStorageSync('token') && wx.getStorageSync('isBindPhone') == 1) {
      console.log("345",this.smartdata);
      if (decodeURIComponent(this.smartdata.scene).split("&")[0].split("=")[0] !="no") {
        console.log("share", this.smartdata.page);
        if (decodeURIComponent(this.smartdata.scene).split("&")[0].split("=")[0] == "page"){
          var data={
            channel:1,
            type: decodeURIComponent(this.smartdata.scene).split("&")[0].split("=")[1]
          }
          Request.Uservisit(data,function(res){
            console.log("Uservisitshare",res)
          })
        }else{
          var data = {
            channel: 1,
            type: this.smartdata.page||'icon'
          }
          Request.Uservisit(data, function (res) {
            console.log("Uservisit", res)
          })
        }
        wx.getSetting({
          success:function(res){
            if (res.authSetting['scope.userInfo']){
              if (wx.getStorageSync("isout") || JSON.stringify(that.smartdata)!='{}'){
                wx.removeStorageSync("isout");
                console.log("2", that.smartdata)
              }else{
                wx.switchTab({
                  url: '/pages/index/index',
                })
              }
            }
          }
        })
      }else{
        var data = {
          channel: 1,
          type: 'teminal'
        }
        Request.Uservisit(data, function (res) {
          console.log("Uservisitteminal", res)
        })
      }
    } else {
      Request.Login(function (res) {
        console.log(res)
        wx.setStorage({
          key: "token",
          data: res.data.data.token
        })
        wx.setStorage({
          key: "isBindPhone",
          data: res.data.data.isBindPhone
        }) 
        console.log(that.smartdata)   
          if (decodeURIComponent(that.smartdata.scene).split("&")[0].split("=")[0] !="no") {
            console.log("share", decodeURIComponent(that.smartdata.scene).split("&")[0].split("=")[0]);
            if (decodeURIComponent(that.smartdata.scene).split("&")[0].split("=")[0] == "page") {
              var data = {
                channel: 1,
                type: decodeURIComponent(that.smartdata.scene).split("&")[0].split("=")[1]
              }
              Request.Uservisit(data, function (res) {
                console.log("Uservisitshare", res)
              })
            } else {
              console.log("走到这里了")
              var data = {
                channel: 1,
                type:that.smartdata.page||'icon'
              }
              Request.Uservisit(data, function (res) {
                console.log("Uservisit", res)
              })
            }
            wx.getSetting({
              success: function (res) {
                console.log("r", res)
                if (res.authSetting['scope.userInfo']) {
                  wx.switchTab({
                    url: '/pages/index/index',
                  })
                }
              }
            })
          } else {
            var data = {
              channel: 1,
              type: 'teminal'
            }
            Request.Uservisit(data, function (res) {
              console.log("Uservisitteminal", res)
            })
            if (res.data.data.isBindPhone == 0) {
              wx.redirectTo({
                url: '/pages/login/login',
              })
            }
        } 
      })
    }
  },
  globalData: {
    userInfo: null
  },
  smartdata:''
})