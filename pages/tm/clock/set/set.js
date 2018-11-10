
const app = getApp()

Page({
  data: {},

  countdown: function (e) {
    console.log(e.currentTarget.id)
    wx.navigateTo({
      url: '/pages/tm/clock/countdown/countdown?time=' + e.currentTarget.id,
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  }
})


