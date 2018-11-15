// pages/pathways/levels/levels.js

const app = getApp()

Page({
  data: {
  },

  onLoad: function (options) {
  },

  toLevel: function (options) {
    if (options.currentTarget.id != 7){
      wx.navigateTo({
        url: '/pages/pathways/desc/desc?level=' + options.currentTarget.id,
        success: function(res) {},
        fail: function(res) {},
        complete: function(res) {},
      })
    } else if (options.currentTarget.id == 7){
      wx.navigateTo({
        url: '/pages/pathways/article/article?level=' + options.currentTarget.id,
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
