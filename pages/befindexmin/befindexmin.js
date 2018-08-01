// pages/befindex/befindex.js
var app =getApp();
import Request from '../../datajson/request.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    formId:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    wx.onNetworkStatusChange(function (res) {
      console.log("wangluo", res.isConnected)
      console.log(res.networkType)
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
    var that=this;
    var userData = JSON.parse(e.detail.rawData)
    wx.setStorage({
      key: 'nick',
      data: userData.nickName,
    })
    wx.setStorage({
      key: 'headpic',
      data: userData.avatarUrl,
    })
    var wxdata = {
      nickName: userData.nickName,
      headImg: userData.avatarUrl,
      formId: this.data.formId
    }
    setTimeout(function () {
      
      Request.Setheadpic(wxdata, function (res) {
        console.log('re',res)
        wx.switchTab({
          url: '../index/index'
        })
      })
    },2000)
  },
  formSubmit: function (e) {
    this.setData({
      formId: e.detail.formId
    })
  }
})