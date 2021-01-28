// pages/merger/merger.js
const app = getApp()
var util = require('../../utils/util.js');
const db = wx.cloud.database({
  env: "tmassistant-5275ad"
})

Page({

  /**
   * 页面的初始数据
   */
  data: {
    /*
      文字无限滚动
    */

    // text: "更多公众演讲和领导力的内容，点击这里\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t",
    // marqueePace: 0.5, //滚动速度
    // marqueeDistance: 0, //初始滚动距离
    // marquee_margin: 30,
    // size: 14,
    // interval: 20, // 时间间隔

    eggs: {
      "egg1": false,
      "egg2": false,
      "egg3": false
    },

    isTop: true,

    // page_ft: {
    //  data: "Copyright © 2020-2021 可能性工作室"
    //},
    //isplay: false,
    //audioYear: 2018,
    banners: [
      //{
      //   "url": "cloud://tmassistant-5275ad.746d-tmassistant-5275ad/images/accountpublicitybanner.jpeg",
      //   "bind": "saveOfficialQRCode"
      // },
      // {
      //   "url": "../../images/tm_korea-min.jpg",
      //   "bind": "saveOfficialQRCode"
      // },
      // {
      //   "url": "cloud://tmassistant-5275ad.746d-tmassistant-5275ad-1258071577/images/posters/robot_banner_900x600-min.png",
      //   "bind": "gotoRobot"
      // },
      // {
      //   "url": "../../images/dashangzhichi_banner-min.jpeg",
      //   "bind": "gotoGeizan"
      // },
      {
        "url": "cloud://tmassistant-5275ad.746d-tmassistant-5275ad-1258071577/images/tmbanner.jpeg",
        "bind": "gotoGeizan"
      }
      // {
      //   "url": "cloud://tmassistant-5275ad.746d-tmassistant-5275ad/images/TEDtalk2.jpeg",
      //   "bind": "saveOfficialQRCode"
      // }
      // {
      //   "url": "https://746d-tmassistant-5275ad-1258071577.tcb.qcloud.la/images/bilingualSpeak.jpeg?sign=559732267d212043dba93a6e0023d99f&t=1565749963",
      //   "bind": "toBilingualSpeak"
      // }
    ],
    banner_height: 50,
    scrollTop: 0,
    threshold: 1300,
    windowHeight: wx.getSystemInfoSync().windowHeight,
    userId: app.globalData.userInfo,
    topics: [{
        "title": "真人秀",
        "id": "06f09e83-ede9-4de1-8fb5-c2ea5a0d7215"
      },
      {
        "title": "困境",
        "id": "2d5ccb4f-e90f-4ec6-9118-0697e366117b"
      },
      {
        "title": "假如",
        "id": "EUO7d4DhyO4kGeyLxgUfJmNOgFNBPJNmkXlDT8Vdm5KNUk3M"
      },
      {
        "title": "高考",
        "id": "b9fb62e7-2a49-4e66-bc10-71cb6dcd03a2"
      }
    ],
    currentTab: 0
  },

  gotoRobot: function (e) {
    wx.switchTab({
      url: '/pages/chat/chat',
    })
  },

  playTEDaudio: function (e) {
    console.log("TED audio")
  },

  getIntro: function (options) {
    var that = this
    console.log(options.detail.formId)

    var timestamp = Date.parse(new Date()) / 1000
    var newtimestamp = timestamp + 24 * 60 * 60 * 7
    var n7_to = newtimestamp * 1000

    db.collection("formIds").add({
      data: {
        openid: app.globalData.openId,
        formId: options.detail.formId,
        expire: new Date(n7_to),
        available: true
      }
    })

    console.log(options.detail.target.id)

    if (options.detail.target.id == "") {
      return
    }
    
    if (options.detail.target.id == "intro") {
      wx.switchTab({
        url: '/pages/volItem/volItem',
      })
    } else if (options.detail.target.id == "ai") {
      wx.navigateTo({
        url: '/pages/chat/chat',
      })
    } else if (options.detail.target.id == "jixingtopics") {
      wx.navigateTo({
        url: '/pages/tm/topics/topics',
      })
    } else if (options.detail.target.id == "diary") {
      wx.navigateTo({
        url: '/pages/tm/acronym/acronym'
      })
    } else if (options.detail.target.id == "tmIntro") {
      wx.navigateTo({
        url: '/pages/testdb/testdb?src=https://mp.weixin.qq.com/s/_G4wk0RYs2uBZfnfRt9oCg',
      })
    } else if (options.detail.target.id == "guess") {
      // this.pageScrollToBottom()
      wx.navigateTo({
        url: '/pages/reading/reading',
      })
    } else if (options.detail.target.id == "myintro") {
      wx.switchTab({
        url: '/pages/reading/reading',
      })
    } else if (options.detail.target.id == "roles") {
      this.pageScrollToBottom('#juese')
    } else if (options.detail.target.id == "DTM") {
      wx.navigateTo({
        url: '/pages/webview/webview?article=DTM',
      })
    } else if (options.detail.target.id == "checkin") {
      this.checkin()
    } else if (options.detail.target.id == "audio_6min") {
      wx.navigateTo({
        url: '/pages/audio/audio?type=6min',
      })
    } else if (options.detail.target.id == "audio_ted") {
      wx.navigateTo({
        url: '/pages/audio/audio?type=ted',
      })
    } else if (options.detail.target.id == "audio_tm") {
      wx.navigateTo({
        url: '/pages/audio/audio?type=tm',
      })
    } else if (options.detail.target.id == "tmIntro") {
      wx.switchTab({
        url: '/pages/volItem/volItem',
      })
    } else if (options.detail.target.id == "linkAccount") {
      wx.navigateTo({
        url: '/pages/testdb/testdb?src=https://mp.weixin.qq.com/s/fHPAB2m3a7iFeYsTDFpkXA',
      })
    } else if (options.detail.target.id == "value") {
      wx.navigateTo({
        url: '/pages/testdb/testdb?src=https://mp.weixin.qq.com/s/Gxe8j_cnzpNk5glPr7O93A',
      })
    } else if (options.detail.target.id == "jixing") {
      wx.navigateToMiniProgram({
        appId: 'wx4c4b54bc609bd79e',
        path: 'pages/volItem/volItem'
      })
    } else if (options.detail.target.id == "jixingku") {
      wx.navigateToMiniProgram({
        appId: 'wx4c4b54bc609bd79e',
        path: 'pages/knowledge/knowledge'
      })
    } else if (options.detail.target.id == "topics") {
      // wx.navigateToMiniProgram({
      //   appId: 'wx4c4b54bc609bd79e',
      //   path: 'pages/index/index?challenge=true'
      // })
      wx.navigateTo({
        url: '/pages/tm/jixing/jixing',
      })
    } else if (options.detail.target.id == "timertool") {
      wx.navigateTo({
        url: '/pages/tm/clock/countdown/countdown',
        success: function (res) {},
        fail: function (res) {},
        complete: function (res) {},
      })
    } else if (options.detail.target.id == "matrix") {
      wx.navigateTo({
        url: '/pages/knowledge/matrix/matrix',
      })
    } else if (options.detail.target.id == "todayaudio") {
      wx.showModal({
        content: "\"今日听力\"\n每天精选BBC Learning English 6分钟英语音频。\n适合初中级英语学习者锻炼听力，学习地道表达，以及扩充知识面。\n建议第一遍泛听，第二遍开始精听，至少听三遍以上。",
        showCancel: true,
        cancelText: '音频库',
        cancelColor: '#008B45',
        confirmText: '今日听力',
        confirmColor: '#ff7f50',
        success: function (res) {
          if (res.confirm) {
            if (that.data.todayaudio[0]['text']) {
              wx.navigateTo({
                url: '/pages/music/music?audio=' + that.data.todayaudio[0]["link"] + '&title=' + that.data.todayaudio[0]["title"] + "&todaysaudio=yes&text=https://746d-tmassistant-5275ad-1258071577.tcb.qcloud.la/" + that.data.todayaudio[0]['text'],
              })
            } else {
              wx.navigateTo({
                url: '/pages/music/music?audio=' + that.data.todayaudio[0]["link"] + '&title=' + that.data.todayaudio[0]["title"] + "&todaysaudio=yes",
              })
            }
          } else {
            wx.navigateTo({
              url: '/pages/audio/audio',
            })
          }
        },
        fail: function (res) {
          console.log(res)
        }
      })
    } else {
      var naviTo = '/pages/pathways/desc/desc?level=' + options.detail.target.id

      wx.navigateTo({
        url: naviTo,
        success: function (res) {},
        fail: function (res) {},
        complete: function (res) {},
      })
    }
  },

  change: function (options) {
    this.setData({
      currentTab: options.currentTarget.dataset.id
    })
  },

  distribution: function (options) {
    console.log(options.currentTarget.dataset.id)

    var id = options.currentTarget.dataset.id
    
    if (id == "intro") {
      wx.navigateTo({
        url: '/pages/testdb/testdb?src=https://mp.weixin.qq.com/s/_G4wk0RYs2uBZfnfRt9oCg',
      })
    } else if (id == "CC") {
      var naviTo = '/pages/pathways/desc/desc?level=6'

      wx.navigateTo({
        url: naviTo,
        success: function (res) {},
        fail: function (res) {},
        complete: function (res) {},
      })
    } else if (id == "mentor") {
      var naviTo = '/pages/pathways/desc/desc?level=0'

      wx.navigateTo({
        url: naviTo,
        success: function (res) {},
        fail: function (res) {},
        complete: function (res) {},
      })
    } else if (id == "dtm") {
      wx.navigateTo({
        url: '/pages/webview/webview?article=DTM',
      })
    } else if (id == "pathways") {
      var naviTo = '/pages/pathways/desc/desc?level=1'

      wx.navigateTo({
        url: naviTo,
        success: function (res) {},
        fail: function (res) {},
        complete: function (res) {},
      })
    } else if (id == "ai"){
      // wx.switchTab({
      //   url: '/pages/chat/chat',
      // })
      wx.navigateTo({
        url: '/pages/chat/chat',
      })
    } else if (id == "timertool"){
      wx.navigateTo({
        url: '/pages/tm/clock/countdown/countdown',
        success: function (res) {},
        fail: function (res) {},
        complete: function (res) {},
      })
    } else if (id == "jixingtopics") {
      wx.navigateTo({
        url: '/pages/tm/topics/topics',
      })
    }else if( id == "matrix" ) {
      wx.navigateTo({
        url: '/pages/knowledge/matrix/matrix',
      })
    }else if( id == "dictionary"){
      wx.navigateTo({
        url: '/pages/tm/acronym/acronym'
      })
    }else if( id == "champion"){
      wx.navigateTo({
        url: '/pages/tm/champ/champ'
      })
    }else {
      var naviTo = '/pages/webview/webview?article=' + id

      if (id == "timer") {
        naviTo = '/pages/testdb/testdb?src=https://mp.weixin.qq.com/s/8qZ35ufgvfU9Vofey9cpoA'
      } else if (id == "grammarian") {
        naviTo = '/pages/testdb/testdb?src=https://mp.weixin.qq.com/s/CgAhMmeHUhzk7ggP3bZjXQ'
      } else if (id == "ahcounter") {
        naviTo = '/pages/testdb/testdb?src=https://mp.weixin.qq.com/s/Dgxafy9C2VbD7-zof0d6CA'
      } else if (id == "host") {
        naviTo = '/pages/testdb/testdb?src=https://mp.weixin.qq.com/s/kO0vAauBvhBpe2R_H6cx9g'
      } else if (id == "ttm") {
        naviTo = '/pages/testdb/testdb?src=https://mp.weixin.qq.com/s/OCA3gVYNrwoYGKzlhBS_dw'
      } else if (id == "ge") {
        naviTo = '/pages/testdb/testdb?src=https://mp.weixin.qq.com/s/iNsBSDOgzdGRuUZBAPj5NA'
      } else if (id == "ie") {
        naviTo = '/pages/testdb/testdb?src=https://mp.weixin.qq.com/s/02os_4WjmHkPqg6_jjC1KA'
      } else if (id == "tte") {
        naviTo = '/pages/testdb/testdb?src=https://mp.weixin.qq.com/s/mn1_Sexe6RxEDoHWxKKFJw'
      } else if (id == "buildnew"){
        naviTo = '/pages/testdb/testdb?src=https://mp.weixin.qq.com/s/9T6dBxpRUF8uICz-QEWt9Q'
      } else if (id == "Speechcraft"){
        naviTo = '/pages/testdb/testdb?src=https://mp.weixin.qq.com/s/h5sfgw4pOzjwSDnBOMdvTw'
      } else if (id == "jixing") {
        naviTo = '/pages/testdb/testdb?src=https://mp.weixin.qq.com/s/cXyYOR6AAnBHmC2EU5bR1Q'
      } else if (id == "speech"){
        naviTo = '/pages/testdb/testdb?src=https://mp.weixin.qq.com/s/dM7Ipkipb7nFH4q4-8r3_A'
      } else if (id == "addr"){
        naviTo = '/pages/testdb/testdb?src=https://mp.weixin.qq.com/s/l1mAnE5LcmuGfgIckW64Yg'
      }

      wx.navigateTo({
        url: naviTo,
        success: function (res) {},
        fail: function (res) {},
        complete: function (res) {},
      })
    }
  },

  leveldesc: function (options) {
    wx.navigateTo({
      url: '/pages/webview/webview?article=membership',
    })
  },

  getPathways: function (options) {
    wx.navigateTo({
      url: '/pages/pathways/desc/desc?level=' + options.currentTarget.id,
      success: function (res) {},
      fail: function (res) {},
      complete: function (res) {},
    })
  },

  gotoGeizan: function (options) {
    // wx.navigateToMiniProgram({
    //   appId: 'wx18a2ac992306a5a4',
    //   path: 'pages/apps/largess/detail?id=LYFYxTFDv9E%3D'
    // })
    wx.previewImage({
      current: 'https://6261-backup-osmic-1258071577.tcb.qcloud.la/images/personal/zanshang.jpeg', // 当前显示图片的http链接
      urls: ["https://6261-backup-osmic-1258071577.tcb.qcloud.la/images/personal/zanshang.jpeg"] // 需要预览的图片http链接列表
    })
  },

  gotoEggs: function (options) {
    wx.navigateTo({
      url: "/pages/tm/eggs/eggs",
    })
  },

  getToNavi: function (options) {
    console.log(options)

    var naviTo = '/pages/webview/webview?article=' + options.currentTarget.id

    wx.navigateTo({
      url: naviTo,
      success: function (res) {},
      fail: function (res) {},
      complete: function (res) {},
    })
  },

  navigateTo: function (options) {
    wx.navigateTo({
      url: options.currentTarget.id
    })
  },

  navigateToHequn: function () {
    wx.navigateToMiniProgram({
      appId: 'wx018f0c4c2a1ee727',
      path: 'pages/group-detail/index?groupid=16287827559774652520'
    })
  },

  getRoles: function (options) {
    console.log(options.detail.formId)

    var timestamp = Date.parse(new Date()) / 1000
    var newtimestamp = timestamp + 24 * 60 * 60 * 7
    var n7_to = newtimestamp * 1000

    db.collection("formIds").add({
      data: {
        openid: app.globalData.openId,
        formId: options.detail.formId,
        expire: new Date(n7_to),
        available: true
      }
    })

    var naviTo = '/pages/webview/webview?article=' + options.detail.target.id

    if (options.detail.target.id == "timer") {
      naviTo = '/pages/testdb/testdb?src=https://mp.weixin.qq.com/s/8qZ35ufgvfU9Vofey9cpoA'
    } else if (options.detail.target.id == "grammarian") {
      naviTo = '/pages/testdb/testdb?src=https://mp.weixin.qq.com/s/CgAhMmeHUhzk7ggP3bZjXQ'
    } else if (options.detail.target.id == "ahcounter") {
      naviTo = '/pages/testdb/testdb?src=https://mp.weixin.qq.com/s/Dgxafy9C2VbD7-zof0d6CA'
    } else if (options.detail.target.id == "tm") {
      naviTo = '/pages/testdb/testdb?src=https://mp.weixin.qq.com/s/kO0vAauBvhBpe2R_H6cx9g'
    } else if (options.detail.target.id == "ttm") {
      naviTo = '/pages/testdb/testdb?src=https://mp.weixin.qq.com/s/OCA3gVYNrwoYGKzlhBS_dw'
    } else if (options.detail.target.id == "ge") {
      naviTo = '/pages/testdb/testdb?src=https://mp.weixin.qq.com/s/iNsBSDOgzdGRuUZBAPj5NA'
    } else if (options.detail.target.id == "ie") {
      naviTo = '/pages/testdb/testdb?src=https://mp.weixin.qq.com/s/02os_4WjmHkPqg6_jjC1KA'
    } else if (options.detail.target.id == "tte") {
      naviTo = '/pages/testdb/testdb?src=https://mp.weixin.qq.com/s/mn1_Sexe6RxEDoHWxKKFJw'
    } else if (options.detail.target.id == "SAA1") {
      naviTo = '/pages/testdb/testdb?src=https://mp.weixin.qq.com/s/02os_4WjmHkPqg6_jjC1KA'
    }

    wx.navigateTo({
      url: naviTo,
      success: function (res) {},
      fail: function (res) {},
      complete: function (res) {},
    })
  },

  getTool: function (options) {
    var timestamp = Date.parse(new Date()) / 1000
    var newtimestamp = timestamp + 24 * 60 * 60 * 7
    var n7_to = newtimestamp * 1000

    db.collection("formIds").add({
      data: {
        openid: app.globalData.openId,
        formId: options.detail.formId,
        expire: new Date(n7_to),
        available: true
      }
    })

    if (options.detail.target.id == "timertool") {
      wx.navigateTo({
        url: '/pages/tm/clock/countdown/countdown',
        success: function (res) {},
        fail: function (res) {},
        complete: function (res) {},
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

  getArticle: function (options) {
    console.log(options.detail.formId)

    var timestamp = Date.parse(new Date()) / 1000
    var newtimestamp = timestamp + 24 * 60 * 60 * 7
    var n7_to = newtimestamp * 1000

    db.collection("formIds").add({
      data: {
        openid: app.globalData.openId,
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
      util.dashang()
    }
  },

  dashang: function (e) {
    util.dashang()
  },

  toBilingualSpeak: function (e) {
    wx.navigateToMiniProgram({
      appId: 'wx4c4b54bc609bd79e'
    })
  },

  saveOfficialQRCode: function (e) {
    wx.navigateTo({
      url: '/pages/testdb/testdb?src=https://mp.weixin.qq.com/s/uybVCD6KfKgSoCq0Jo4g_A',
    })
  },

  tmIntro: function (options) {

  },

  onTabItemTap(){
    let pages = getCurrentPages()
    
    if(this.data.isTop){
      // this.pageScrollToBottom('#cards')
      this.pageScrollToBottom('#articles')
      this.setData({
        isTop: false
      })
    }else{
      this.pageScrollToBottom('#top')
      this.setData({
        isTop: true
      })
    }
  },

  checkin: function (options) {
    var that = this
    var checkin_today_total = 0
    db.collection("checkin").where({
      date: util.formatTime(new Date())
    }).count({
      success: function (res) {
        console.log(res.total)
        // that.setData({
        //   checkin_today_total: res.total
        // })
        checkin_today_total = res.total
        // wx.cloud.callFunction({
        //   name: "getOpenid",
        //   success: res => {
        // that.setData({
        //   openId: app.globalData.openId
        // })
        // var openid = res.result.openid
        db.collection("checkin").where({
          openid: app.globalData.openId
        }).get({
          success: function (res) {
            console.log(res.data)
            //之前从来没有签到过
            if (res.data.length == 0) {
              db.collection('checkin').add({
                data: ({
                  checkin: 1,
                  date: util.formatTime(new Date()),
                  openid: app.globalData.openId,
                  created_at: util.formatTime(new Date())
                }),
                success: function () {
                  app.globalData.jifen = app.globalData.jifen + 10
                  wx.showModal({
                    content: "恭喜你发现了隐藏签到处！更多惊喜正在路上，明天继续来签到吧！今日积分: +10 ",
                    showCancel: false,
                    // confirmText: '',
                    confirmColor: '#ff7f50',
                    success: function (res) {
                      if (res.confirm) {}
                    }
                  })
                }
              })
            } else {
              if (res.data[0].date == util.formatTime(new Date())) {
                //今天已经签到过
                wx.showModal({
                  content: "今天已打卡, 你已经打卡过" + res.data[0].checkin + "次, 明天再来打卡~\n今日积分10已加\n今天已经有" + checkin_today_total + "人打卡了~",
                  showCancel: false,
                  // cancelText: '今日听力',
                  // cancelColor: '#008B45',
                  // confirmText: '',
                  confirmColor: '#ff7f50',
                  success: function (res) {
                    if (res.confirm) {
                      console.log("confirm")
                    }
                  },
                  fail: function (res) {
                    console.log(res)
                  }
                })
              } else {
                //今天第一次签到
                db.collection('checkin').doc(res.data[0]._id).update({
                  data: {
                    checkin: db.command.inc(1),
                    date: util.formatTime(new Date())
                  },
                  success: res1 => {
                    app.globalData.jifen = app.globalData.jifen + 10
                    wx.showModal({
                      content: "打卡成功！这是你的第" + (res.data[0].checkin + 1) + "次打卡, 今日积分: +10 || 你是今天第" + (checkin_today_total + 1) + "位打卡者~",
                      showCancel: false,
                      // cancelText: '今日听力',
                      // cancelColor: '#008B45',
                      // confirmText: '',
                      confirmColor: '#ff7f50',
                      success: function (res) {
                        if (res.confirm) {
                          console.log("confirm")
                        }
                      }
                    })
                  }
                })
              }
            } //数据库已经有对应人的信息
          },
          fail: function (e) {
            console.log("fail")
          }
        })
        //   }
        // })
      }
    })
  },

  // 获取容器高度，使页面滚动到容器底部
  pageScrollToBottom: function (tag) {
    wx.createSelectorQuery().select(tag).boundingClientRect(
      function (rect) {
        // 使页面滚动到底部
        if(rect){
          wx.pageScrollTo({
            scrollTop: rect.top
          })
        }
      }
    ).exec()
  },

  scrollToTop: function() {
    this.pageScrollToBottom('#top')
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    wx.showShareMenu({
      // shareTicket 是获取转发目标群信息的票据，只有拥有 shareTicket 才能拿到群信息，用户每次转发都会生成对应唯一的shareTicket 。
      withShareTicket: true,
      menus: ['shareAppMessage', 'shareTimeline']
    })

    this.setData({
      banner_height: 220 / wx.getSystemInfoSync().windowHeight * 110
    })

    if (options.roles) {
      this.pageScrollToBottom()
    }

    this.getArticles()
  },

  onPageScroll: function(ev) {
    var that = this
    wx.createSelectorQuery().select("#top").boundingClientRect(
      function (res) {
        // 避免线上报错 Cannot read property 'top' of null
        if(res){
          let top = res.top
          // console.log("距离顶部：" + top)
          if(top < -600){
            that.setData({
              upflag: true
            })
          }

          if(top > -600){
            that.setData({
              upflag: false
            })
          }
        }
      }
    ).exec()
  },

  changetype: function(options) {
    this.setData({
      currentId: options.currentTarget.id
    })

    var that = this

    var type = undefined
    if (that.data.currentId != "all") {
      type = that.data.currentId
    }

    wx.cloud.callFunction({
      name: "getYouLike",
      data: {
        type: type
      },
      success: function (res) {
        console.log(res.result)
        that.setData({
          // guessYouLike: e.data.reverse()
          guessYouLike: res.result.data.reverse()
        })
        wx.hideLoading()
      }
    })
  },

  getArticles: function (e) {
    // this.setData({
    //   type: options.type
    // })

    var that = this 

    //在首页不需要加载提示
    // wx.showLoading({
    //   title: '精彩马上呈现',
    // })

    db.collection("information").doc("config").get({
      success: function(res){
        console.log(res.data["reading"])
        that.setData({
          currentId: res.data["default"],
          types: res.data["reading"],
          isChecking: res.data["isChecking"]
        })

        if(that.data.isChecking){
          that.setData({
            currentId: "speaking"
          })
        }

        var select_type = ""
        if(that.data.currentId != "all"){
          select_type = that.data.currentId
        }

        wx.cloud.callFunction({
          name: "getYouLike", 
          data: {
            type: select_type
          },
          success: function(res){
            console.log(res.result)
            that.setData({
              guessYouLike: res.result.data.reverse()
            })
            // 在首页不需要加载提示
            wx.hideLoading()
          }
        })
      }
    })
  },

  updatePersonalInfo: function () {
    var that = this
    wx.cloud.callFunction({
      name: 'getPersonalInfo',
      success: res => {

        if (res.result.data[0] && res.result.data[0]["eggs"]) {
          that.setData({
            eggs: res.result.data[0]["eggs"]
          })
        }

        if (res.result.data.length == 0) {
          that.setData({
            level: "青铜"
          })
        } else {
          var level_set = "布衣"
          var score = res.result.data[0].checkin * 10
          if (res.result.data[0]["rewardedvideo"]) {
            score = res.result.data[0].rewardedvideo * 10
          }
          if (score < 100) {} else if (score < 200) {
            level_set = "黑铁"
          } else if (score < 400) {
            level_set = "青铜"
          } else if (score < 800) {
            level_set = "白银"
          } else if (score < 1200) {
            level_set = "黄金"
          } else if (score < 2000) {
            level_set = "铂金"
          } else if (score < 4000) {
            level_set = "钻石"
          } else if (score < 7000) {
            level_set = "闪烁"
          } else if (score < 10000) {
            level_set = "星耀"
          } else if (score < 20000) {
            level_set = "大师"
          } else if (score < 30000) {
            level_set = "王者"
            // 这里100000只是个虚数，并无实际含义
          } else if (score < 100000) {
            level_set = "荣耀"
          } else {
            console.log("不在范围内")
          }
          that.setData({
            level: level_set
          })
        }
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
    this.updatePersonalInfo()
    this.setData({
      isTop: false
    })
  },

  // scrolltxt: function() {
  //   var that = this;
  //   var length = that.data.length; //滚动文字的宽度
  //   var windowWidth = that.data.windowWidth; //屏幕宽度
  //   if (length > windowWidth) {
  //     var interval = setInterval(function() {
  //       var maxscrollwidth = length + that.data.marquee_margin; //滚动的最大宽度，文字宽度+间距，如果需要一行文字滚完后再显示第二行可以修改marquee_margin值等于windowWidth即可
  //       var crentleft = that.data.marqueeDistance;
  //       if (crentleft < maxscrollwidth) { //判断是否滚动到最大宽度
  //         that.setData({
  //           marqueeDistance: crentleft + that.data.marqueePace
  //         })
  //       } else {
  //         //console.log("替换");
  //         that.setData({
  //           marqueeDistance: 0 // 直接重新滚动
  //         });
  //         clearInterval(interval);
  //         that.scrolltxt();
  //       }
  //     }, that.data.interval);
  //   } else {
  //     that.setData({
  //       marquee_margin: "1000"
  //     }); //只显示一条不滚动右边间距加大，防止重复显示
  //   }
  // },

  egg: function (options) {
    var isShow = false;

    if (options.currentTarget["dataset"].id == "egg1") {
      //彩蛋已经打开, 标记为egg1
      if (this.data.eggs["egg1"]) {
        wx.navigateTo({
          url: "/pages/volItem/volItem",
        })
      } else {
        isShow = true
      }
    } else if (options.currentTarget["dataset"].id == "egg3") {
      //彩蛋已经打开, 标记为egg3
      if (this.data.eggs["egg3"]) {
        wx.showModal({
          title: '空彩蛋',
          showCancel: false,
          content: '这个彩蛋的惊喜之处就在于，它是个空彩蛋！！！惊不惊喜，意不意外\n（我知道你很想扁我）',
          confirmText: '还能咋办',
          confirmColor: '#ff7f50',
          success: function (res) {

          }
        })
      } else {
        isShow = true
      }
    } else if (options.currentTarget["dataset"].id == "egg2") {
      //彩蛋已经打开, 标记为egg2
      if (this.data.eggs["egg2"]) {
        wx.navigateTo({
          url: '/pages/tm/acronym/acronym',
        })
      } else {
        isShow = true
      }
    }

    if (isShow) {
      //彩蛋还未打开，给提示是否打开
      var that = this

      wx.showModal({
        title: '解锁彩蛋',
        content: '观看激励广告解锁此彩蛋，一旦解锁永久有效；\n打开彩蛋，后果自负，概不负责。',
        cancelText: '我就不',
        confirmText: '立即解锁',
        confirmColor: '#ff7f50',
        success: function (res) {
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
                console.log(status)
                if (status && status.isEnded || status === undefined) {
                  if (!videoAd) return
                  videoAd.offClose()
                  // 正常播放结束，下发奖励
                  // continue you code

                  let new_eggs = that.data.eggs

                  if (options.currentTarget["dataset"].id) {
                    new_eggs[options.currentTarget["dataset"].id] = true
                  }

                  that.setData({
                    eggs: new_eggs
                  })

                  console.log("openId: " + app.globalData.openId)
                  db.collection('checkin').where({
                    openid: app.globalData.openId
                  }).get({
                    success: function (res) {
                      if (res.data.length == 0) {
                        console.log(res)
                        // 未有过记录
                        db.collection('checkin').add({
                          data: ({
                            checkin: 0,
                            openid: app.globalData.openId,
                            created_at: util.formatTime(new Date()),
                            rewardedvideo: 0,
                            eggs: new_eggs
                          }),
                        })
                      } else {
                        // 已有记录
                        db.collection('checkin').doc(res.data[0]._id).update({
                          data: {
                            // egg: db.command.push(options.currentTarget["dataset"].id)
                            eggs: new_eggs
                          },
                          success: res => {
                            console.log(res)
                            videoAd.offClose(res => {
                              console.log("关闭")
                            })
                          }
                        })
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

      wx.showModal({
        content: "观看激励广告解锁此彩蛋，一旦解锁永久有效；无论彩蛋内容如何，概不接受意见。",
        showCancel: true,
        cancelText: '不，我忍得住',
        confirmText: '立即解锁',
        confirmColor: '#ff7f50',
        success: function (res) {
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
                  // 正常播放结束，下发奖励
                  // continue you code
                  wx.navigateTo({
                    url: '/pages/volItem/volItem',
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
    }
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

  onShareAppMessage: function (res) {
    return {
      title: '演讲一站式服务, 最好的演讲类小程序，学演讲，你用得上！',
      imageUrl: '/images/homepage2-min.jpeg'
    }
  },

  onShareTimeline: function (res) {
    return {
      title: '演讲一站式服务, 最好的演讲类小程序，学演讲，你用得上！',
      imageUrl: '/images/homepage2-min.jpeg'
    }
  }
})
