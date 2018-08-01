// pages/orderlist/orderlist.js
import Request from '../../datajson/request.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    index:1,
    orderlistdata:[],
    orderdata:{
      orderType: '',
      pageNo: 1,
      pageSize: 10
    },
    formId:'',
    loginTF:false,
    dataTF:false,
    fixedTF:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    console.log(this.data.loginTF)
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
    this.setData({
      'orderdata.pageNo': 1,
      orderlistdata: []
    })
    if (wx.getStorageSync("isBindPhone") == 0) {
      this.setData({
        loginTF: true,
        fixedTF:false
      })
    }else{
      this.Getjson()
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
    this.setData({
      'orderdata.pageNo': 1,
       orderlistdata:[]
    })
    this.Getjson()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.data.orderdata.pageNo++
    this.setData({
      'orderdata.pageNo': this.data.orderdata.pageNo
    })
    this.Getjson()
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },
  //选择订单分类
  Navtab(e){
    this.setData({
      index:e.currentTarget.dataset.index,
      'orderdata.orderType': e.currentTarget.dataset.type,
      orderlistdata: [],
      'orderdata.pageNo': 1
    })
    var that = this; 
    that.setData({
      fixedTF: true
    })
    this.Getjson() 
  },
  //进入订单详情
  Godetail(e){
    if (e.currentTarget.dataset.status>5){
      wx.navigateTo({
        url: './orderdetail/orderdetail?id=' + e.currentTarget.dataset.id + '&status=' + e.currentTarget.dataset.status + '&errstatus=' + e.currentTarget.dataset.errstatus,
      })
    }else{
      if (e.currentTarget.dataset.errstatus != -1 && e.currentTarget.dataset.errstatus!=-2){
        console.log("2222")
        wx.navigateTo({
          url: './orderdetail/orderdetail?id=' + e.currentTarget.dataset.id + '&status=' + e.currentTarget.dataset.status + '&errstatus=' + e.currentTarget.dataset.errstatus,
        })
      }else{
        wx.navigateTo({
          url: './errorderdetail/errorderdetail?id=' + e.currentTarget.dataset.id + '&status=' + e.currentTarget.dataset.status + '&errstatus=' + e.currentTarget.dataset.errstatus,
        })
      }
    }
  },
  //进入评价页面
  Evaluation(e){
    wx.navigateTo({
      url: '../orderlist/evaluation/evaluation?id='+e.currentTarget.dataset.id,
    })
  },
  Getjson(){
    var that=this;
    console.log("Getjson",this.data.orderdata.pageNo)
    Request.Getorderlist(this.data.orderdata, function (res) {
      that.setData({
        fixedTF: false
      })
      if (res.data.isOK) { 
        let str = JSON.stringify(res.data.data.list);
        str = str.replace(/null/g, '""');
        that.setData({
          orderlistdata: that.data.orderlistdata.concat(JSON.parse(str)),
          'orderdata.pageNo': res.data.data.pageNum,
          'orderdata.pageSize': res.data.data.pageSize,
        })
        if (that.data.orderlistdata.length == 0) {
          that.setData({
            dataTF: true
          })
        } else {
          that.setData({
            dataTF: false
          })
        }
      }
      wx.stopPullDownRefresh()
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
  },
  //登录
  Gologin:function(){
    wx.redirectTo({
      url: '../login/login',
    })
  },
  //进入智能柜列表
  Gosmark:function(){
    wx.getSetting({
      success: function (res) {
        if (res.authSetting['scope.userLocation']) {
          wx.getLocation({
            type: 'gcj02',
            success: function (res) {
              var latitude = res.latitude
              var longitude = res.longitude
              var speed = res.speed
              var accuracy = res.accuracy
              console.log("getLocation", res)
              wx.navigateTo({
                url: './../smartark/smartark?latitude=' + latitude + '&longitude=' + longitude,
                success: function (res) { },
                fail: function (res) { },
                complete: function (res) { },
              })
            }
          })
        } else {
          console.log(res.authSetting['scope.userLocation'])
          if (res.authSetting['scope.userLocation'] == false) {
            wx.openSetting({
              success: (res) => {
                console.log("res", res)
                res.authSetting = {
                  "scope.userLocation": true
                }
              }
            })
          } else {
            wx.getLocation({
              type: 'gcj02',
              success: function (res) {
                var latitude = res.latitude
                var longitude = res.longitude
                var speed = res.speed
                var accuracy = res.accuracy
                console.log("getLocation", res)
                wx.navigateTo({
                  url: './../smartark/smartark?latitude=' + latitude + '&longitude=' + longitude,
                  success: function (res) { },
                  fail: function (res) { },
                  complete: function (res) { },
                })
              }
            })
          }
        }
      }
    })
  }
})