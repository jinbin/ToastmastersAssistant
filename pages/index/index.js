// pages/my/my.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    components: [
      // {
      //   title: '收藏夹',
      //   remark: '收藏夹',
      //   url: '/pages/collect/collect',
      //   icon: '../../images/find-selected.png',
      //   isTab: true 
      // },
      // {
      //   title: '联系作者',
      //   remark: '联系作者',
      //   url: '/pages/contact/contact',
      //   icon: '../../images/find-selected.png',
      // },
      // {
      //   title: '公众号',
      //   remark: '公众号',
      //   url: '/pages/my/officialAccount/offcialAccount',
      //   icon: '../../images/find-selected.png',
      // },
      {
        title: '设置',
        remark: '设置',
        url: '/pages/settings/settings',
        icon: '../../images/find-selected.png',
      }
      // {
      //   title: '有钱任性',
      //   remark: '有钱任性',
      //   url: '/pages/reward/reward',
      //   icon: '../../images/find-selected.png',
      // }
    ]
  },

  toMiniProgram: function(e) {
    console.log("toMiniProgram")
    wx.navigateToMiniProgram({
      appId: 'wx09a49d05a365a4e6',
      path: "pages/my/my",
      // envVersion: 'trial',
      success(res) {
        console.log("SUCCESS")
      }
    })
  },

  // imgload: function(ev) {
  //   let src = ev.currentTarget.dataset.src
  //   let width = ev.detail.width
  //   let height = ev.detail.height
  //   let ratio = width / height

  //   let windowWidth 
  //   let windowHeight 
  //   let after_height 

  //   //获取屏幕宽高 
  //   wx.getSystemInfo({
  //     success: function (res) {
  //       windowWidth = res.windowWidth;
  //       windowHeight = res.windowHeight;
  //       after_height = windowHeight / ratio;
  //       console.log(windowWidth)
  //       console.log(windowHeight)
  //       // var windowscale = windowHeight / windowWidth;//屏幕高宽比 
  //       // if (originalScale < windowscale) {//图片高宽比小于屏幕高宽比 
  //       //   //图片缩放后的宽为屏幕宽 
  //       //   imageSize.imageWidth = windowWidth;
  //       //   imageSize.imageHeight = (windowWidth * originalHeight) / originalWidth;
  //       // } else {//图片高宽比大于屏幕高宽比 
  //       //   //图片缩放后的高为屏幕高 
  //       //   imageSize.imageHeight = windowHeight;
  //       //   imageSize.imageWidth = (windowHeight * originalWidth) / originalHeight;
  //       // }
  //       // imageSize.imageWidth = windowWidth;
  //       // imageSize.imageHeight = windowHeight;
  //     }
  //   })

  //   console.log(width)
  //   console.log(height)

  //   this.setData({
  //     height: windowWidth,
  //     width: after_height
  //   })
  // },

  copyText: function (e) {
    wx.setClipboardData({
      data: e.currentTarget.dataset.text,
      success: function (res) {
        wx.showToast({
          title: "内容已复制"
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
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