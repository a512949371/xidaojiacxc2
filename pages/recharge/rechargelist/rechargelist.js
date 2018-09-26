// pages/recharge/rechargelist/rechargelist.js
import Request from '../../../datajson/request.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderlistdata: [],
    orderdata: {
      pageNo: 1,
      pageSize: 10
    },  
    fixedTF: true
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
    this.setData({
      'orderdata.pageNo': 1,
      orderlistdata: []
    })
    this.Getjson()
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
      orderlistdata: []
    })
    this.Getjson()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.data.orderdata.pageNo++
    this.setData({
      'orderdata.pageNo': this.data.orderdata.pageNo,
      fixedTF: true
    })
    this.Getjson()
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
  Getjson() {
    var that = this;
    Request.Transactioncharge(this.data.orderdata, function (res) {
      that.setData({
        fixedTF: false
      })
      if (res.data.isOK) {
        let str = JSON.stringify(res.data.data.list);
        str = str.replace(/null/g, '""');
        console.log(that.data.orderlistdata, JSON.parse(str));
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
})