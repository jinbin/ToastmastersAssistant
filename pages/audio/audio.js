// pages/audio/audio.js
const app = getApp()
const backgroundAudioManager = wx.getBackgroundAudioManager()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    audiosrc: {
      2018:
        { 'link': 'cloud://tmassistant-5275ad.746d-tmassistant-5275ad/audio/champions/2018Toastmasters.mp3', 'title': '2018 Still Standing' },
      2017: { 'link': 'cloud://tmassistant-5275ad.746d-tmassistant-5275ad/audio/champions/2017Toastmasters.mp3', 'title': '2017 Pull Less,Bend More' },
      2016: { 'link': 'cloud://tmassistant-5275ad.746d-tmassistant-5275ad/audio/champions/2016Toastmasters.mp3', 'title': '2016 Outsmart,Outlast' },
      2015: { 'link': 'cloud://tmassistant-5275ad.746d-tmassistant-5275ad/audio/champions/2015Toastmasters.mp3', 'title': '2015 The Power of Words' },
      2014: {
        'link': 'cloud://tmassistant-5275ad.746d-tmassistant-5275ad/audio/champions/2014Toastmasters.mp3', 'title': '2014 I See Something'
      },
      2013: {
        'link': 'cloud://tmassistant-5275ad.746d-tmassistant-5275ad/audio/champions/2013Toastmasters.mp3',
        'title': '2013 Changed By A Tire'
      }
    },
    audioTEDsrc: {
      'How_to_Achieve_Your_Most_Ambitious_Goals':
        { 'link': 'cloud://tmassistant-5275ad.746d-tmassistant-5275ad/audio/ted/How_to_Achieve_Your_Most_Ambitious_Goals.mp3', 'title': 'How to achieve your most ambitious goals' },
      'Sleep_is_your_superpower':
        {
        'link': 'cloud://tmassistant-5275ad.746d-tmassistant-5275ad/audio/ted/Sleep_is_your_superpower.mp3', 'title': 'Sleep is your superpower'
        },
      'The healing power of reading':
        {
        'link': 'cloud://tmassistant-5275ad.746d-tmassistant-5275ad/audio/ted/The_healing_power_of_reading.mp3', 'title': 'The healing power of reading'
        }
    },
    isplay: false,
    audioYear: 2018,
    channel: "tm",
    color1: "#1E90FF"
  },

  getCh: function (e) {
    console.log(e.currentTarget.id)
    if(e.currentTarget.id == "tm"){
      this.setData({
        color1: "#1E90FF",
        color2: "",
        color3: ""
      })
    } else if (e.currentTarget.id == "ted"){
      this.setData({
        color1: "",
        color2: "#FF4040",
        color3: ""
      })  
    } else {
      this.setData({
        color1: "",
        color2: "",
        color3: "#8B8970"
      })
      //视频在公众号内
      wx.showModal({
        content: '因为小程序受限，所有优质视频内容存放在官方公众号内。搜索"头马助手"官方公众号, 获取历年头马世界冠军演讲、TED精选、英语口语技巧视频！',
        showCancel: false,
        confirmText: '去关注',
        confirmColor: '#ff7f50',
        success: function (res) {
          if (res.confirm) {
            wx.setClipboardData({
              data: "头马助手 Toastmasters Assistant",
              success: function (res) {
                wx.showToast({
                  title: "公众号名已复制"
                })
              }
            })
            console.log('用户点击确定');
          }
        }
      })       
    }
    this.setData({
      channel: e.currentTarget.id
    })
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

        backgroundAudioManager.title = this.data.audioYear + '演讲音频 by 头马助手'
        backgroundAudioManager.epname = '头马助手'
        backgroundAudioManager.singer = '头马助手'
        backgroundAudioManager.coverImgUrl = ''
        // 设置了 src 之后会自动播放
        if (this.data.channel == "tm") {
          backgroundAudioManager.src = this.data.audiosrc[this.data.audioYear]['link']
        } else if (this.data.channel == "ted") {
          backgroundAudioManager.src = this.data.audioTEDsrc[this.data.audioYear]['link']
        }
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

        backgroundAudioManager.title = this.data.audioYear + '演讲音频 by 头马助手'
        backgroundAudioManager.epname = '头马助手'
        backgroundAudioManager.singer = '头马助手'
        backgroundAudioManager.coverImgUrl = ''
        // 设置了 src 之后会自动播放
        if (this.data.channel == "tm") {
          backgroundAudioManager.src = this.data.audiosrc[this.data.audioYear]['link']
        } else if (this.data.channel == "ted") {
          backgroundAudioManager.src = this.data.audioTEDsrc[this.data.audioYear]['link']
        }
      } else { // 没有音频在进行
        this.setData({
          isplay: true,
          //isplay: !this.data.isplay,
          audioYear: e.currentTarget.dataset.year
        })
        // innerAudioContext.obeyMuteSwitch = false;
        // innerAudioContext.src = this.data.audiosrc[this.data.audioYear]
        // innerAudioContext.play()

        backgroundAudioManager.title = this.data.audioYear + '演讲音频 by 头马助手'
        backgroundAudioManager.epname = '头马助手'
        backgroundAudioManager.singer = '头马助手'
        backgroundAudioManager.coverImgUrl = ''
        // 设置了 src 之后会自动播放
        if (this.data.channel == "tm") {
          backgroundAudioManager.src = this.data.audiosrc[this.data.audioYear]['link']
        } else if (this.data.channel == "ted") {
          backgroundAudioManager.src = this.data.audioTEDsrc[this.data.audioYear]['link']
        }
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
      title: '头马冠军演讲，TED演讲音频全纪录',
    }
  }
})