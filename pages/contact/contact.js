// pages/contact/contact.js

const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    motto: '联系作者',
    contact: app.contact,
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