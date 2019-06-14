// pages/audio/audio.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    audiosrc: {
      2013: {
        'link': 'cloud://tmassistant-5275ad.746d-tmassistant-5275ad/audio/champions/2013Toastmasters.mp3',
        'title': '2013 Changed By A Tire'
      },
      2014: {
        'link': 'cloud://tmassistant-5275ad.746d-tmassistant-5275ad/audio/champions/2014Toastmasters.mp3', 'title': '2014 I See Something'
      },
      2015: { 'link': 'cloud://tmassistant-5275ad.746d-tmassistant-5275ad/audio/champions/2015Toastmasters.mp3', 'title': '2015 The Power of Words' },
      2016: { 'link': 'cloud://tmassistant-5275ad.746d-tmassistant-5275ad/audio/champions/2016Toastmasters.mp3', 'title': '2016 Outsmart,Outlast' },
      2017: { 'link': 'cloud://tmassistant-5275ad.746d-tmassistant-5275ad/audio/champions/2017Toastmasters.mp3', 'title': '2017 Pull Less,Bend More' },
      2018:
        {'link': 'cloud://tmassistant-5275ad.746d-tmassistant-5275ad/audio/champions/2018Toastmasters.mp3','title':'2018 Still Standing'}
      },
    isplay: false,
    audioYear: 2018
  },

  playAudio: function (e) {
    // innerAudioContext.autoplay = true
    // if (!this.data.innerAudioContext){
    //   this.data.innerAudioContext = wx.createInnerAudioContext()
    //   this.data.innerAudioContext.obeyMuteSwitch = false
    // }
    // 对同一个音频进行操作
    if (e.currentTarget.dataset.year == this.data.audioYear) {
      if (this.data.isplay) { // 正在播放，终止
        console.log("stop")
        // innerAudioContext.stop()
        backgroundAudioManager.stop()
      } else { // 未在播放，开始播放
        console.log("play")
        // innerAudioContext.obeyMuteSwitch = false;

        // innerAudioContext.src = this.data.audiosrc[this.data.audioYear]
        // innerAudioContext.play()

        backgroundAudioManager.title = this.data.audioYear + '冠军演讲音频 by 头马助手'
        backgroundAudioManager.epname = '头马助手'
        backgroundAudioManager.singer = '头马助手'
        backgroundAudioManager.coverImgUrl = ''
        // 设置了 src 之后会自动播放
        backgroundAudioManager.src = this.data.audiosrc[this.data.audioYear]
      }
      this.setData({
        isplay: !this.data.isplay
      })
    } else { // 不是对同一个音频进行操作
      // 本来就有音频在进行
      if (this.data.isplay) {
        // innerAudioContext.stop()
        backgroundAudioManager.stop()
        this.setData({
          audioYear: e.currentTarget.dataset.year
        })
        // innerAudioContext.obeyMuteSwitch = false;
        // innerAudioContext.src = this.data.audiosrc[this.data.audioYear]
        // innerAudioContext.play()

        backgroundAudioManager.title = this.data.audioYear + '冠军演讲音频 by 头马助手'
        backgroundAudioManager.epname = '头马助手'
        backgroundAudioManager.singer = '头马助手'
        backgroundAudioManager.coverImgUrl = ''
        // 设置了 src 之后会自动播放
        backgroundAudioManager.src = this.data.audiosrc[this.data.audioYear]
      } else { // 没有音频在进行
        this.setData({
          isplay: true,
          //isplay: !this.data.isplay,
          audioYear: e.currentTarget.dataset.year
        })
        // innerAudioContext.obeyMuteSwitch = false;
        // innerAudioContext.src = this.data.audiosrc[this.data.audioYear]
        // innerAudioContext.play()

        backgroundAudioManager.title = this.data.audioYear + '冠军演讲音频 by 头马助手'
        backgroundAudioManager.epname = '头马助手'
        backgroundAudioManager.singer = '头马助手'
        backgroundAudioManager.coverImgUrl = ''
        // 设置了 src 之后会自动播放
        backgroundAudioManager.src = this.data.audiosrc[this.data.audioYear]
      }
    }

    console.log(this.data.isplay)
    console.log(this.data.audioYear)
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
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
  // onHide: function() {
  //   this.data.innerAudioContext.stop()
  // },

  // onUnload: function() {
  //   app.globalData.innerAudioContext.stop()
  // },

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

  onShareAppMessage: function (res) {
    return {
      title: '冠军演讲全纪录',
    }
  }
})