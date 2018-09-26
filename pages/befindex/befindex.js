// pages/befindex/befindex.js
var app =getApp();
import Request from '../../datajson/request.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    smartinfodata:'',
    truelogin:true,
    truetime:1,
    key:'',
    cabinetId:'',
    type:'',
    oneid:'',
    formId:'',
    fixedTF:false,
    tiptext:'',
    showmodelTF:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    // 查看是否授权
    console.log("app",app.smartdata)
    if (JSON.stringify(app.smartdata) != "{}"){
      this.setData({
        cabinetId: decodeURIComponent(app.smartdata.scene).split("&")[0].split("=")[1],
        type: decodeURIComponent(app.smartdata.scene).split("&")[1].split("=")[1],
        oneid: decodeURIComponent(app.smartdata.scene).split("&")[2].split("=")[1],        
      })
    }
    wx.getSetting({
      success: function (res) {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.getUserInfo({
            success: function (res) {
            }
          })
        }
      }
    })
    Request.Smartaskinfo(this.data.cabinetId,function(res){
      console.log("Smartaskinfo",res)
      if(res.data.isOK){
        that.setData({
          smartinfodata:res.data.data
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },
  bindGetUserInfo: function (e) {
    console.log("e",e);
    this.setData({
      fixedTF:true
    })
    var that=this;
    var userData = JSON.parse(e.detail.rawData)
    var logindata={
      cabinetNo: this.data.cabinetId,
      type: this.data.type,
      id: this.data.oneid
    }
    console.log(userData)
    wx.setStorage({
      key: 'nick',
      data: userData.nickName,
    })
    wx.setStorage({
      key: 'headpic',
      data: userData.avatarUrl,
    })
    var wxdata={
      nickName: userData.nickName,
      headImg: userData.avatarUrl,
      formId: this.data.formId
    }
    setTimeout(function(){
      Request.Setheadpic(wxdata, function (res) {
        console.log('wxdata', res)
      })
      Request.Viplogin(logindata, function (res) {
        console.log("Viplogin", res)
        that.setData({
          fixedTF:false
        })
        if (res.data.isOK) {
          that.setData({
            key: res.data.data.commandKey,
            fixedTF:true
          })
          setInterval(function () {
            if (that.data.truelogin && that.data.truetime < 60) {
              that.data.truetime++;
              Request.Usertruelogin(that.data.key, function (res) {
                console.log("Usertruelogin", res)
                that.setData({
                  fixedTF:false
                })
                if (res.data.data.status == 1) {
                  if(that.data.type=='552'){
                    that.setData({
                      tiptext:'请在智能柜大屏幕上选择您要洗的衣物及数量',
                      showmodelTF:true,
                    })
                  } 
                  if (that.data.type == '562'){
                    that.setData({
                      tiptext: '请在智能柜大屏幕上点击“我要取衣”，支付后即可开柜取走衣物',
                      showmodelTF:true,
                    })
                  }
                  that.setData({
                    truelogin: false
                  })
                }else  if (res.data.data.status == -1) {
                  wx.showToast({
                    title: res.data.data.error,
                    icon: 'none',
                    duration: 2000
                  })
                  that.setData({
                    truelogin: false
                  })
                }else{
                  wx.showToast({
                    title: res.data.data.error,
                    icon: 'none',
                    duration: 2000
                  })
                  that.setData({
                    truelogin: false
                  })
                }
              })
            }else{
              that.setData({
                fixedTF:false
              })
            }
          }, 2000)

        }else{
          if (res.statusCode == 405){
            wx.removeStorageSync('token');
            wx.navigateTo({
              url: '../login/login',
            })
          }else{
            wx.showToast({
              title: res.data.msg,
              icon: 'none'
            })
          }
          
        }
      })
    },1000)

    
  },
  formSubmit: function (e) {
    console.log('form发生了submit事件，携带数据为：', e)
    this.setData({
      formId: e.detail.formId
    })
  },
  Goindex(){
    this.setData({
      showmodelTF:false
    })
    wx.switchTab({
      url: '../index/index'
    })
  }
})