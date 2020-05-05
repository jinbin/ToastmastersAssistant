// pages/tm/acronym/acronym.js
var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    explains: app.acronym,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(this.data.explains)
  },

  explain: function (options) {
    var that = this
    var content1 = that.data.explains[options.currentTarget.dataset.id][0]
    var content2 = that.data.explains[options.currentTarget.dataset.id][1]
    var content = ""
    if (content1 != undefined){
      content = content + content1
    }
    if (content2 != undefined){
      content = content + content2
    }
    wx.showModal({
      title: options.currentTarget.dataset.id + "说明",
      content: content,
      showCancel: false,
      confirmText: '我明白了',
      confirmColor: '#ff7f50',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
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
      title: '头马缩略词大全'
    }
  }
})