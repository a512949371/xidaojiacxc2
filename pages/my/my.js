// pages/my/my.js
import Request from '../../datajson/request.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
  isLogin:0,
  nick:'',
  headpic:'',
  formId:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
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
    var that = this;
    console.log("nick", wx.getStorageSync("nick"), wx.getStorageSync("isBindPhone"), wx.getStorageSync("headpic"))
    if (wx.getStorageSync("nick")) {
      this.setData({
        isLogin: wx.getStorageSync("isBindPhone"),
        nick: wx.getStorageSync("nick"),
        headpic: wx.getStorageSync("headpic"),
      })
    } else {
      console.log("没有昵称")
      wx.getSetting({
        success: function (res) {
          if (res.authSetting['scope.userInfo']) {
            wx.getUserInfo({
              success: function (res) {
                console.log(res.userInfo)
                that.setData({
                  isLogin: wx.getStorageSync("isBindPhone"),
                  nick: res.userInfo.nickName,
                  headpic: res.userInfo.avatarUrl,
                })
                wx.setStorageSync('nick', res.userInfo.nickName);
                wx.setStorageSync('headpic', res.userInfo.avatarUrl);
              }
            })
          } else {
            wx.navigateTo({
              url: '../befindexmin/befindexmin',
            })
          }
        }
      })
    }  
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
  //拨打电话
  Gophone(){
    wx.setStorageSync("isout", "1")
    wx.makePhoneCall({
      phoneNumber: '15288151662' //仅为示例，并非真实的电话号码
    })
  },
  //跳转信息编辑
  Gomyinfo(){
    wx.navigateTo({
      url: './myinfo/myinfo',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  //登录
  Login(){
    wx.navigateTo({
      url: '../login/login',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  formSubmit: function (e) {
    console.log('form发生了submit事件，携带数据为：', e)
    this.setData({
      formId: e.detail.formId
    })
    var data = {
      formId: this.data.formId
    }
    Request.Setheadpic(data, function (res) {
      console.log('re', res)
    })
  }
})