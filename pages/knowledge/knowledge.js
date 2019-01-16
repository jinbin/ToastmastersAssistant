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
    var article
    if (options.detail.target.id == "timertool"){
      wx.navigateTo({
        url: '/pages/tm/clock/set/set',
        success: function(res) {},
        fail: function(res) {},
        complete: function(res) {},
      })
    } else if(options.detail.target.id == "matrix"){
      wx.navigateTo({
        url: '/pages/knowledge/matrix/matrix',
      })
    } else if (options.detail.target.id == "know"){
      wx.navigateTo({
        url: '/pages/contact/contact',
      })
    } else {
      if (options.detail.target.id == 1) {
        url = "https://746d-tmassistant-5275ad-1258071577.tcb.qcloud.la/tmcResources/role/ahcounter.pdf"
        article = "ahcounter"
      } else if (options.detail.target.id == 2){
        url = "https://746d-tmassistant-5275ad-1258071577.tcb.qcloud.la/tmcResources/role/timer.pdf"
        article = "timer"
      }else if (options.detail.target.id == 3) {
        url = "https://746d-tmassistant-5275ad-1258071577.tcb.qcloud.la/tmcResources/role/grammarian.pdf"
        article = "grammarian"
      } else if(options.detail.target.id == 4){
        url = "https://746d-tmassistant-5275ad-1258071577.tcb.qcloud.la/tmcResources/role/tm.pdf"
        article = "tm"
      } else if (options.detail.target.id == 5){
        url = "https://746d-tmassistant-5275ad-1258071577.tcb.qcloud.la/tmcResources/role/ge.pdf"
        article = "ge"
      } else if (options.detail.target.id == 6){
        url = "https://746d-tmassistant-5275ad-1258071577.tcb.qcloud.la/tmcResources/role/tth.pdf"
        article = "ttm"
      } else if (options.detail.target.id == 7) {
        url = "https://746d-tmassistant-5275ad-1258071577.tcb.qcloud.la/tmcResources/role/pe.pdf"
        article = "ie"
      } else if (options.detail.target.id == 8) {
        url = "https://746d-tmassistant-5275ad-1258071577.tcb.qcloud.la/tmcResources/role/tte.pdf"
        article = "tte"
      } else if (options.detail.target.id == 9) {
        article = "SAA"
      }else if (options.detail.target.id == "official") {
        url = "https://746d-tmassistant-5275ad-1258071577.tcb.qcloud.la/tmcResources/role/official.pdf"
      } else if (options.detail.target.id == "matrix") {
        url = "https://746d-tmassistant-5275ad-1258071577.tcb.qcloud.la/tmcResources/Pathways-Path-and-Project-Matrix_ENCS-chi.pdf"
      } else if (options.detail.target.id == "pws") {
        url = "https://746d-tmassistant-5275ad-1258071577.tcb.qcloud.la/tmcResources/作为Basecamp经理如何导出俱乐部PWS数据.pdf"
      } else if (options.detail.target.id == "tmRes") {
        url = "https://mp.weixin.qq.com/s/hIiqx6EDHBNWEBIcEdcCJw"
      }
      var naviTo 
      if(article) {
        naviTo = '/pages/webview/webview?article=' + article
      }else {
        naviTo = '/pages/pathways/document/document?url=' + url
      }

      wx.navigateTo({
          url: naviTo,
          success: function (res) { },
          fail: function (res) { },
          complete: function (res) { },
      })
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
      title: '头马知识库 | 一站式了解头马所有会议角色',
      imageUrl: '/images/roles.png'
    }
  }
})