// pages/quality/quality.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgdata:'',
    pic: [
      {src:'http://p7grh1j0l.bkt.clouddn.com/xiadanFlow.png',
       width:'750rpx',
       height:'1506rpx'
      }, 
      {src:'http://p7grh1j0l.bkt.clouddn.com/xihuFlow.png',
      width:'750rpx',
      height:'1899rpx'
      },
      {
        src: 'http://p7grh1j0l.bkt.clouddn.com/ServicePrice.png',
        width: '750rpx',
        height: '2063rpx'},
      {
        src: 'http://p7grh1j0l.bkt.clouddn.com/serviceRange.png',
        width: '750rpx',
        height: '1206rpx'}
      ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   console.log(options)
   this.setData({
     imgdata:this.data.pic[options.num]
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
  onShareAppMessage: function (res) {
    return {
      title: '洗到家-智能洗衣柜，您的衣鞋洗护管家，解决社区洗衣最后一公里',
      path: '/pages/index/index?page=share'
    }
  }
})