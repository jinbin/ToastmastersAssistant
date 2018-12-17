// pages/knowledge/knowledge.js
const app = getApp()

const db = wx.cloud.database({
  env: "tmassistant-5275ad"
})

Page({
  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  levelHandler: function (options) {
    console.log(options.detail.target.id)
    console.log(options.detail.formId)

    var timestamp = Date.parse(new Date()) / 1000
    var newtimestamp = timestamp + 24 * 60 * 60 * 7
    var n7_to = newtimestamp * 1000

    db.collection("formIds").add({
      data: {
        openid: this.data.openid,
        formId: options.detail.formId,
        expire: new Date(n7_to),
        available: true
      }
    })

    var url 
    if (options.detail.target.id == 1) {
      url = "https://746d-tmassistant-5275ad-1258071577.tcb.qcloud.la/tmcResources/role/哼哈官.pdf"
    } else if (options.detail.target.id == 2){
      url = "https://746d-tmassistant-5275ad-1258071577.tcb.qcloud.la/tmcResources/role/时间官.pdf"
    }else if (options.detail.target.id == 3) {
    url = "https://746d-tmassistant-5275ad-1258071577.tcb.qcloud.la/tmcResources/role/语法官.pdf"
    } else if(options.detail.target.id == 4){
      url = "https://746d-tmassistant-5275ad-1258071577.tcb.qcloud.la/tmcResources/role/主持人.pdf"
    } else if (options.detail.target.id == 5){
      url = "https://746d-tmassistant-5275ad-1258071577.tcb.qcloud.la/tmcResources/role/总评.pdf"
    } else if (options.detail.target.id == 6){
      url = "https://746d-tmassistant-5275ad-1258071577.tcb.qcloud.la/tmcResources/role/即兴演讲主持人.pdf"
    } else if (options.detail.target.id == 7) {
      url = "https://746d-tmassistant-5275ad-1258071577.tcb.qcloud.la/tmcResources/role/个人评估.pdf"
    } else if (options.detail.target.id == 8) {
      url = "https://746d-tmassistant-5275ad-1258071577.tcb.qcloud.la/tmcResources/role/即兴演讲评估.pdf"
    } else if (options.detail.target.id == "official") {
      url = "https://746d-tmassistant-5275ad-1258071577.tcb.qcloud.la/tmcResources/role/头马官员介绍.pdf"
    }

    wx.navigateTo({
      url: '/pages/pathways/document/document?url=' + url,
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
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
  onShareAppMessage: function () {
    return {
      title: "头马助手 | 知识库"
    }
  }
})