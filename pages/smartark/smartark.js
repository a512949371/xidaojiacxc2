// pages/smartark/smartark.js
import Request from '../../datajson/request.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
   pagedata:{
     pageNo:1,
     pageSize:10,
     longitude:0,
     latitude:0
   },
   amartaskdata:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      'pagedata.longitude': options.longitude,
      'pagedata.latitude': options.latitude,
    })
    this.Getjson()
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
    this.setData({
      'pagedata.pageNo': 1,
      amartaskdata: []
    })
    this.Getjson()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.data.pagedata.pageNo++;
    this.setData({
      'pagedata.pageNo': this.data.pagedata.pageNo,
      fixedTF: true
    })
    this.Getjson()
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },
  //打开地图
  Gohere(e){
    let that=this;
    let latitude = e.currentTarget.dataset.latitude
    let longitude = e.currentTarget.dataset.longitude
    let name = e.currentTarget.dataset.name
    let address = e.currentTarget.dataset.address
    console.log(latitude, longitude, name, address)
    wx.getSetting({
      success: function (res) {
        wx.setStorageSync("isout", "1")
        if (res.authSetting['scope.userLocation']) {
        wx.getLocation({
          type: 'gcj02', //返回可以用于wx.openLocation的经纬度
          success: function (res) {
            console.log(latitude)
            wx.openLocation({
              latitude: latitude,
              longitude: longitude,
              name: name,
              address:address,
              scale: 28
            })
          }
        })
        } else {
          wx.openSetting({
            success: (res) => {
              res.authSetting = {
                "scope.userLocation": true
              }
            }
          })
        }
      }
    })
  },
  Getjson() {
    var that = this;
    
     Request.Getsmartask(this.data.pagedata, function (res) {
      console.log("Getsmartask",res)
      if (res.data.isOK) {
        let str = JSON.stringify(res.data.data.list);
        str = str.replace(/null/g, '""');
        that.setData({
          amartaskdata: that.data.amartaskdata.concat(JSON.parse(str)),
          'pagedata.pageNo': res.data.data.pageNo,
          'pagedata.pageSize': res.data.data.pageSize,
        })
      }
      wx.stopPullDownRefresh()
    })
    
  }
})