// pages/contact/contact.js

const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    motto: '联系作者',
    contact: app.contact,
    surprise: false,
    videoAd: null,
    myQR: "https://746d-tmassistant-5275ad-1258071577.tcb.qcloud.la/images/personalQRCode.jpg?sign=54210271e197d447b5e43f550b5dfaf9&t=1542812333",
    weFrameQR:"https://746d-tmassistant-5275ad-1258071577.tcb.qcloud.la/images/weframe1.png?sign=5735f5a745a73439e1fa34028ff9b93f&t=1542894419"
  },

  imgPre: function (e) {
    var current = e.currentTarget.dataset.src
    wx.previewImage({
      current: current, // 当前显示图片的http链接  
      urls: [current], // 需要预览的图片http链接列表
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    if (wx.createRewardedVideoAd){
      this.data.videoAd = wx.createRewardedVideoAd({
        adUnitId: 'adunit-83fb3cf4237d8f94'
      })
    }

    this.data.videoAd.onError(status => {
    })

    this.data.videoAd.onClose((status) => {
      if(status && status.isEnded || status === undefined){
        //正常播放结束，下发奖励
        this.setData({
          surprise: true
        })
        // wx.navigateTo({
        //   url: '/pages/audio/audio',
        //   complete: function(e) {
        //     console.log(e)
        //   }
        // })
      }
      else{
        //播放中途退出，不下发奖励
      }
    })
  },

  openAd: function () {
    if (this.data.videoAd) {
      this.data.videoAd.show()
        .catch(
          err => {
            this.data.videoAd.load()
              .then(() => this.data.videoAd.show())
          }
        )
    }
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
    if (app.globalData.innerAudioContext != null) {
      app.globalData.innerAudioContext.stop()
    }
  },

  navToMap: function(e) {
    wx.navigateTo({
      url: '/pages/tm/loc/loc'
      //url: '/pages/toastmasters/toastmasters'
    })
  },

  copyText: function(e) {
    wx.setClipboardData({
      data: e.currentTarget.dataset.text,
      success: function(res){
        wx.showToast({
          title: "内容已复制"
        })
      }
    })
  },

  naviTo: function (e) {
    // 头马助手AppId: wx16c76d4762cbe0b3
    wx.navigateToMiniProgram({
      appId: 'wx4c4b54bc609bd79e',
      success(res) {
        // 打开成功
        console.log("跳转成功")
      }
    })
  },

  dashang: function(e) {
    wx.navigateToMiniProgram({
      appId: 'wx18a2ac992306a5a4',
      path: 'pages/apps/largess/detail?id=LYFYxTFDv9E%3D'
    })
  },

  saveOfficialQRCode: function (e) {
    wx.showModal({
      content: '关注"头马演讲助手"官方公众号, 回复"交流"获取作者联系方式',
      showCancel: false,
      confirmText: '去关注',
      confirmColor: '#ff7f50',
      success: function (res) {
        if (res.confirm) {
          wx.setClipboardData({
            data: "头马演讲助手",
            success: function (res) {
              wx.showToast({
                title: "名称已复制"
              })
            }
          })
          console.log('用户点击确定');
        }
      }
    })
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
  
  }
})