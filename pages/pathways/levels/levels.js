// pages/pathways/levels/levels.js

const app = getApp()

Page({
  data: {
  },

  onLoad: function (options) {
  },

  toLevel: function (options) {
    wx.navigateTo({
      url: '/pages/pathways/desc/desc?level=' + options.currentTarget.id,
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },

  onShareAppMessage: function () {
    return {
    }
  }
})
