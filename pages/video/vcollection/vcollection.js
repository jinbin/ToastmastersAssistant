// pages/video/vcollection/vcollection.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // types: [
    //   {
    //     "text": "头马冠军"
    //   }
    // ],
    videos: [
      {
        "vid": "u0175o3ko9f",
        "title": "官方宣传片：The Toastmasters Experience 头马会议初体验"
      },
      {
        "vid": "z0892eywrcu",
        "title": "马云在2017年阿里巴巴年会上的压轴演讲"
      },
      {
        "vid": "z0892eywrcu",
        "title": "压轴演讲"
      },
      {
        "vid": "z0892eywrcu",
        "title": "马云在2017年阿里巴巴年会上的压轴演讲"
      },
      {
        "vid": "z0892eywrcu",
        "title": "马云在2017年阿里巴巴年会上的压轴演讲"
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    wx.cloud.callFunction({
      name: "getVideos",
      data: {
        db: "videos"
      },
      success: function (res) {
        console.log(res.result)
        that.setData({
          // guessYouLike: e.data.reverse()
          videos: res.result.data
        })
      }
    })
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
  onShareAppMessage: function (res) {
    if(res.from == "button"){
      console.log(res)
      return {
        title: res.target.dataset.title,
        path: '/pages/video/page/page?vid=' + res.target.dataset.vid + '&title=' + res.target.dataset.title
      }
    }else{
      return {
        title: '演讲视频'
      }
    }
  }
})