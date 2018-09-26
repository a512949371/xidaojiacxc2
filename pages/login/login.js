//index.js
//获取应用实例
const app = getApp()
import Request from '../../datajson/request.js';
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    smsText: "发送",
    sms: '',
    phone: '',
    smsStatus: true,
    time: 60,
    phonetf: false,
    smstf: false,
    clearphone: false,
    agreedtf:false,
    logintf:false,
    gosms:false,
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
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
  Input(e) {
    let num = e.target.dataset.num;
    if (num == 1) {
      this.setData({
        phone: e.detail.value,
        clearphone: true
      })
      if (this.phoneTF()) {
        this.setData({
          phonetf: true,
          gosms:true
        })
      }else{
        this.setData({
          phonetf: false,
          gosms:false
        })
      }
    } else {
      this.setData({
        sms: e.detail.value
      })
      console.log(this.data.phonetf)
      if (this.data.sms.length == 6 && this.data.phonetf) {
        this.setData({
          smstf: true,
        })
        if (this.data.agreedtf){
          this.setData({
            logintf:true
          })
        }
      }else{
        this.setData({
          smstf: true,
          logintf: false
        })
      }
    }
  },
  //发送验证码
  Sms() {
    var that = this;
    if (this.data.smsStatus) {
      if (!this.phoneTF()) {
        wx.showToast({
          title: '手机号不正确，请重新输入',
          icon: 'none',
          duration: 2000
        })
      } else {
        this.setData({
          gosms:false
        })
        this.Stime()
        Request.Sms(this.data.phone,function(res){
          console.log("sms",res)
        })
      }
    }
  },
  //登录
  Registerlogin() {
    console.log(!this.data.phonetf, !this.data.smstf, !this.data.agreedtf, this.data.logintf)
    if (this.data.logintf) {
      var regdata={
        phone: this.data.phone,
        code:this.data.sms,
        type:1
      }
      Request.Register(regdata,function(res){
        console.log("Register",res)
        if (res.data.isOK){
          wx.setStorage({
            key: 'isBindPhone',
            data: 1,
          })
          console.log(decodeURIComponent(app.smartdata.scene).split("&")[0].split("=")[0])
          if (decodeURIComponent(app.smartdata.scene).split("&")[0].split("=")[0] != "no") {
            wx.switchTab({
              url: '../index/index',
            })
          }else{
            wx.navigateTo({
              url: '../befindex/befindex',
            })
          }
            
        }else{
          wx.showToast({
            title: res.data.msg,
            icon: 'none',
            duration: 2000
          })
        }
      })
    }else{
      if (!this.data.phonetf){
        wx.showToast({
          title: '请输入正确的手机号',
          icon: 'none',
          duration: 2000
        })
        return
      }
      if (!this.data.smstf) {
        wx.showToast({
          title: '请输入正确的验证码',
          icon: 'none',
          duration: 2000
        })
        return
      }
      if (!this.data.agreedtf) {
        wx.showToast({
          title: '请同意洗到家服务协议',
          icon: 'none',
          duration: 2000
        })
        return
      }
    }
  },
  // 手机号判断
  phoneTF() {
    if ((/^1[34578]\d{9}$/.test(this.data.phone))) {
      return true
    } else {
      return false
    }
  },
  // 计时器
  Stime() {
    var that = this;
    var ctime = setInterval(function () {
      if (that.data.time > 0) {
        that.data.time--
        that.setData({
          smsText: that.data.time + "s后重发",
          smsStatus:false
        })
      }
      else {
        clearInterval(ctime);
        that.setData({
          time: 60,
          smsText: "获取验证码",
          smsStatus: true,
          gosms: true
        })
      }
    }, 1000)
  },
  //清空手机号
  Clearphone() {
    this.setData({
      phone: '',
      clearphone: false
    })
  },
  //同意协议
  Agreed(){
    this.setData({
      agreedtf: !this.data.agreedtf
    })
    if (this.data.phonetf && this.data.smstf && this.data.agreedtf){
      this.setData({
        logintf:true
      })
    }else{
      this.setData({
        logintf: false
      })
    }
  },
  //进入协议
  Gorule(){
    wx.navigateTo({
      url: './rule/rule',
    })
  }
})
