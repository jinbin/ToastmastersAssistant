// pages/reading/reading.js

const app = getApp()
var util = require('../../utils/util.js');
const db = wx.cloud.database({
  env: "tmassistant-5275ad"
})

Page({

  /**
   * 页面的初始数据
   */
  data: {
    isChecking: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this
    console.log(options.type)
    this.setData({
      type: options.type
    })

    wx.showLoading({
      title: '精彩马上呈现',
    })

    db.collection("information").doc("config").get({
      success: function(res){
        console.log(res.data["reading"])
        that.setData({
          currentId: res.data["default"],
          types: res.data["reading"],
          isChecking: res.data["isChecking"]
        })

        if(that.data.isChecking){
          that.setData({
            currentId: "speaking"
          })
        }

        var select_type = ""
        if(that.data.currentId != "all"){
          select_type = that.data.currentId
        }

        wx.cloud.callFunction({
          name: "getYouLike", 
          data: {
            type: select_type
          },
          success: function(res){
            console.log(res.result)
            that.setData({
              guessYouLike: res.result.data.reverse()
            })
            wx.hideLoading()
          }
        })
      }
    })
    
  },

  changetype: function(options) {
    console.log(options.currentTarget.id)
    this.setData({
      currentId: options.currentTarget.id
    })

    var that = this
    console.log(that.data.currentId)

    var type = undefined
    if (that.data.currentId != "all") {
      type = that.data.currentId
    }

    console.log(type)

    wx.cloud.callFunction({
      name: "getYouLike",
      data: {
        type: type
      },
      success: function (res) {
        console.log(res.result)
        that.setData({
          // guessYouLike: e.data.reverse()
          guessYouLike: res.result.data.reverse()
        })
        wx.hideLoading()
      }
    })
  },

  saveOfficialQRCode: function() {
    util.saveOfficialQRCode()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function(res) {
    console.log(this.data.type)
    return {
      title: '大家都在看的精彩文章~'
    }
  },

  onShareTimeline: function (res) {
    return {
      title: '在头马小程序里，大家都在看的精彩文章~',
      // imageUrl: '/images/homepage-min.png'
    }
  }
})