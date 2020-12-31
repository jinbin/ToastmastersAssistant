// pages/webview/webview.js  

const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgIndex: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var data = app.articles[options.article]
    this.setData({
      article : options.article
    })
    // var data = require("../../data/articles/" + options.article)
    
    this.setData({
      content: data
    })
    console.log(data)
    var imgIndex = []
    for (var i = 0; i < this.data.content.length; i++){
      console.log(this.data.content[i])
      var reg = /^http/
      var reg1 = /^cloud/
      if (reg.test(this.data.content[i]) || reg1.test(this.data.content[i])){
        console.log("true")
        imgIndex[i] = true
      }else{
        console.log("false")
        imgIndex[i] = false
      }
    }
    this.setData({
      imgIndex: imgIndex
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  previewImage: function () {
    wx.previewImage({
      current: '', // 当前显示图片的http链接
      urls: ['cloud://tmassistant-5275ad.746d-tmassistant-5275ad/images/头马助手公众号Logo.jpg'] // 需要预览的图片http链接列表
    })
  },

  saveOfficialQRCode: function (e) {
    wx.showModal({
      content: '微信搜索"公众演讲助手", 获取更多头马信息！',
      showCancel: false,
      confirmText: '去关注',
      confirmColor: '#ff7f50',
      success: function (res) {
        if (res.confirm) {
          wx.setClipboardData({
            data: "公众演讲助手",
            success: function (res) {
              wx.showToast({
                title: "公众号名已复制"
              })
            }
          })
          console.log('用户点击确定');
        }
      }
    })
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
  onShareAppMessage: function () {
    var dict = { 
      "toumazhushou": ["数万中国头马会员都需要的\"头马助手\"，到底是怎么诞生的？"],
      "timer": ["头马知识库 | 时间官"],
      "ahcounter": ["头马知识库 | 哼哈官"],
      "grammarian": ["头马知识库 | 语法官"],
      "tm": ["头马知识库 | 主持人"],
      "ttm": ["头马知识库 | 即兴主持",],
      "ie": ["头马知识库 | 个人评估"],
      "ge": ["头马知识库 | 总评"],
      "tte": ["头马知识库 | 即兴评估"],
      "SAA": ["头马知识库 | 接待官"],
      "DTM": ["头马知识库 | DTM介绍"],
      "membership": ["头马演讲助手小程序：会员体系介绍"]
    }

    if(dict[this.data.article]){
      return {
        title: dict[this.data.article][0]
      }
    }
  }
})
