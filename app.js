//app.js

const utils = require('./utils/util.js')

var App = require('./utils/xmadx_sdk.min.js').xmad(App,'App').xmApp;

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
