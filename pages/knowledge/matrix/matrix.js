// pages/knowledge/matrix/matrix.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    page_ft: {
      data: "返回知识库"
    }
  },

  levelHandler: function (options) {
    var url 
    if (options.detail.target.id == "matrix") {
      // url = "https://746d-tmassistant-5275ad-1258071577.tcb.qcloud.la/tmcResources/Pathways-Path-and-Project-Matrix_ENCS-chi.pdf"
      url = "https://746d-tmassistant-5275ad-1258071577.tcb.qcloud.la/tmcResources/Pathways_Path_and_Project_Matrix_ENCS%20jan.pdf"
    } else if (options.detail.target.id == "matrixEn") {
      url = "https://746d-tmassistant-5275ad-1258071577.tcb.qcloud.la/tmcResources/PathwaysMatrixEN.pdf" 
    }

    wx.navigateTo({
      url: '/pages/pathways/document/document?url=' + url,
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },

  fromPageFt: function(e) {
    wx.switchTab({
      url: '/pages/merger/merger',
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
    return {
      title: "头马助手 | 获取最新的Pathways Matrix PDF版本!"
    }
  }
})