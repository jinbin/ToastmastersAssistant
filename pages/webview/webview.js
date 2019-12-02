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
      if (reg.test(this.data.content[i])){
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
      content: '微信搜索"头马演讲助手", 获取更多头马信息！',
      showCancel: false,
      confirmText: '去关注',
      confirmColor: '#ff7f50',
      success: function (res) {
        if (res.confirm) {
          wx.setClipboardData({
            data: "头马演讲助手",
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
    var title
    var imageUrl 
    var dict = { 
      "toumazhushou": ["数万中国头马会员都需要的\"头马助手\"，到底是怎么诞生的？","/images/whytm.jpg"],
      "timer": ["头马知识库 | 时间官", '/images/roles.png'],
      "ahcounter": ["头马知识库 | 哼哈官", '/images/roles.png'],
      "grammarian": ["头马知识库 | 语法官", '/images/roles.png'],
      "tm": ["头马知识库 | 主持人", '/images/roles.png'],
      "ttm": ["头马知识库 | 即兴主持", '/images/roles.png'],
      "ie": ["头马知识库 | 个人评估", '/images/roles.png'],
      "ge": ["头马知识库 | 总评", '/images/roles.png'],
      "tte": ["头马知识库 | 即兴评估", '/images/roles.png'],
      "SAA": ["头马知识库 | 接待官", '/images/roles.png']
    }

    return {
      title: dict[this.data.article][0],
      imageUrl: dict[this.data.article][1]
    }
  }
})
