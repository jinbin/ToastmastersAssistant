// pages/merger/merger.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    texts: ["头马世界冠军教你四招搞定公众演讲", "必学！头马演讲达人给你的五条演讲建议"],
    page_ft: {
      data: "Copyright © 2018-2019 jinbin"
    }
  },

  getPathways: function(options) {
    console.log(options)

    wx.navigateTo({
      url: '/pages/pathways/desc/desc?level=' + options.currentTarget.id,
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },

  getRoles: function(options) {
    console.log(options) 

    var naviTo = '/pages/webview/webview?article=' + options.currentTarget.id

    wx.navigateTo({
      url: naviTo,
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },

  getTool: function(options) {
    console.log(options)

    if (options.currentTarget.id == "timertool") {
      wx.navigateTo({
        url: '/pages/tm/clock/set/set',
        success: function (res) { },
        fail: function (res) { },
        complete: function (res) { },
      })
    } else if (options.currentTarget.id == "matrix") {
      wx.navigateTo({
        url: '/pages/knowledge/matrix/matrix',
      })
    } else if (options.currentTarget.id == "jixing") {
      wx.navigateToMiniProgram({
        appId: 'wx4c4b54bc609bd79e',
      })
    } else if (options.currentTarget.id == "contact") {
      wx.navigateTo({
        url: '/pages/contact/contact',
      })
    }
  },

  getArticle: function(options) {
    console.log(options)

    if(options.currentTarget.id == "toumazhushou"){
      wx.navigateTo({
        url: '/pages/webview/webview?article=toumazhushou',
      })
    }
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

  }
})