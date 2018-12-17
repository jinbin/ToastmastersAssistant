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
        // url: '/pages/pathways/document/document?url=' + "https://746d-tmassistant-5275ad-1258071577.tcb.qcloud.la/tmcResources/10Paths.pdf?sign=99ac4f23fd0037c58edcf0f718d118a3&t=1544585979",
        url: '/pages/video/pw/pw',
        success: function (res) { },
        fail: function (res) { },
        complete: function (res) { },
      })
    }
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
    return {
      title: 'Pathways手册: 一站获取全部59个项目的说明和评估资料'
    }
  }
})
