// pages/video/page/page.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    rec_list: [
      {
        "vid": "u0175o3ko9f",
        "title": "官方宣传片：The Toastmasters Experience 头马会议初体验"
      },
      {
        "vid": "z0892eywrcu",
        "title": "马云在2017年阿里巴巴年会上的压轴演讲"
      },
      {
        "vid": "h0863e1om80",
        "title": "泡泡玛特王宁：潮流玩具风靡背后的心理学和设计创新"
      }
    ]    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var random = this.random(0,2)
    console.log("Randomm mmmmmmmmmmmmmmmmm")
    console.log(random)
    console.log(this.data.rec_list.slice(random, random+1))
    wx.setNavigationBarTitle({
      title: options.title
    })
    this.setData({
      vid: options.vid,
      title: options.title,
      rec_list: this.data.rec_list.slice(random, random+1)
    })
  },

  random: function(min, max){
    return Math.round(Math.random() * (max - min)) + min;
  },

  ToVideoPage: function (options) {
    console.log(options)
    console.log(options.currentTarget.dataset.vid)
    console.log(options.currentTarget.dataset.title)
    var that = this
    wx.navigateTo({
      url: '/pages/video/page/page?vid=' + options.currentTarget.dataset.vid + '&title=' + options.currentTarget.dataset.title,
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
    var that = this
    return {
      title: that.data.title
    }
  },

  onShareTimeline: function () {
    var that = this
    return {
      title: that.data.title
    }
  }
})