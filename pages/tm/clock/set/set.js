
const app = getApp()

const db = wx.cloud.database({
  env: "tmassistant-5275ad"
})

Page({
  data: {},

  timeHandler: function (options) {

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

    wx.navigateTo({
      url: '/pages/tm/clock/countdown/countdown?time=' + options.detail.target.id,
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })


  },

  countdown: function (e) {
    console.log(e.currentTarget.id)
    wx.navigateTo({
      url: '/pages/tm/clock/countdown/countdown?time=' + e.currentTarget.id,
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },

  toMiniProgram: function (e) {
    console.log("toMiniProgram")
    wx.navigateToMiniProgram({
      appId: 'wx09a49d05a365a4e6',
      path: "pages/contact/contact",
      // envVersion: 'trial',
      success(res) {
        console.log("SUCCESS")
      }
    })
  },

  onShareAppMessage: function () {
  }
})


