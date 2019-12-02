// pages/music/music.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: '大碗宽面',
    url: '',
    imageUrl: 'http://static.runoob.com/images/demo/demo1.jpg',
    homeImage: "http://static.runoob.com/images/demo/demo1.jpg",
    animationData: {},
    isPlay: false,
    thePosition: 0,
    angle: 0,
    cur: '01:10',
    duration: '06:15'

  },
  //返回到清单页
  backIndex: function () {
    wx.navigateTo({
      url: '../index/index',
    });
    app.globalData.angle = this.data.angle;
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //加载传递过来的参数
    console.log("options: " + options)
    var title = options.title || "今日听力"
    var audio = options.audio || "cloud://tmassistant-5275ad.746d-tmassistant-5275ad/audio/6min/Improving_your_memory.mp3"
    console.log(options.text)
    var pdf = options.text
    this.setData({
      // name: "Improving your memory",
      // url: "cloud://tmassistant-5275ad.746d-tmassistant-5275ad/audio/6min/Improving_your_memory.mp3",
      name: title,
      url: audio, 
      imageUrl: "http://static.runoob.com/images/demo/demo1.jpg",
      // backUrl: "../../images/back.png",
      // nextUrl: "../../images/goon.png",
      playOrStopUrl: "../../images/暂停.png",
      isPlay: true,
      text: pdf
    })

    if (options.todaysaudio == "yes"){
      this.setData({
        todaysaudio: "yes"
      })
    }
    // //加载页面时执行播放动作
    // wx.playBackgroundAudio({
    //   dataUrl: this.data.url,
    // })
    const backgroundAudioManager = wx.getBackgroundAudioManager()
    backgroundAudioManager.title = '演讲音频 by 头马助手'
    backgroundAudioManager.epname = '头马助手'
    backgroundAudioManager.singer = '头马助手'
    backgroundAudioManager.coverImgUrl = ''
    backgroundAudioManager.src = this.data.url
  },
  //播放/暂停
  play: function () {
    const backgroundAudioManager = wx.getBackgroundAudioManager();
    // var theTime;
    // var allTime;
    if (this.data.isPlay) {
      // wx.pauseBackgroundAudio();
      // theTime = backgroundAudioManager.currentTime;
      // allTime = backgroundAudioManager.duration;
      // var theString1 = theTime.toFixed(0);
      // var theInt1 = parseInt(theString1);
      // var m1 = theInt1 / 60;
      // var mString1 = m1.toFixed(0);
      // var mInt1 = parseInt(mString1);
      // var s1 = theInt1 % 60 / 100;
      // var cur = mInt1 + s1;
      // var theString = allTime.toFixed(0);
      // var theInt = parseInt(theString);
      // var m = theInt / 60;
      // var mString = m.toFixed(0);
      // var mInt = parseInt(mString);
      // var s = theInt % 60 / 100;
      // var all = mInt + s;
      backgroundAudioManager.stop()
      this.setData({
        playOrStopUrl: "../../images/开始.png",
        isPlay: false,
      });
    } else {
      // backgroundAudioManager.seek(this.data.thePosition);
      backgroundAudioManager.title = '演讲音频 by 头马助手'
      backgroundAudioManager.epname = '头马助手'
      backgroundAudioManager.singer = '头马助手'
      backgroundAudioManager.coverImgUrl = ''
      backgroundAudioManager.src = this.data.url
      backgroundAudioManager.play();
      this.setData({
        playOrStopUrl: "../../images/暂停.png",
        isPlay: true
      });
    }
  },

  //下一首
  // theNext: function () {
  //   var j;
  //   var musicList = getApp().globalData.musicList.concat();
  //   for (var i = 0; i < musicList.length; i++) {
  //     if (musicList[i].name == this.data.name) {
  //       j = i;
  //       break;
  //     } else {
  //       j = -1;
  //     }
  //   }
  //   if (musicList.length - 1 == j) {
  //     this.setData({
  //       name: musicList[0].name,
  //       url: musicList[0].url
  //     });
  //   } else {
  //     this.setData({
  //       name: musicList[j + 1].name,
  //       url: musicList[j + 1].url
  //     });
  //   }
  //   wx.playBackgroundAudio({
  //     dataUrl: this.data.url,
  //   })
  // },

  //上一首
  // theBack: function () {
  //   var j;
  //   var theLength = 0;
  //   var musicList = getApp().globalData.musicList.concat();
  //   theLength = musicList.length;
  //   for (var i = 0; i < musicList.length; i++) {
  //     if (musicList[i].name == this.data.name) {
  //       j = i;
  //       break;
  //     } else {
  //       j = 1;
  //     }
  //   }
  //   if (j == 0) {
  //     this.setData({
  //       name: musicList[theLength - 1].name,
  //       url: musicList[theLength - 1].url
  //     });
  //   } else {
  //     this.setData({
  //       name: musicList[j - 1].name,
  //       url: musicList[j - 1].url
  //     });
  //   }
  //   wx.playBackgroundAudio({
  //     dataUrl: this.data.url,
  //   })
  // },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var animation = wx.createAnimation({
      duration: 1000,
      timingFunction: 'ease',
    })

    this.animation = animation

    // animation.scale(2, 2).rotate(45).step()

    this.setData({
      animationData: animation.export()
    })
    var n = 0;
    //连续动画需要添加定时器,所传参数每次+1就行
    setInterval(function () {
      n = this.data.angle;
      if (this.data.isPlay) {
        n = n + 1;
      } else {
        n = n;
      }
      this.setData({
        angle: n,
      })
      this.animation.rotate(8 * n).step()
      this.setData({
        animationData: this.animation.export()
      })
    }.bind(this), 360)
  },

  backToAudio: function(){
    wx.navigateTo({
      url: '/pages/audio/audio',
    })
  },

  seeText: function() {
    wx.navigateTo({
      url: '/pages/pathways/document/document?url=' + this.data.text,
    })
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
    var path
    if (this.data.text){
      path = '/pages/music/music?audio=' + this.data.url + '&title=' + this.data.name + '&text=https://746d-tmassistant-5275ad-1258071577.tcb.qcloud.la/' + this.data.text
    } else{
      path = '/pages/music/music?audio=' + this.data.url + '&title=' + this.data.name
    }

    if (this.data.todaysaudio == "yes") {
      return {
        imageUrl: '/images/todaysaudio-min.jpeg',
        title: '音频库:《' + this.data.name + '》',
        path: path
      }
    } else {
      return {
        imageUrl: '/images/musicbanner-min.jpg',
        title: '音频库:《' + this.data.name + '》',
        path: path
      }
    }
  }
})