// pages/article/article.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options.id)
    // if (options.id == "associate"){
    //   this.setData({
    //     title: "公众号关联小程序",
    //     content: "xxxxxxx"
    //   })
    // }
    const db = wx.cloud.database({
      env: "tmassistant-5275ad"
    })
    var that = this
    db.collection('articles').doc(options.id).get({
      success: function (res) {
        console.log(res.data.title)
        that.setData({
          title: res.data.title,
          content: res.data.content
        })
      }
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

  }
})