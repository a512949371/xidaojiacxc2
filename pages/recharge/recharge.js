// pages/recharge/recharge.js
import Request from '../../datajson/request.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    moneydata:'',
    orderlistdata: [],
    actindex:'',
    paydata:{
      id:'',
      amount:''
    },
    fixedTF: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
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
            'moneydata': (res.data.data.balance + res.data.data.giftBalance).toFixed(2),
          })
        }
      }
    })
    Request.Recharge('', function (res) {
      console.log(res)
      if (res.data.isOK) {
        that.setData({
          orderlistdata: res.data.data,
        })
      }
    })
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
  //选择金额
  Changepay(e){
    console.log(e)
    this.setData({
      actindex:e.currentTarget.dataset.num,
      'paydata.id': e.currentTarget.dataset.id,
      'paydata.amount': e.currentTarget.dataset.money,
    })
  },
  //支付
  Gopay(){
    var that =this;
    if (this.data.paydata.id!=''){
      this.setData({
        fixedTF:true
      })
      Request.Produceorder(this.data.paydata, function (res) {
        console.log("pay", res)
        that.setData({
          fixedTF: false
        })
        if(res.data.isOK){
          that.setData({
            fixedTF: true
          })
          var parameter =JSON.parse(res.data.data);
          console.log(parameter)
          wx.requestPayment({
            timeStamp: parameter.timeStamp,
            nonceStr: parameter.nonceStr,
            package: parameter.package,
            signType: parameter.signType,
            paySign: parameter.sign,
            complete:function(){
              wx.setStorageSync("isout", "1")
              that.setData({
                fixedTF: false
              })
            }
          })
        }else{
          wx.showToast({
            title: res.data.msg,
            icon: "none"
          })
        }
        
      })
    }else{
      wx.showToast({
        title: '请选择充值金额',
        icon:"none"
      })
    }

  },
  //充值记录
  Gopaylist(){
    wx.navigateTo({
      url: './rechargelist/rechargelist',
    })
  },
  //充值协议
  Gorule(){
    wx.navigateTo({
      url: './rechargerule/rechargerule',
    })
  }
})