// pages/contact/contact.js

const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    motto: '联系作者',
    contact: app.contact,
  },

  imgPre: function (e) {
    var current = e.currentTarget.dataset.src
    wx.previewImage({
      current: current, // 当前显示图片的http链接  
      urls: ["https://mmbiz.qpic.cn/mmbiz_png/YoMN6iaCZsaGKqFU9uTCOn2ut3Q0IobzJ4nyiaW8KDibgSU18AOY0u6srSDPB3EGR7LLwhVsQLdNTHXIym6xCiboSA/0?wx_fmt=png"], // 需要预览的图片http链接列表
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