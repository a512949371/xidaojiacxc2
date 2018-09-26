// pages/my/myinfo/myinfo.js
import Request from '../../../datajson/request.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userData:{
      phone:'',
      accountId:'',
      name:'',
      province:'云南省',
      city:'昆明市',
      county:'官渡区',
      address:'',
      nickName:wx.getStorageSync("nick"),
      headImg: wx.getStorageSync("headpic"),
    },
    region: [],
    customItem: '全部',
    errname:false,
    pickertf:true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    Request.Getuserinfo(function (res) {
      console.log("userinfo", res)
      if (res.data.isOK){
        if (res.data.data != null){
          that.setData({
            'userData.phone': res.data.data.phone || '',
            'userData.accountId': res.data.data.accountId || '',
            'userData.name': res.data.data.name || '',
            'region[0]': res.data.data.province || '云南省',
            'region[1]': res.data.data.city || '昆明市',
            'region[2]': res.data.data.county || '官渡区',
            'userData.address': res.data.data.address || '',
          })
          if (that.data.userData.name != '' || that.data.userData.name!=null){
            that.setData({
              errname:true
            })
          }
        } else {
        wx.redirectTo({
          url: '../../login/login',
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
  bindRegionChange: function (e) {
    console.log(e.detail.value[0])
    this.setData({
      region: e.detail.value,
      'userData.province': e.detail.value[0],
      'userData.city': e.detail.value[1],
      'userData.county': e.detail.value[2],
    })
  },
  //输入事件
  Input(e){
    if(e.currentTarget.dataset.num==1){
      var regzn = /^[\u4e00-\u9fa5]+$/;
      var regnum = /^[-+]?\d*$/;
      var reg = /^[a-zA-Z]+$/;
      if (regzn.test(e.detail.value) && e.detail.value.length>=2){
        this.setData({
          errname:true
        })
      }else if (reg.test(e.detail.value) && e.detail.value.length>=4) {
        this.setData({
          errname: true
        })
      }else{
        this.setData({
          errname: false
        })
      }
        this.setData({
          'userData.name': e.detail.value
        })

    }else{
      this.setData({
        'userData.address': e.detail.value
      })
    }
  },
  //保存用户信息
  Saveinfo(){
    if(this.data.errname){
      if (this.data.userData.address!=''){
      Request.Setuserinfo(this.data.userData,function(res){
        console.log(res)
        if(res.data.isOK){
          wx.showModal({
            title: '提示',
            showCancel:false,
            content: '用户信息更新成功',
            success: function (res) {
              if (res.confirm) {
                wx.switchTab({
                  url: '../my',
                })
              }
            }
          })
        }else{
          wx.showModal({
            title: '提示',
            showCancel: false,
            content:res.data.msg,
            success: function (res) {
              if (res.confirm) {
              }
            }
          })
        }
      })
        console.log(this.data.userData)
      }else{
        wx.showToast({
          title: '详细地址不能为空',
          icon: 'none',
          duration: 2000
        })
      }
    }else{
      wx.showToast({
        title: '姓名格式错误',
        icon: 'none',
        duration: 2000
      })
    }
   }
})