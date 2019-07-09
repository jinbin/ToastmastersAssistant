// pages/merger/merger.js
const app = getApp()

const db = wx.cloud.database({
  env: "tmassistant-5275ad"
})

// const innerAudioContext = wx.createInnerAudioContext()
const backgroundAudioManager = wx.getBackgroundAudioManager()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    texts: ["头马世界冠军教你四招搞定公众演讲", "必学！头马演讲达人给你的五条演讲建议"],
    page_ft: {
      data: "Copyright © 2018-2019 jinbin"
    },
    audioTitle: [ '2018 Still Standing', 
                  '2017 Pull Less,Bend More', 
                  '2016 Outsmart,Outlast',
                  '2015 The Power of Words'],
    audiosrc: {
      2018: 'cloud://tmassistant-5275ad.746d-tmassistant-5275ad/audio/champions/2018Toastmasters.mp3',
      2017: 'cloud://tmassistant-5275ad.746d-tmassistant-5275ad/audio/champions/2017Toastmasters.mp3',
      2016:
'cloud://tmassistant-5275ad.746d-tmassistant-5275ad/audio/champions/2016Toastmasters.mp3',
      2015: 'cloud://tmassistant-5275ad.746d-tmassistant-5275ad/audio/champions/2015Toastmasters.mp3'
    },
    isplay: false,
    audioYear: 2018,
    banners: [
      "cloud://tmassistant-5275ad.746d-tmassistant-5275ad/images/jp_tm.jpg",
      "cloud://tmassistant-5275ad.746d-tmassistant-5275ad/images/korea_tm.jpg"
      ],
    banners1: [
      // "cloud://tmassistant-5275ad.746d-tmassistant-5275ad/images/atlanta_tm.jpg",
      "cloud://tmassistant-5275ad.746d-tmassistant-5275ad/images/santander_tm.jpg"
      ],
    banner_height: 50,
    scrollTop: 0,
    threshold: 1300,
    windowHeight: wx.getSystemInfoSync().windowHeight,
    userId: app.globalData.userInfo
  },

  onPageScroll: function(ev){
    this.setData({
      scrollTop: ev.scrollTop
    })
  },

  playAudio: function(e) {
    // innerAudioContext.autoplay = true
    // if (!this.data.innerAudioContext){
    //   this.data.innerAudioContext = wx.createInnerAudioContext()
    //   this.data.innerAudioContext.obeyMuteSwitch = false
    // }
    // 对同一个音频进行操作
    if (e.currentTarget.dataset.year == this.data.audioYear){
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
      if(this.data.isplay){
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
      }else{ // 没有音频在进行
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

  getPathways: function(options) {
    wx.navigateTo({
      url: '/pages/pathways/desc/desc?level=' + options.currentTarget.id,
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },

  getToNavi: function (options) {
    console.log(options)

    var naviTo = '/pages/webview/webview?article=' + options.currentTarget.id

    wx.navigateTo({
      url: naviTo,
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },

  getRoles: function(options) {
    console.log(options.detail.formId)

    var timestamp = Date.parse(new Date()) / 1000
    var newtimestamp = timestamp + 24 * 60 * 60 * 7
    var n7_to = newtimestamp * 1000

    db.collection("formIds").add({
      data: {
        openid: this.data.openid,
        formId: options.detail.formId,
        expire: new Date(n7_to),
        available: true
      }
    })

    var naviTo = '/pages/webview/webview?article=' + options.detail.target.id

    wx.navigateTo({
      url: naviTo,
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },

  getTool: function(options) {
    var timestamp = Date.parse(new Date()) / 1000
    var newtimestamp = timestamp + 24 * 60 * 60 * 7
    var n7_to = newtimestamp * 1000

    db.collection("formIds").add({
      data: {
        openid: this.data.openid,
        formId: options.detail.formId,
        expire: new Date(n7_to),
        available: true
      }
    })

    if (options.detail.target.id == "timertool") {
      wx.navigateTo({
        url: '/pages/tm/clock/set/set',
        success: function(res) {},
        fail: function(res) {},
        complete: function(res) {},
      })
    } else if (options.detail.target.id == "matrix") {
      wx.navigateTo({
        url: '/pages/knowledge/matrix/matrix',
      })
    } else if (options.detail.target.id == "jixing") {
      wx.navigateToMiniProgram({
        appId: 'wx4c4b54bc609bd79e',
      })
    } else if (options.detail.target.id == "translator") {
      wx.navigateTo({
        url: '/pages/translator/translator',
      })
    } else if (options.detail.target.id == "check") {
      wx.navigateTo({
        url: '/pages/tools/checklist/checklist',
      })
    }
  },

  getArticle: function(options) {
    console.log(options.detail.formId)

    var timestamp = Date.parse(new Date()) / 1000
    var newtimestamp = timestamp + 24 * 60 * 60 * 7
    var n7_to = newtimestamp * 1000

    db.collection("formIds").add({
      data: {
        openid: this.data.openid,
        formId: options.detail.formId,
        expire: new Date(n7_to),
        available: true
      }
    })

    if (options.detail.target.id == "toumazhushou") {
      wx.navigateTo({
        url: '/pages/webview/webview?article=toumazhushou',
      })
    } else if (options.detail.target.id == "contact") {
      wx.navigateTo({
        url: '/pages/contact/contact',
      })
    } else if (options.detail.target.id == "dashang") {
      wx.navigateToMiniProgram({
        appId: 'wx18a2ac992306a5a4',
        path: 'pages/apps/largess/detail?id=LYFYxTFDv9E%3D'
      })
    }
  },

  saveOfficialQRCode: function (e) {
    wx.showModal({
      content: '搜索"头马助手"官方公众号, 获取历年头马世界冠军演讲视频！',
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
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      banner_height: 240 / wx.getSystemInfoSync().windowHeight * 100
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

  onShareAppMessage: function(res) {
    return {
      title: '头马助手: 头马的百科全书, 比你想要的更多一点',
      imageUrl: 'https://746d-tmassistant-5275ad-1258071577.tcb.qcloud.la/images/%E5%A4%B4%E9%A9%AC%E5%8A%A9%E6%89%8B%E9%A6%96%E9%A1%B5.jpeg?sign=fc1c02a182483dfc578531534b8fa28c&t=1560520486'
    }
  }
})
