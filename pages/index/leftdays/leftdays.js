// pages/my/officialAccount/offcialAccount.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hasUserInfo: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var time = Date.parse(new Date())
    time = time / 1000

    //var time1 = Date.parse("2019-01-01 00:00")
    var time1
    if (options.duetime){
      time1 = options.duetime
    }else{
      //2019-01-01 00:00
      time1 = 1546272000
    }
     

    var days = (time1 - time)/60/60/24
    days = parseInt(days) + 1

    var title 
    if(options.title){
      title = options.title
    }else{
      title = "2018倒计时"
    }

    var content
    if (options.content) {
      content = options.content
    } else {
      content = "你的2018"
    }
  
    this.setData({
      title: title,
      content: content,
      leftdays: days
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
  onShareAppMessage: function (options) {
    return {
      title: "2018倒计时"
    }
  }
})