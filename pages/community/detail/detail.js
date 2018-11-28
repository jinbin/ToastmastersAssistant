// pages/community/detail/detail.js

var app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    open_posts: app.globalData.open_posts,
    activity_posts: app.globalData.activity_posts,
    private_posts: app.globalData.private_posts
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (app.globalData.open_posts.length == 0){
      wx.showLoading({
        title: '精彩马上呈现',
      })

      var that = this
      wx.cloud.callFunction({
        name: 'getPostsNew',
        success: result => {
          var open_posts = []
          var activity_posts = []
          var private_posts = []
          var openid = result.result.openid
          var res = result.result
          for (var index in res.result.data) {

            res.result.data[index]["create_time"] = new Date(res.result.data[index]["create_time"]).toLocaleDateString() + new Date(res.result.data[index]["create_time"]).toLocaleTimeString()

            if (res.result.data[index].isOpen == "open") {
              open_posts.push(res.result.data[index])
            }

            if (res.result.data[index].isOpen == "activity") {
              activity_posts.push(res.result.data[index])
            }

            console.log(res.result)
            console.log(res.result.data[index])

            if (res.result.data[index].isOpen == "private" && res.result.data[index]._openid == openid) {
              private_posts.push(res.result.data[index])
            }

          }

          app.globalData.open_posts = open_posts
          app.globalData.activity_posts = activity_posts,
          app.globalData.private_posts = private_posts

          that.setData({
            id: options.id,
            type: options.type
          })

          var data
          if (options.type == "open") {
            data = app.globalData.open_posts
          } else if (options.type == "activity") {
            data = app.globalData.activity_posts
          }
          for (var index in data) {
            if (data[index]._id == options.id) {
              console.log(data[index])
              this.setData({
                detail: data[index],
              })
            }
          }

          wx.hideLoading()

        }
      })
    }else{
      var data
      if (options.type == "open") {
        data = app.globalData.open_posts
      } else if (options.type == "activity") {
        data = app.globalData.activity_posts
      }
      for (var index in data) {
        if (data[index]._id == options.id) {
          console.log(data[index])
          this.setData({
            detail: data[index],
          })
        }
      }
    }
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
    return {
      path: "/pages/community/detail/detail?id=" + this.data.id + "&type=" + this.data.type,
      title: app.globalData.userInfo.nickName + "给你分享的头马新鲜事",
      imageUrl: this.data.detail.imageUrl
    }
  }
})