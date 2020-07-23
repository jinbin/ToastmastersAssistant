// pages/pathways/document/document.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    button_text: "云资源耗尽，服务改造中\n暂不提供下载和预览服务"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    let interstitialAd = null
    
    if (wx.createInterstitialAd){
      interstitialAd = wx.createInterstitialAd({
        adUnitId: 'adunit-61bc632530119796'
      })
    }

    console.log(options)
    var url = options.url 
    this.setData({
      downloadUrl: url
    })
    if (options.type == "url"){
      this.setData({
        prompt: "请复制链接在微信中打开"
      })
    }else {
      this.setData({
        prompt: "PDF下载需要一点时间，稍候自动打开。\n资料地址可通过以下按钮复制获取。(因每月CDN流量有限，流量耗尽则无法下载，尽情谅解。)"
      })      
    }
    wx.downloadFile({
      // 示例 url，并非真实存在
      url: url,
      success: function (res) {
        const filePath = res.tempFilePath
        wx.openDocument({
          filePath: filePath,
          success: function (res) {
            console.log('打开文档成功')

            interstitialAd.show()
              .catch(err => console.log(err.errMsg))
          }
        })
      }
    })
  },

  saveOfficialQRCode: function (e) {
    wx.navigateTo({
      url: '/pages/testdb/testdb?src=https://mp.weixin.qq.com/s/uybVCD6KfKgSoCq0Jo4g_A',
    })
  },

  copyText: function (e) {
    wx.setClipboardData({
      data: e.currentTarget.dataset.text,
      success: function (res) {
        wx.showToast({
          title: "资料地址已复制"
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