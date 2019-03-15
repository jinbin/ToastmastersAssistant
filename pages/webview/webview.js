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
