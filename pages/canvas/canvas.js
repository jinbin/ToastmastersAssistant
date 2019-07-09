// pages/canvas/canvas.js

const sysInfo = wx.getSystemInfoSync();
const screenWidth = sysInfo.screenWidth;
const factor = screenWidth / 750;

function toPx(rpx) { // rpx转px
  return rpx * factor;
}

function toRpx(px) { // px转rpx
  return px / factor;
}

Page({

  /**
   * 页面的初始数据
   */
  data: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let ctx = wx.createCanvasContext('canvas', this)

    // 设置矩形的填充色 
    // ctx.setFillStyle('white')
    // 填充一个矩形 
    // ctx.fillRect(100, 10, 150, 75)

    // ctx.setTextAlign('right')

    wx.getImageInfo({
      src: 'https://746d-tmassistant-5275ad-1258071577.tcb.qcloud.la/images/backgroud/bg1.jpg',
      success: (res) => {
        ctx.drawImage("/images/bg1.jpg", 0, 0, toPx(680), toPx(1100))
        // 宽度 680rpx 
        ctx.setFontSize(40)
        ctx.fillText('头马助手', toPx(200), toPx(100))

        ctx.setFontSize(20)
        ctx.fillText('头马的百科全书', toPx(140), toPx(230))
        ctx.fillText('比你想要的更多一点', toPx(140), toPx(300))
        wx.getImageInfo({
          src: "https://746d-tmassistant-5275ad-1258071577.tcb.qcloud.la/images/%E5%A4%B4%E9%A9%AC%E5%8A%A9%E6%89%8B%E9%A6%96%E9%A1%B5.jpeg",
          success: (res) => {
            // 下载成功 即可获取到本地路径
            ctx.drawImage(res.path, toPx(115), toPx(350), toPx(450), toPx(500))

            wx.getImageInfo({
              src: 'https://746d-tmassistant-5275ad-1258071577.tcb.qcloud.la/images/qrcode.jpg',
              success: (res) => {
                ctx.drawImage(res.path, toPx(240), toPx(880), toPx(200), toPx(200))
                ctx.draw()
              }
            })
          }
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})