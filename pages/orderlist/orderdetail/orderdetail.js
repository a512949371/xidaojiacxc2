// pages/orderlist/orderdetail/orderdetail.js
import Request from '../../../datajson/request.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
      orderid:'',
      orderstatus:'',
      ordererrstatus: '',
      orderdetaildata:[],
      xhdetailtf:false,
      changetype:1,
      submitdata:{
        orderId:'',
        type:'',
        clothesVos:[]
      },
      alerttf:false,
      clicktf:true,
      askdata:{
        orderId:'',
        reason:''
      },
      fixedTF:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that =this;
    this.setData({
      orderid: options.id,
      orderstatus: options.status,
      ordererrstatus: options.errstatus,
    })
    console.log(this.data.orderstatus, this.data.ordererrstatus)
      Request.Getorderdetail(this.data.orderid, function (res) {
        console.log("nor",res)
        that.setData({
          fixedTF: false
        })
        if (res.data.isOK) {
          let str = JSON.stringify(res.data.data);
          str = str.replace(/null/g, '""');
          that.setData({
            orderdetaildata: JSON.parse(str),
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
  onShareAppMessage: function (res) {
    return {
      title: '洗到家-智能洗衣柜，您的衣鞋洗护管家，解决社区洗衣最后一公里',
      path: '/pages/index/index?page=share'
    }
  },
  Reduct(e){
    var weaterdata = this.data.orderdetaildata.orderErrorClothesList.orderClothesVos
    var num =e.currentTarget.dataset.index;
    if (weaterdata[num].clothesNum>0){
      weaterdata[num].clothesNum--;
      this.data.orderdetaildata.orderErrorClothesList.totalNum--;
    }else{
      weaterdata[num].clothesNum=0
    }   
    this.setData({
      'orderdetaildata.orderErrorClothesList.orderClothesVos':weaterdata,
      'orderdetaildata.totalNum': this.data.orderdetaildata.totalNum
    })
  },
  Add(e){
    var weaterdata = this.data.orderdetaildata.orderErrorClothesList.orderClothesVos
    var num = e.currentTarget.dataset.index;
    weaterdata[num].clothesNum++;
    this.data.orderdetaildata.orderErrorClothesList.totalNum++;
    this.setData({
      'orderdetaildata.orderErrorClothesList.orderClothesVos':weaterdata,
      'orderdetaildata.orderErrorClothesList.totalNum': this.data.orderdetaildata.orderErrorClothesList.totalNum
    })    
  },
  //打开或关闭洗护信息
  Openxhdetail(){
    this.setData({
      xhdetailtf: !this.data.xhdetailtf
    })
  },
  //已放件异常订单-取消订单
  Errordercancel(e){
    var that = this;
    wx.showModal({
      title: '提示',
      content: '是否确认取消此订单',
      success: function (res) {
        if (res.confirm) {
          var ordercanceldata = {
            orderId: e.currentTarget.dataset.orderid,
            type: 3
          }
          that.setData({
            fixedTF: true
          })
          Request.Errordercancel(ordercanceldata, function (res) {
            console.log(res)
            that.setData({
              fixedTF: false
            })
            if(res.data.isOK){
              wx.switchTab({
                url: '../../orderlist/orderlist',
              })
            }else{
              wx.showModal({
                title: '提示',
                content: res.data.msg,
                showCancel:false,
                success: function (res) {
                  if (res.confirm) {
                    console.log('用户点击确定')
                  }
                }
              })
            }
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  //切换订单状态
  Changestatus(e){
    this.setData({
      changetype:e.currentTarget.dataset.type
    })
  },
  //异常订单处理
  Saveerrdetail(){
    var that=this;
    this.setData({
      'submitdata.clothesVos': [],
    })
    var classdata={
      clothesNum:'',
      id:'',
    }
    var showtext='';
    var weaterdata = this.data.orderdetaildata.orderErrorClothesList.orderClothesVos
    if (this.data.changetype==1){
      for (let i = 0; i < weaterdata.length; i++) {
        classdata.clothesNum = weaterdata[i].clothesNum;
        classdata.id = weaterdata[i].id;;
        this.data.submitdata.clothesVos.push(classdata)
        showtext = weaterdata[i].classTypeName + ':' + weaterdata[i].clothesNum + ";" + showtext
        this.setData({
          'submitdata.clothesVos': this.data.submitdata.clothesVos,
        })
      }
    }
    this.setData({
      'submitdata.type': this.data.changetype,
      'submitdata.orderId': this.data.orderid,
    })
    console.log(this.data.submitdata)
    wx.showModal({
      title: '是否确定修改此订单信息',
      content: showtext,
      success: function (res) {
        if (res.confirm) {
          that.setData({
            fixedTF: true
          })
          Request.Errordercancel(that.data.submitdata, function (res) {
            console.log("32",res)
            that.setData({
              fixedTF: false
            })
            if (res.data.isOK) {
              wx.switchTab({
                url: '../../orderlist/orderlist',
              })
            } else {
              wx.showModal({
                title: '提示',
                content: res.data.msg,
                showCancel: false,
                success: function (res) {
                  if (res.confirm) {
                    that.setData({
                      orderstatus: 5,
                      ordererrstatus: -1,
                    })
                  }
                }
              })
            }
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  //打开地图
  Gomap(e){
    var latitude = e.currentTarget.dataset.latitude
    var longitude = e.currentTarget.dataset.longitude
    let name = e.currentTarget.dataset.cabinetName
    let address = e.currentTarget.dataset.address
    wx.getLocation({
      type: 'gcj02', //返回可以用于wx.openLocation的经纬度
      success: function (res) {
        wx.openLocation({
          latitude: latitude,
          longitude: longitude,
          name: name,
          address: address,
          scale: 28
        })
      }
    })
  },
  //打开紧急开柜弹窗
  openask(e){
    console.log(e.currentTarget.dataset.isplay)
    if (this.data.clicktf&&e.currentTarget.dataset.isplay==1){
      this.setData({
        alerttf: true,
        'askdata.orderId': this.data.orderid
      })
    }
  },
  //紧急开柜
  Emergencyask(e){
    var that =this;
    if (this.data.askdata.reason!=''){
      that.setData({
        fixedTF: true
      })
      Request.Emergencyask(this.data.askdata, function (res) {
        console.log("Emergencyask",res)
        that.setData({
          fixedTF: false
        })
        if(res.data.isOK){
          that.setData({
            clicktf:false,
            alerttf:false,
          })
          setTimeout(function(){
            wx.showToast({
              title: '紧急开柜申请成功',
              icon: 'none',
              duration: 2000
            })
          },1000)
          
        }else{
          console.log("3",res.data.isOK)
          that.setData({
            alerttf: false,
          })
          setTimeout(function(){
            wx.showToast({
              title: res.data.msg,
              icon: 'none',
              duration: 2000,
            })
          },1000)
        }
      })
    }else{
      wx.showToast({
        title: '紧急开柜信息必填',
        icon: 'none',
        duration: 2000
      })
    }
    
  },
  //输入紧急开柜信息
  Inputtext(e){
    this.setData({
      'askdata.reason':e.detail.value
    })
  },
  //进入评价页面
  Evaluation(e) {
    wx.navigateTo({
      url: '../evaluation/evaluation?id=' + e.currentTarget.dataset.id,
    })
  },
  //返回首页
  Gohome(){
    wx.switchTab({
      url: '../../index/index',
    })
  }
})