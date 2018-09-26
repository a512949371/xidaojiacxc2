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
  moneydata:{
    allmoney:'',
    giftmoney:'',
    couponNum:''
  }
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
    Request.Getuserinfo(function (res) {
      console.log("userinfo", res)
      
      if (res.data.isOK) {
        if (res.data.data != null) {
          that.setData({
            'moneydata.allmoney': (res.data.data.balance + res.data.data.giftBalance).toFixed(2),
            'moneydata.giftmoney': res.data.data.giftBalance.toFixed(2),
            'moneydata.couponNum': res.data.data.couponNum,
          })
        }
      }
      if (res.data.data.headImg == null || res.data.data.nickName==null){
        var wxdata = {
          nickName: wx.getStorageSync("nick")||"2323",
          headImg: wx.getStorageSync("headpic")||"3232",
        }
        Request.Setheadpic(wxdata, function (res) {
          console.log('re', res)
        })
      }
      
    })  
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
  onShareAppMessage: function (res) {
    return {
      title: '洗到家-智能洗衣柜，您的衣鞋洗护管家，解决社区洗衣最后一公里',
      path: '/pages/index/index?page=share'
    }
  },
  //拨打电话
  Gophone(){
    wx.setStorageSync("isout", "1")
    wx.makePhoneCall({
      phoneNumber: '13099968918' //仅为示例，并非真实的电话号码
    })
  },
  //跳转信息编辑
  Gomyinfo(e){
    if(e.currentTarget.dataset.num==0){
      wx.navigateTo({
        url: '../recharge/recharge'
      })
    } else if (e.currentTarget.dataset.num == 1){
      wx.navigateTo({
        url: '../recharge/rechargelist/rechargelist'
      })
    } else if (e.currentTarget.dataset.num == 2) {
      wx.navigateTo({
        url: '../consumptionlist/consumptionlist'
      })
    } else if (e.currentTarget.dataset.num == 3) {
      wx.navigateTo({
        url: './myinfo/myinfo'
      })
    }
    
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