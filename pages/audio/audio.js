// pages/audio/audio.js
const app = getApp()
const backgroundAudioManager = wx.getBackgroundAudioManager()
const db = wx.cloud.database({
  env: "tmassistant-5275ad"
})

Page({

  /**
   * 页面的初始数据
   */
  data: {
    isplay: false,
    audioYear: 2018,
    channel: "tm",
    color1: "#C1FFC1"
  },

  getCh: function (e) {
    console.log(e.currentTarget.id)
    if(e.currentTarget.id == "tm"){
      this.setData({
        color1: "#C1FFC1",
        color2: "",
        color3: ""
      })
    } else if (e.currentTarget.id == "ted"){
      this.setData({
        color1: "",
        color2: "#FFE4E1",
        color3: ""
      })  
    } else if (e.currentTarget.id == "6min"){
      this.setData({
        color1: "",
        color2: "",
        color3: "#FFDEAD"
      })
      //视频在公众号内
      // wx.showModal({
      //   content: '因为小程序受限，所有优质视频内容存放在官方公众号内。搜索"头马助手"官方公众号, 获取历年头马世界冠军演讲、TED精选、英语口语技巧视频！',
      //   showCancel: false,
      //   confirmText: '去关注',
      //   confirmColor: '#ff7f50',
      //   success: function (res) {
      //     if (res.confirm) {
      //       wx.setClipboardData({
      //         data: "头马助手 Toastmasters Assistant",
      //         success: function (res) {
      //           wx.showToast({
      //             title: "公众号名已复制"
      //           })
      //         }
      //       })
      //       console.log('用户点击确定');
      //     }
      //   }
      // })       
    }
    this.setData({
      isplay: false,
      channel: e.currentTarget.id
    })
    backgroundAudioManager.stop()
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

  audioManage: function (options) {
    console.log(options.currentTarget.id)
    if (options.currentTarget.id == "continue") {
      backgroundAudioManager.play()
      this.setData({
        isplay: true,
      })
      this.globalData.globalbgAudioIsPlay = true
    } else if (options.currentTarget.id == "stop") {
      backgroundAudioManager.stop()
      this.setData({
        isplay: false
      })
      this.globalData.globalbgAudioIsPlay = false
    }
  },

  playAudio: function (e) {
    var that = this 
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
          // backgroundAudioManager.src = this.data.audiosrc[this.data.audioYear]['link']
          console.log(that.data.audioYear)
          // console.log(this.data.audiosrc.filter(function (x) { return x["year"] == that.data.audioYear }))
          // backgroundAudioManager.src = this.data.audiosrc.filter(function (x) { return x["year"] == that.data.audioYear })[0]['link']
          backgroundAudioManager.src = this.data.audiosrc[this.data.audioYear]['link']
        } else if (this.data.channel == "ted") {
          backgroundAudioManager.src = this.data.audioTEDsrc[this.data.audioYear]['link']
        } else if (this.data.channel == "6min") {
          console.log(this.data.audio6minsrc[this.data.audioYear]['link'])
          backgroundAudioManager.src = this.data.audio6minsrc[this.data.audioYear]['link']
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
          // backgroundAudioManager.src = this.data.audiosrc[this.data.audioYear]['link']
          console.log(that.data.audioYear)
          // console.log(this.data.audiosrc.filter(function (x) { return x["year"] == that.data.audioYear }))
          // backgroundAudioManager.src = this.data.audiosrc.filter(function (x) { return x["year"] == that.data.audioYear })[0]['link']
          backgroundAudioManager.src = this.data.audiosrc[this.data.audioYear]['link']
        } else if (this.data.channel == "ted") {
          backgroundAudioManager.src = this.data.audioTEDsrc[this.data.audioYear]['link']
        } else if (this.data.channel == "6min") {
          console.log(this.data.audio6minsrc[this.data.audioYear]['link'])
          backgroundAudioManager.src = this.data.audio6minsrc[this.data.audioYear]['link']
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
          // backgroundAudioManager.src = this.data.audiosrc[this.data.audioYear]['link']
          console.log(that.data.audioYear)
          // console.log(this.data.audiosrc.filter(function (x) { return x["year"] == that.data.audioYear }))
          // backgroundAudioManager.src = this.data.audiosrc.filter(function (x) { return x["year"] == that.data.audioYear })[0]['link']
          backgroundAudioManager.src = this.data.audiosrc[this.data.audioYear]['link']
        } else if (this.data.channel == "ted") {
          backgroundAudioManager.src = this.data.audioTEDsrc[this.data.audioYear]['link']
        } else if (this.data.channel == "6min") {
          console.log(this.data.audio6minsrc[this.data.audioYear]['link'])
          backgroundAudioManager.src = this.data.audio6minsrc[this.data.audioYear]['link']
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
    var that = this 
    console.log(options.type)

    db.collection("audio").where({
      type: "ted"
    }).get({
      success: function (e) {
        console.log("ted success")
        that.setData({
          audioTEDsrc: e.data
        })
        console.log(that.data.audioTEDsrc)
        db.collection("audio").where({
          type: "tm"
        }).get({
          success: function (e) {
            console.log("tm success")
            that.setData({
              audiosrc: e.data
            })
            console.log(that.data.audiosrc)
            db.collection("audio").where({
              type: "6min"
            }).get({
              success: function (e) {
                that.setData({
                  audio6minsrc: e.data
                })
              }
            })
          }
        })
      }
    })

    if (options.type == "tm") {
      this.setData({
        color1: "#C1FFC1",
        color2: "",
        color3: ""
      })
    } else if (options.type == "ted") {
      this.setData({
        color1: "",
        color2: "#FFE4E1",
        color3: ""
      })
    } else if (options.type == "6min") {
      this.setData({
        color1: "",
        color2: "",
        color3: "#FFDEAD"
      })
    }
    this.setData({
      isplay: false,
      channel: options.type
    })
    backgroundAudioManager.stop()
  },

  // onLoad: function (options) {
  //   var that = this

  //   db.collection("audio").where({
  //     type: "ted",
  //     onIndex: true
  //   }).get({
  //     success: function (e) {
  //       console.log(e)
  //       that.setData({
  //         audioTEDsrc: e.data
  //       })
  //       db.collection("audio").where({
  //         type: "tm",
  //         onIndex: true
  //       }).get({
  //         success: function (e) {
  //           that.setData({
  //             audiosrc: e.data
  //           })
  //         }
  //       })
  //     }
  //   })
  // },

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
      imageUrl: '/images/audioforward-min.jpeg',
      title: '头马, TED, 冠军演讲音频，这里全都有!',
    }
  }
})