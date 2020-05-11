// pages/knowledge/knowledge.js

// import util from '../../utils/util.js'

Page({
  /**
   * 页面的初始数据
   */
  data: {
    is_English: true,
    language: "英文"
  },

  switchChange: function() {
    if (this.data.is_English) {
      this.setData({
        is_English: false,
        language: "中文"
      })
    } else {
      this.setData({
        is_English: true,
        language: "英文"
      })
    }

    var that = this
    var lang = "cn"

    if(this.data.is_English){
      lang = "en"
    }

    wx.cloud.callFunction({
      name: "getTopics",
      data: {
        lang: lang
      },
      success: res => {
        that.setData({
          topics: res.result.data.reverse(),
        })
      }
    })
  },

  saveOfficialQRCode: function() {
    util.saveOfficialQRCode()
  },

  navigateTo: function (options) {
    wx.navigateTo({
      url: options.currentTarget.id
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      banner_height: 240 / wx.getSystemInfoSync().windowHeight * 100
    })

    var that = this

    var lang = "cn"
    if (this.data.is_English){
      lang = "en"
    }

    wx.cloud.callFunction({
      name: "getTopics",
      data: {
        lang: lang
      },
      success: res => {
        that.setData({
          topics: res.result.data.reverse(),
        })
      }
    })
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
  onShareAppMessage: function() {
    return {
      title: "我发现了一个即兴演讲的宝库，推荐你也看看"
    }
  }
})