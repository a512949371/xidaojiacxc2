// pages/index/weatertype/weatertype.js
import Request from '../../../datajson/request.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
   pid:'',
   name:'',
   current:0,
   classificationdata:[],
   classificationdetaildata:[],
   fixedTF: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
   this.setData({
     pid:options.id,
     name:options.name + "洗护",
     current: options.index
   })
     wx.setNavigationBarTitle({
       title: this.data.name
     })
     Request.Getclassification('', function (res) {
       console.log("Getclassification", res)
       if (res.data.isOK) {
         that.setData({
           classificationdata: res.data.data
         })
       }
     })
     Request.Getclassificationdetail(this.data.pid,function(res){
       console.log('Getclassificationdetail',res)
       that.setData({
         fixedTF: false
       })
       if(res.data.isOK){
         let str = JSON.stringify(res.data.data);
         str = str.replace(/null/g, '""');
         that.setData({
           classificationdetaildata: JSON.parse(str)
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
  //切换洗护分类
  Tab(e){
    var that =this;
    this.setData({
      pid: e.currentTarget.dataset.id,
      current:e.currentTarget.dataset.index,
      name: e.currentTarget.dataset.name+"洗护",
    })
    console.log(this.data.current)
    wx.setNavigationBarTitle({
      title: this.data.name
    })
    that.setData({
      fixedTF: true
    })
    Request.Getclassificationdetail(this.data.pid, function (res) {
      console.log('Getclassificationdetail', res)
      that.setData({
        fixedTF: false
      })
      if (res.data.isOK) {
        let str = JSON.stringify(res.data.data);
        str = str.replace(/null/g, '""');
        that.setData({
          classificationdetaildata: JSON.parse(str)
        })
      }
    })
  }
})