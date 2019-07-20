//app.js

const utils = require('./utils/util.js')

var App = require('./utils/xmadx_sdk.min.js').xmad(App,'App').xmApp;

App({
  articles: require('./data/articles/articles'),
  CC: require('./data/CC'),
  Paths: require('./data/Paths'),
  vols: require('./data/vols'),
  vols_pws: require('./data/vols_pws'),
  divideByPath: require('./data/divideByPath'),

  globalData: {
    userInfo: null,
    open_posts: [],
    activity_posts: [],
    private_posts: [],
    history: [],
    globalbgAudioIsPlay: false 
  },

  onLaunch: function () {

    wx.cloud.init({
      traceUser: true,
      env: 'tmassistant-5275ad'
    })

    // 获取用户信息
    // wx.getSetting({
    //   success: res => {
    //     if (res.authSetting['scope.userInfo']) {
    //       // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
    //       wx.getUserInfo({
    //         success: res => {
    //           // 可以将 res 发送给后台解码出 unionId
    //           this.globalData.userInfo = res.userInfo

    //           // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
    //           // 所以此处加入 callback 以防止这种情况
    //           if (this.userInfoReadyCallback) {
    //             this.userInfoReadyCallback(res)
    //           }
    //         }
    //       })
    //     }
    //   }
    // })
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
