// pages/pathways/levels/levels.js

const app = getApp()

const db = wx.cloud.database({
  env: "tmassistant-5275ad"
})

Page({
  data: {
    page_ft:{
      data: ""
    }
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

    if (options.detail.target.id == "intro") {
      wx.switchTab({
        url: '/pages/volItem/volItem',
        success: function (res) { },
        fail: function (res) { },
        complete: function (res) { },
      })
    } else if (options.detail.target.id == "contact") {
      wx.navigateTo({
        url: '/pages/contact/contact',
        success: function (res) { },
        fail: function (res) { },
        complete: function (res) { },
      })
    } else if (options.detail.target.id == "matrix") {
      wx.navigateTo({
        url: '/pages/knowledge/matrix/matrix',
      })
    } else if (options.detail.target.id != 7) {
      wx.navigateTo({
        url: '/pages/pathways/desc/desc?level=' + options.detail.target.id,
        success: function (res) { },
        fail: function (res) { },
        complete: function (res) { },
      })
    }  
  },

  // toMiniProgram: function (e) {
  //   console.log("toMiniProgram")
  //   wx.navigateToMiniProgram({
  //     appId: 'wx09a49d05a365a4e6',
  //     path: "pages/contact/contact",
  //     // envVersion: 'trial',
  //     success(res) {
  //       console.log("SUCCESS")
  //     }
  //   })
  // },

  fromPageFt: function (e) {
    wx.navigateTo({
      url: '/pages/contact/contact',
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },

  onShareAppMessage: function () {
    return {
      title: 'Pathways手册: 一站获取全部59个项目的说明和评估资料'
    }
  }
})
