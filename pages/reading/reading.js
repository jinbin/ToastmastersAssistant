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
    isChecking: false,
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
        "icon": "xingfu.png"
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
        "text": "即兴冠军",
        "id": "jixing",
        "icon": "jushou.png"
      },
      {
        "text": "马云",
        "id": "jackma",
        "icon": "mayun-min.png"
      }
      // {
      //   "text": "冠军们",
      //   "id": "champ",
      //   "icon": "guanjun.png"
      // }
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

    // db.collection("guessYouLike").where({
    //   type: options.type
    // }).get({
    //   success: function(e) {
    //     console.log(e)
    //     that.setData({
    //       // guessYouLike: e.data.reverse()
    //       guessYouLike: e.data
    //     })
    //     wx.hideLoading()
    //   }
    // })

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
              // guessYouLike: e.data.reverse()
              guessYouLike: res.result.data.reverse()
            })
            wx.hideLoading()
          }
        })
      }
    })

    console.log("云函数")



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