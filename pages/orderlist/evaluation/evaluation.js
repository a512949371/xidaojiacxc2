// pages/orderlist/evaluation/evaluation.js
import Request from '../../../datajson/request.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    star: 5,
    textare:'',
    starMap: [
      '非常差',
      '差',
      '一般',
      '好',
      '非常好',
    ],
    labeldata:[{
      type:1,
      desc:'下单方便'
      },
      {
        type: 1,
        desc: '价格合理'
      }, {
        type: 1,
        desc: '物流快'
      }, {
        type: 1,
        desc: '洗的干净'
      }, {
        type: 1,
        desc: '操作方便'
      },
      {
        type: 1,
        desc: '物流慢'
      },
      {
        type: 1,
        desc: '操作复杂'
      },
      {
        type: 1,
        desc: '价格偏高'
      },
      {
        type: 1,
        desc: '洗护有瑕疵'
      },
      ],
      evadata:{
        stars:'',
        lable: '',
        content:'',
        oderId:''
      }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   this.setData({
     'evadata.oderId': options.id
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
  //改变评分星级
  myStarChoose(e) {
    let star = parseInt(e.currentTarget.dataset.star) || 0;
    this.setData({
      star: star,
    });
  },
  //选择服务印象
  Label(e){
    for (let i = 0; i < this.data.labeldata.length;i++){
      if(i==e.currentTarget.dataset.index){
        if (this.data.labeldata[i].type==1){
          this.data.labeldata[i].type = 2
        }else{
          this.data.labeldata[i].type = 1
        }
      }
    }
  this.setData({
    labeldata: this.data.labeldata
  })
  },
  //输入用户评价
  Textare(e){
    this.setData({
      textare:e.detail.value
    })
  },
  //提交用户评价
  Seteva(){
    var that=this;
    var text ='';
    for (var i = 0; i < this.data.labeldata.length;i++){
      if (this.data.labeldata[i].type==2){
        text = this.data.labeldata[i].desc + ';' + text 
      }
    }
    this.setData({
      'evadata.stars': this.data.star,
      'evadata.lable': text,
      'evadata.content': this.data.textare,
    })
    if (this.data.evadata.lable != '' || this.data.evadata.content!=''){
      Request.Setordereva(this.data.evadata,function(res){
        console.log("Setordereva",res)
        if(res.data.isOK){
          wx.redirectTo({
            url: '../orderdetail/orderdetail?id=' + that.data.evadata.oderId + '&status=7&errstatus=0',
          })
        }
      })
    }
    console.log(this.data.evadata)
  }
})