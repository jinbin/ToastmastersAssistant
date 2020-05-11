// pages/my/my.js

var util = require('../../utils/util.js');
const db = wx.cloud.database({
  env: "tmassistant-5275ad"
})

//var Page = require('../../utils/xmadx_sdk.min.js').xmad(Page).xmPage;
var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    score: 0,
    // openId: "",
    time: "",
    appId: "wx8abaf00ee8c3202e",
    tt_appId: "wx4c4b54bc609bd79e",
    xmad: {
      adData: {},
      ad: {
        //控制是否展示小盟广告
        // banner: "xm6af34a1b995dc4d57ed465e5a576ed",
        // insert: "xm89372fed7b9637bab41fb1b2357db4",
        // fixed: "xm11a2174a683e4417c95daa9bd0ad9a"
      }
    },
    page_ft: {
      data: "Copyright © 2019-2020 可能性工作室"
    },
    extraData: {
      id: "43654",
      // 自定义参数，具体参考文档
      customData: {
        clientInfo: '',
        imei: ''
      }
    },
    components: [],
    isAdError: false
  },

  onShow: function(options) {
    console.log("F: " + app.globalData.openId)
    // this.setData({
    //   time: util.formatTime(new Date())
    // })

    var that = this
    db.collection("checkin").where({
      openid: app.globalData.openId
    }).get({
      success: function(res) {
        var score = 0
        if (res.data.length != 0) {
          if (res.data[0]["rewardedvideo"]) {
            score = score + res.data[0].rewardedvideo * 10
          }
          if (res.data[0]["checkin"]) {
            score = score + res.data[0].checkin * 10
          }
          app.globalData.jifen = score
          that.setData({
            score: score
          })
        } else {
          // score仍为0
        }
      }
    })
    //   }
    // })
  },

  bindViewTap() {
    wx.navigateToMiniProgram({
      appId: 'wxde40c5cf1d10c3d1',
      path: 'pages/index/index?uid=xiaomeng&pakey=e1be9224',
      extraData: {
        foo: 'bar'
      },
      envVersion: 'release',
      success(res) {}
    })
  },

  gotoGeizan: function(options) {
    if (options.currentTarget.dataset.img) {
      wx.previewImage({
        current: options.currentTarget.dataset.img, // 当前显示图片的http链接
        urls: [options.currentTarget.dataset.img] // 需要预览的图片http链接列表
      })
    } else {
      wx.previewImage({
        current: 'cloud://tmassistant-5275ad.746d-tmassistant-5275ad-1258071577/images/zanshang-min.jpeg', // 当前显示图片的http链接
        urls: ["cloud://tmassistant-5275ad.746d-tmassistant-5275ad-1258071577/images/zanshang-min.jpeg"] // 需要预览的图片http链接列表
      })
    }
  },

  watchAd: function() {
    var that = this

    wx.showModal({
      content: "获取积分\n观看视频广告可以获得10积分",
      showCancel: true,
      cancelText: '不，不看',
      confirmText: '立即观看',
      confirmColor: '#ff7f50',
      success: function(res) {
        if (res.confirm) {
          // 在页面中定义激励视频广告
          let videoAd = null

          // 在页面onLoad回调事件中创建激励视频广告实例
          if (wx.createRewardedVideoAd) {
            videoAd = wx.createRewardedVideoAd({
              adUnitId: 'adunit-83fb3cf4237d8f94'
            })
            videoAd.onLoad(() => {})
            videoAd.onError((err) => {})
            videoAd.onClose((status) => {
              if (status && status.isEnded || status === undefined) {
                console.log(res)
                // 正常播放结束，下发奖励
                // continue you code
                var score = that.data.score + 10
                app.globalData.jifen = score

                that.setData({
                  score: score
                })

                // 更新数据库
                db.collection("checkin").where({
                  openid: app.globalData.openId
                }).get({
                  success: function(res) {
                    console.log("res")
                    console.log(res)
                    // 从来没签到过
                    if (res.data.length == 0) {
                      console.log("res.data.length == 0")
                      db.collection('checkin').add({
                        data: ({
                          checkin: 0,
                          //date: util.formatTime(new Date()),
                          openid: app.globalData.openId,
                          created_at: util.formatTime(new Date()),
                          rewardedvideo: 1
                        }),
                        success: function(res1) {
                          console.log(res1)
                        }
                      })
                    } else {
                      var doc = db.collection('checkin').doc(res.data[0]._id)
                      console.log("doc")
                      console.log(res.data[0])
                      //有点过激励广告
                      if (res.data[0]["rewardedvideo"]) {
                        console.log("有点过激励广告")
                        db.collection('checkin').doc(res.data[0]._id).update({
                          data: {
                            rewardedvideo: db.command.inc(1)
                          },
                          success: res1 => {
                            wx.showModal({
                              content: "达成任务！积分: +10",
                              showCancel: false,
                              confirmColor: '#ff7f50',
                              success: function(res) {
                                if (res.confirm) {
                                  console.log("confirm")
                                }
                              }
                            })
                          }
                        })
                      } else {
                        //没有点过激励广告
                        console.log("没有点过激励广告")
                        console.log(res.data[0]._id)
                        console.log(db.collection('checkin').doc(res.data[0]._id))
                        db.collection('checkin').doc(res.data[0]._id).update({
                          data: {
                            rewardedvideo: 1
                          },
                          success: res1 => {
                            console.log(res1)

                            wx.showModal({
                              content: "达成任务！积分: +10",
                              showCancel: false,
                              confirmColor: '#ff7f50',
                              success: function(res) {
                                if (res.confirm) {
                                  console.log("confirm")
                                }
                              }
                            })
                          }
                        })
                      }
                    }
                  }
                })
              } else {
                // 播放中途退出，进行提示
              }
            })
          }

          // 用户触发广告后，显示激励视频广告
          if (videoAd) {
            videoAd.show().catch(() => {
              // 失败重试
              videoAd.load()
                .then(() => videoAd.show())
                .catch(err => {
                  console.log('激励视频 广告显示失败')
                })
            })
          }
        }
      }
    })
  },

  // onShow: function(options) {
  //   this.setData({
  //     score: app.globalData.jifen
  //   })
  // },

  login: function(e) {
    var that = this
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          console.log("true")
          that.setData({
            isLogin: "已登录"
          })
        } else {
          console.log("false")
          that.setData({
            isLogin: "登录了解更多"
          })
        }
      }
    })
  },

  linkTA: function(e) {
    wx.showModal({
      content: "关联步骤\n1. 登录微信公众号\n2. 小程序管理->添加\n3. 验证并关联小程序\n4. 输入小程序名称\n5. 点击确认即可",
      showCancel: true,
      confirmText: 'AppID',
      confirmColor: '#ff7f50',
      success: function(res) {
        if (res.confirm) {
          wx.setClipboardData({
            data: "wx16c76d4762cbe0b3",
            success: function(res) {
              wx.showToast({
                title: "名称已复制"
              })
            }
          })
          console.log('用户点击确定');
        }
      }
    })
  },

  navigateTo: function(options) {
    wx.navigateTo({
      url: options.currentTarget.id
    })
  },

  navigateToMiniProgram: function(options) {
    wx.navigateToMiniProgram({
      appId: options.currentTarget.id,
      path: options.currentTarget.dataset.path
    })
  },

  toBilingualSpeak: function(e) {
    wx.navigateToMiniProgram({
      appId: 'wx4c4b54bc609bd79e'
    })
  },

  aderror: function(options) {
    this.setData({
      isAdError: true
    })
  },

  saveOfficialQRCode: function(e) {
    wx.showModal({
      content: '搜索"头马演讲助手", 关注官方公众号, 回复"福利"有惊喜！',
      showCancel: false,
      confirmText: '去关注',
      confirmColor: '#ff7f50',
      success: function(res) {
        if (res.confirm) {
          wx.setClipboardData({
            data: "头马演讲助手",
            success: function(res) {
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

  saveQRCode: function(options) {
    console.log(options)
    var that = this
    wx.getSetting({
      success(res) {
        console.log(res.authSetting["scope.writePhotosAlbum"])
        if (res.authSetting["scope.writePhotosAlbum"]) {
          wx.saveImageToPhotosAlbum({
            //filePath: "images/qrcode.jpg",
            filePath: options.currentTarget.id,
            success: function(res) {
              console.log("save success!")

              wx.showModal({
                content: '图片已保存到相册，赶紧发给需要的小伙伴吧~',
                showCancel: false,
                confirmText: '好的',
                confirmColor: '#333',
                success: function(res) {
                  if (res.confirm) {
                    console.log('用户点击确定');
                  }
                }
              })
            }
          })
        } else {
          wx.showModal({
            content: '此功能需要打开保存图片到相册的权限后才可使用~',
            showCancel: false,
            confirmText: '好的',
            confirmColor: '#333',
            success: function(res) {
              if (res.confirm) {
                wx.authorize({
                  scope: 'scope.writePhotosAlbum'
                })
                wx.openSetting({})
              }
            }
          })
        }
      }
    })
  },

  bindGetUserInfo: function(e) {
    var that = this
    if (e.detail.userInfo) {
      //用户按了允许按钮
      that.setData({
        isLogin: "已登录"
      })
    } else {
      //用户按了拒绝按钮
      that.setData({
        isLogin: "登录了解更多"
      })
    }
  },

  toMiniProgram: function(e) {
    console.log("toMiniProgram")
    wx.navigateToMiniProgram({
      appId: 'wx09a49d05a365a4e6',
      path: "pages/contact/contact",
      // envVersion: 'trial',
      success(res) {
        console.log("SUCCESS")
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

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
    return {
      title: '头马助手, 演讲一站式服务, 可能是最好的演讲类小程序',
      imageUrl: '/images/homepage-min.png'
    }
  },

  fromPageFt: function() {
    util.saveOfficialQRCode("可能性工作室")
  }
})
