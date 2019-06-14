// pages/canvas/canvas.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tmpPath: "",
    motto: 'Hello World',
    hidden: true,
    userInfo: {},
    hasUserInfo: false,
    windowWidth: '',
    posterHeight: '',
    canvasWidth: 300
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  },

  drawImage: function(){
    var that = this
    // 拿到canvas context
    let ctx = wx.createCanvasContext('share_canvas')
    let path = 'https://img.diyijuzi.com/diyijuzi/uploads/allimg/160208/2_160208162410_1.jpg'

    wx.getImageInfo({
      sec: path,
      success: function (res) {

        let maxWidth = Math.min(res.width, that.data.canvasWidth * 0.65);
        let radio = maxWidth / res.width;
        let offsetY = (that.data.canvasHeight - res.height * radio) / 2;

        // 绘制图片，path是本地路径，不可以传网络url，如果是网络图片需要先下载
        ctx.drawImage("/images/TMLogo.jpeg", 10, offsetY, res.width * radio, res.height * radio)
      }
    })
  },

  saveImageToPhotosAlbum(){
    var that = this 

    wx.previewImage({
      current: that.data.tmpPath, // 当前显示图片的http链接
      urls: [that.data.tmpPath] // 需要预览的图片http链接列表
    })

    // wx.saveImageToPhotosAlbum({
    //   filePath: "images/qrcode.jpg",
    //   success: function (res) {
    //     console.log("save success!")

    //     wx.showModal({
    //       content: '图片已保存到相册，赶紧晒一下吧~',
    //       showCancel: false,
    //       confirmText: '好的',
    //       confirmColor: '#333',
    //       success: function (res) {
    //         if (res.confirm) {
    //           console.log('用户点击确定');
    //           /* 该隐藏的隐藏 */
    //           that.setData({
    //             hidden: true
    //           })
    //         }
    //       }
    //     })
    //   }
    // })
  },

  saveCanvasTo: function () {
    var that = this
    // 把当前画布指定区域的内容导出生成指定大小的图片。
    wx.previewImage({
      current: this.data.tmpPath, // 当前显示图片的http链接
      urls: [this.data.tmpPath] // 需要预览的图片http链接列表
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