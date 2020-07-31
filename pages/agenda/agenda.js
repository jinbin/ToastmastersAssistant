// pages/agenda/agenda.js

const db = wx.cloud.database({
  env: "backup-osmic"
})

Page({

  /**
   * 页面的初始数据
   */
  data: {
    posters: [
      "cloud://backup-osmic.6261-backup-osmic-1258071577/images/poster/poster1.jpeg",
      "cloud://backup-osmic.6261-backup-osmic-1258071577/images/poster/poster2.jpeg",
      "cloud://backup-osmic.6261-backup-osmic-1258071577/images/poster/poster3.jpeg",
      "cloud://backup-osmic.6261-backup-osmic-1258071577/images/poster/poster4.jpeg",
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    db.collection
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