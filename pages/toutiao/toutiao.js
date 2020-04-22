// pages/toutiao/toutiao.js

var util = require('../../utils/util.js');
const db = wx.cloud.database({
  env: "tmassistant-5275ad"
})

Page({

  /**
   * 页面的初始数据
   */
  data: {
    categories: [
      // {
      //   "text": "冠军演讲",
      //   "id": "champ",
      //   "icon": "matrix_DarkCyan.png"
      // },
      {
        "text": "如何演讲",
        "id": "speaking",
        "icon": "matrix_red.png"
      },
      {
        "text": "领导力",
        "id": "leadership",
        "icon": "matrix_purple.png"
      },
      {
        "text": "TED精选",
        "id": "ted",
        "icon": "TED.png",
        "style": "width: 120rpx; height: 40rpx;"
      },
      {
        "text": "大地王子",
        "id": "princeea",
        "icon": "matrix_ForrestGreen.png"
      },
      {
        "text": "Jay Shetty",
        "id": "jayshetty",
        "icon": "matrix_orange.png"
      }, 
      // {
      //   "text": "头马中国",
      //   "id": "tmChina",
      //   "icon": "matrix_orange.png"
      // }
    ]
  },

  onLoad: function (options) {
    // 获取ext_ad_flag
    var that = this
    db.collection("information").where({
      id: "ext_ad"
    }).get({
      success:function(res){
        console.log(res.data[0])
        console.log(res.data[0].ext_ad_show)
        
        that.setData({
          ext_ad_show: res.data[0].ext_ad_show,
          ext_ad_flow_image: res.data[0].ext_ad_flow_image,
          ext_ad_path: res.data[0].ext_ad_path,
          ext_ad_appid: res.data[0].ext_ad_appid
        })
      }
    })
  },

  navigateToMiniProgram: function (options) {
    wx.navigateToMiniProgram({
      appId: options.currentTarget.id,
      path: options.currentTarget.dataset.path
    })
  },

  saveOfficialQRCode: function () {
    util.saveOfficialQRCode()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (res) {
    return {
      title: '邀请你参观演讲图书馆，最全的头马冠军演讲视频全集',
      imageUrl: '/images/图书馆-min.jpeg'
    }
  },

  bindViewTap() {
    var that = this
    wx.navigateToMiniProgram({
      appId: that.data.ext_ad_appid,
      path: that.data.ext_ad_path,
      // extraData:
      // {
      //   foo:
      //     'bar'
      // },
      //envVersion: 'develop',
      success(res) {
        // 打开成功
      }
    })
  },

  adLoad() {
    this.triggerEvent('adload')
  },
  
  adClose: function (event) {
    var that = this;
    that.setData({
      showView: (!that.data.showView)
    })
  }

})