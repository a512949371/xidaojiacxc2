var app =getApp()
import Request from '../../datajson/request.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrls: [
      'http://p7grh1j0l.bkt.clouddn.com/sale.png',
      'http://p7grh1j0l.bkt.clouddn.com/rechargeable.png',
      'http://p7grh1j0l.bkt.clouddn.com/register.png'
    ],
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    circular:true,
    indicatorcolor:'rgba(0,0,0,0.2)',
    classificationdata:[],
    formId:'',
    fixedTF:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
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
            }
          })
        } else {
          wx.showModal({
            title: '提示',
            content: '为了更好的体验，此应用需要获取您的地理位置,是否允许？',
            cancelText:'不允许',
            confirmText:'允许',
            success: function (res) {
              if (res.confirm) {
                wx.getLocation({
                  type: 'gcj02',
                  success: function (res) {
                    var latitude = res.latitude
                    var longitude = res.longitude
                    var speed = res.speed
                    var accuracy = res.accuracy
                    console.log("getLocation", res)
                  },
                  fail: function (res) {
                    wx.showToast({
                      title: '请允许微信访问位置服务，以便为您找到附近的智能洗衣柜',
                      icon: "none"
                    })
                  }
                })
              }
            }
          })
        }
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
    var that = this;
    console.log(20 === (10, 20))
    Request.Getclassification('', function (res) {
      console.log("Getclassification", res)
      that.setData({
        fixedTF:false
      })
      if (res.data.isOK) {
        var data = res.data.data;
        var reg = /上装/g;
        var reg1 =/下装/g;
        var reg2 = /套装/g;
        var reg3 =/鞋/g;
        for (var i = 0; i < res.data.data.length;i++){
          if (data[i].name.match(reg)){
            data[i].typeImg ='http://pajsfbwn3.bkt.clouddn.com//pic1.png';
          } else if (data[i].name.match(reg1)){
            data[i].typeImg ='http://pajsfbwn3.bkt.clouddn.com//pic3.png';
          } else if (data[i].name.match(reg2)){
            data[i].typeImg ='http://pajsfbwn3.bkt.clouddn.com//pic2.png';
          } else if (data[i].name.match(reg3)){
            data[i].typeImg ='http://pajsfbwn3.bkt.clouddn.com//pic4.png';
          }else{
            data[i].typeImg =''
          }
        }
        that.setData({
          classificationdata: res.data.data
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
  //跳转洗护分类
  Go(e){
    wx.navigateTo({
      url: '../index/weatertype/weatertype?id=' + e.currentTarget.dataset.id + '&name=' + e.currentTarget.dataset.name + '&index=' + e.currentTarget.dataset.index
    })
  },
  //跳转智能柜列表
  Gosmartlist(){
    wx.getSetting({
      success: function (res) {
      if (res.authSetting['scope.userLocation']) {
        console.log("chengg")
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
          },
          fail:function(res){
            wx.showToast({
              title: '请允许微信访问位置服务，以便为您找到附近的智能洗衣柜',
              icon:"none"
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
        }else{
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
            },
            fail: function (res) {
              wx.showToast({
                title: '请允许微信访问位置服务，以便为您找到附近的智能洗衣柜',
                icon: "none"
              })
            }
          })
        }
        }
      }
    })
  },
  //进入品质页面
  Gopinzhi(e){
    if (e.currentTarget.dataset.num==0){
      wx.navigateTo({
        url: '../quality/quality?num=' + e.currentTarget.dataset.num,
      })
    }else if (e.currentTarget.dataset.num == 1) {
      wx.navigateTo({
        url: '../quality/quality?num=' + e.currentTarget.dataset.num,
      })
    }else if (e.currentTarget.dataset.num==2){
      wx.navigateTo({
        url: '../index/weatertype/weatertype?id=' + e.currentTarget.dataset.id + '&name=' + e.currentTarget.dataset.name + '&index=' + e.currentTarget.dataset.index
      })
    } else if (e.currentTarget.dataset.num == 3) {
      this.Gosmartlist() 
    }
  },
  formSubmit: function (e) {
    console.log('form发生了submit事件，携带数据为：', e)
    this.setData({
      formId: e.detail.formId
    })
    var data ={
      formId: this.data.formId
    }
    Request.Setheadpic(data, function (res) {
      console.log('re', res)
    })
  }
})