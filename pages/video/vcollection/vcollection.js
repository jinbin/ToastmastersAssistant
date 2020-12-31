// pages/video/vcollection/vcollection.js
const db = wx.cloud.database({
  env: "tmassistant-5275ad"
})

Page({
  /**
   * 页面的初始数据
   */
  data: {
    hasMoreData: true,
    pageNum: 0,
    pageSize: 5
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    // wx.cloud.callFunction({
    //   name: "getVideos",
    //   data: {
    //     db: "videos"
    //   },
    //   success: function (res) {
    //     console.log(res.result)
    //     that.setData({
    //       // guessYouLike: e.data.reverse()
    //       videos: res.result.data
    //     })
    //   }
    // })
    db.collection("videos").orderBy("title", "desc")
      .skip(that.data.pageNum * that.data.pageSize)
      .limit(that.data.pageSize)
      .get({
        success(res) {
          that.setData({
            videos: res.data
          })
        }
      })
  },

  ToVideoPage: function (options) {
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
  onPullDownRefresh: function () {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    var that = this
    // 还有数据可以加载
    if (this.data.hasMoreData) {
      that.setData({
        pageNum: that.data.pageNum + 1
      })
      db.collection("videos").orderBy("order", "desc")
        .skip(that.data.pageNum * that.data.pageSize)
        .limit(that.data.pageSize)
        .get({
          success(res) {
            var list = []
            if (res.data.length != 0) {
              // 还有未加载的数据
              console.log("还有未加载的数据")
              list = that.data.videos.concat(res.data)
              that.setData({
                videos: list,
                hasMoreData: true
              })
            } else {
              // 所有数据已经加载完
              console.log("所有数据已经加载完")
              list = that.data.videos.concat(res.data)
              that.setData({
                videos: list,
                hasMoreData: false
              })
            }
          }
        })
      // end
    } else {
      wx.showToast({
        title: '没有更多数据',
      })
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (res) {
    if (res.from == "button") {
      return {
        title: res.target.dataset.title,
        path: '/pages/video/page/page?vid=' + res.target.dataset.vid + '&title=' + res.target.dataset.title
      }
    } else {
      return {
        title: '演讲视频'
      }
    }
  }
})