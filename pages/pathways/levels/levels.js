// pages/pathways/levels/levels.js

const app = getApp()

const db = wx.cloud.database({
  env: "tmassistant-5275ad"
})

Page({
  data: {
  },

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

    if (options.detail.target.id != 7) {
      wx.navigateTo({
        url: '/pages/pathways/desc/desc?level=' + options.detail.target.id,
        success: function (res) { },
        fail: function (res) { },
        complete: function (res) { },
      })
    } else if (options.detail.target.id == 7) {
      wx.navigateTo({
        url: '/pages/pathways/article/article?level=' + options.detail.target.id,
        success: function (res) { },
        fail: function (res) { },
        complete: function (res) { },
      })
    }
  },

  onShareAppMessage: function () {
    return {
    }
  }
})
