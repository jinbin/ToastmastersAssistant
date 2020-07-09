//app.js

const utils = require('./utils/util.js')

var plugin = requirePlugin("chatbot")

//var App = require('./utils/xmadx_sdk.min.js').xmad(App,'App').xmApp;

App({
  articles: require('./data/articles/articles'),
  CC: require('./data/CC'),
  Paths: require('./data/Paths'),
  vols: require('./data/vols'),
  jokes: require('./data/jokes.js'),
  vols_pws: require('./data/vols_pws'),
  divideByPath: require('./data/divideByPath'),
  acronym: require('./data/acronym.js'),

  globalData: {
    userInfo: null,
    open_posts: [],
    activity_posts: [],
    private_posts: [],
    history: [],
    jifen: 0,
    openId: null
  },

  onLaunch: function () {

    var that = this
    wx.cloud.init({
      traceUser: true,
      env: 'tmassistant-5275ad'
    })

    wx.cloud.callFunction({
      name: "getOpenid",
      success: res => {
        that.globalData.openId = res.result.openid

        plugin.init({
          appid: "ufLBZImYnD8DsHC9gTYtCxeECCgFIP", //小程序示例账户，仅供学习和参考
          openid: res.result.openid,//用户的openid，改为必填了
          success: () => {}, //非必填
          fail: error => {}, //非必填
          textToSpeech: true,
          guideList: ["头马", "演讲", "主席", "时间官", "哼哈官", "语法官", "教育副主席", "会员副主席", "冠军", "Pathways", "教育路径", "DTM", "主持人", "即兴主持", "个人评估", "总评", "缩略词", "公众号"],
          historySize: 20,
          robotHeader: 'https://746d-tmassistant-5275ad-1258071577.tcb.qcloud.la/images/myface_round.png',
          userHeader: 'https://res.wx.qq.com/mmspraiweb_node/dist/static/miniprogrampageImages/talk/rightHeader.png',
          operateCardHeight: 60,
          guideCardHeight: 40,
          navHeight: 0,
          // welcomeImage: "cloud://tmassistant-5275ad.746d-tmassistant-5275ad-1258071577/images/posters/robot_banner_900x600-min.png",
          // defaultWheel: "single"
        })
      }
    })
  },

  // 权限询问
  getRecordAuth: function () {
    wx.getSetting({
      success(res) {
        console.log("succ")
        console.log(res)
        if (!res.authSetting['scope.record']) {
          wx.authorize({
            scope: 'scope.record',
            success() {
              // 用户已经同意小程序使用录音功能，后续调用 wx.startRecord 接口不会弹窗询问
              console.log("succ auth")
            }, fail() {
              console.log("fail auth")
            }
          })
        } else {
          console.log("record has been authed")
        }
      }, fail(res) {
        console.log("fail")
        console.log(res)
      }
    })
  }
})
