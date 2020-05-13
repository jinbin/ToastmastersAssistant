// pages/tm/jixing/jixing.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    champs: [
      {
        key: "1",
        url: "https://mp.weixin.qq.com/s/DAOjgsID2L8YCnRhNGnAbA"
      },
      {
        key: "2",
        url: "https://mp.weixin.qq.com/s/DszeVTHRLUIpaR_fuifQBQ"
      },
      {
        key: "3",
        url: "https://mp.weixin.qq.com/s/hy4VltLD_atgD4wAfPmQIg"
      },
      {
        key: "4",
        url: "https://mp.weixin.qq.com/s/Up64ZgPIrLoGuHZ7tNwsBQ"
      },
      {
        key: "5",
        url: "https://mp.weixin.qq.com/s/jN50eKmnLnNOrRxPdjgK8w"
      },
      {
        key: "6",
        url: "https://mp.weixin.qq.com/s/mbNfl8ps6DA-kAv8jL4FWA"
      },
      {
        key: "7",
        url: "https://mp.weixin.qq.com/s/0Ln11jGjykhzAR1QcvWEKg"
      },
      {
        key: "8",
        url: "https://mp.weixin.qq.com/s/40VJc3x8SvCUplpGBULpsA"
      },
      {
        key: "9",
        url: "https://mp.weixin.qq.com/s/MGY0Q4_eX4OghKssITmd0A"
      },
      {
        key: "10",
        url: "https://mp.weixin.qq.com/s/h8OOlmnt8WJWiTrgaTxWcA"
      },
      {
        key: "11",
        url: "https://mp.weixin.qq.com/s/ZEXQ0TL6iHrJ5O7pFEEOoQ"
      }
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  do_champ: function (options) {
    console.log(options.currentTarget.dataset.id)
    console.log(this.data.champs[options.currentTarget.dataset.id])
    wx.navigateTo({
      url: '/pages/testdb/testdb?src=' + this.data.champs[options.currentTarget.dataset.id]["url"],
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
    return {
      title: '头马即兴演讲冠军全集，赶紧收藏！',
      imageUrl: '/images/champ-min.png'
    }
  }
})