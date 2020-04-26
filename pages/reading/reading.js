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
    currentId: "all",
    types: [
      // {
      //   "text": "冠军演讲",
      //   "id": "champ",
      //   "icon": "matrix_DarkCyan.png"
      // },
      {
        "text": "全部",
        "id": "all",
        "icon": "all.png"
      },
      {
        "text": "做演讲",
        "id": "speaking",
        "icon": "speaking.png"
      },
      {
        "text": "领导力",
        "id": "leadership",
        "icon": "leadership.png"
      },
      {
        "text": "TED精选",
        "id": "ted",
        "icon": "幸福.png"
      },
      {
        "text": "大地王子",
        "id": "princeea",
        "icon": "prince.png"
      },
      {
        "text": "杰伊谢蒂",
        "id": "jayshetty",
        "icon": "jay.png"
      },
      {
        "text": "冠军们",
        "id": "champ",
        "icon": "冠军.png"
      }
      // {
      //   "text": "头马中国",
      //   "id": "tmChina",
      //   "icon": "matrix_orange.png"
      // }
    ]
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

    db.collection("audio").where({
      onIndex: true
    }).get({
      success: function(e) {
        console.log(e)
        that.setData({
          todayaudio: e.data
        })
        db.collection("guessYouLike").where({
          type: options.type
        }).get({
          success: function(e) {
            console.log(e)
            that.setData({
              // guessYouLike: e.data.reverse()
              guessYouLike: e.data
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
    if(that.data.currentId != "all"){
      type = that.data.currentId
    }

    console.log(type)
    db.collection("guessYouLike").where({
      type: type
    }).get({
      success: function (e) {
        console.log(e)
        that.setData({
          // guessYouLike: e.data.reverse()
          guessYouLike: e.data
        })
        wx.hideLoading()
      }
    })
  },

  saveOfficialQRCode: function() {
    util.saveOfficialQRCode()
  },

  backtoLib: function() {
    wx.switchTab({
      url: '/pages/toutiao/toutiao',
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
  onShareAppMessage: function(res) {
    console.log(this.data.type)
    return {
      title: '大家都在看的精彩文章~',
      imageUrl: '/images/冠军-min.jpeg'
    }
  }
})