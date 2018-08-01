//app.js
import Request from './datajson/request.js';
App({
  onLaunch: function () {
    // 展示本地存储能力
  },
  onShow:function(options){
    var that=this;
    this.smartdata = options.query;
    if (wx.getStorageSync('token') && wx.getStorageSync('isBindPhone') == 1) {
      if (decodeURIComponent(this.smartdata.scene).split("&")[0].split("=")[0] !="cabinetId") {
        wx.getSetting({
          success:function(res){
            if (res.authSetting['scope.userInfo']){
              if (wx.getStorageSync("isout")){
                wx.removeStorageSync("isout");
                console.log("2", that.smartdata)
              }else{
                wx.switchTab({
                  url: '/pages/index/index',
                })
              }
              
            }else{
              wx.navigateTo({
                url: '/pages/befindexmin/befindexmin',
              })
            }
          }
        })
      }else{
        console.log(decodeURIComponent(this.smartdata.scene).split("&")[0].split("=")[0])
        wx.navigateTo({
          url: '/pages/befindex/befindex',
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
          if (decodeURIComponent(that.smartdata.scene).split("&")[0].split("=")[0] != "cabinetId") {
            wx.getSetting({
              success: function (res) {
                console.log("r", res)
                if (res.authSetting['scope.userInfo']) {
                  wx.switchTab({
                    url: '/pages/index/index',
                  })
                } else {
                  wx.navigateTo({
                    url: '/pages/befindexmin/befindexmin',
                  })
                }
              }
            })
          } else {
            wx.navigateTo({
              url: '/pages/befindex/befindex',
            })
          }
      })
    }
  },
  globalData: {
    userInfo: null
  },
  smartdata:''
})