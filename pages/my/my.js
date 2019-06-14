// pages/my/my.js

var Page = require('../../utils/xmadx_sdk.min.js').xmad(Page).xmPage;

Page({

  /**
   * 页面的初始数据
   */
  data: {
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
      data: "Copyright © 2018-2019 jinbin"
    },
    extraData: {
      id: "43654",
      // 自定义参数，具体参考文档
      customData: {
        clientInfo: '',
        imei: ''
      }
    },
    components: [
      // {
      //   title: '关于头马助手',
      //   remark: '关于头马助手',
      //   url: '/pages/index/index',
      // },
      // {
      //   title: '认识作者',
      //   remark: '认识作者',
      //   url: '/pages/contact/contact',
      // },
      // {
      //   title: '关于头马助手',
      //   remark: '关于头马助手',
      //   url: '/pages/webview/webview?article=toumazhushou'
      // },
      // },
      // {
      //   title: '更新记录',
      //   remark: '更新记录',
      //   url: '/pages/article/article?id=updates',
      // },
    ]
  },

  onShow: function(options) {

    wx.cloud.callFunction({
      name: "isOwner",
      complete: owner_res => {
        wx.cloud.callFunction({
          name: 'getOpenid',
          complete: res => {
            //牛逼哄哄的作者openid
            for (var index in owner_res.result.data.owners) {
              if (res.result.openid == owner_res.result.data.owners[index]) {
                this.setData({
                  isOwner: true
                })
              }
            }
          }
        })
      }
    })

    ///isLogin
    // var that = this
    // wx.getSetting({
    //   success: res => {
    //     if (res.authSetting['scope.userInfo']) {
    //       console.log("true")
    //       that.setData({
    //         isLogin: "已登录"
    //       })
    //     } else {
    //       console.log("false")
    //       that.setData({
    //         isLogin: "登录了解更多"
    //       })
    //     }
    //   }
    // })
  },

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
      content: "关联步骤\n1. 登录微信公众号\n2. 小程序管理->添加\n3. 验证并关联小程序\n4. 输入小程序AppID\n5. 点击确认即可",
      showCancel: true,
      confirmText: 'AppID',
      confirmColor: '#ff7f50',
      success: function(res) {
        if (res.confirm) {
          wx.setClipboardData({
            data: "wx16c76d4762cbe0b3",
            success: function(res) {
              wx.showToast({
                title: "AppID复制成功"
              })
            }
          })
          console.log('用户点击确定');
        }
      }
    })
  },

  saveOfficialQRCode: function(e) {
    wx.showModal({
      content: '搜索"头马助手", 关注官方公众号, 回复"福利"有惊喜！',
      showCancel: false,
      confirmText: '去关注',
      confirmColor: '#ff7f50',
      success: function(res) {
        if (res.confirm) {
          wx.setClipboardData({
            data: "头马助手 Toastmasters Assistant",
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
              // wx.getSetting({
              //   success(res) {
              //     if(!res.authSetting["scope.writePhotosAlbum"]){
              //       wx.openSetting({})
              //     }
              //   }
              // })
              // wx.openSetting({
              //   success(res) {
              //     console.log("open Setting success")
              //     console.log(res)
              //   },
              //   fail(res) {
              //     console.log("open Setting fail")
              //     console.log(res)
              //   }
              // })
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

  },

  fromPageFt: function() {
    wx.navigateToMiniProgram({
      appId: this.data.tt_appId
    })
  }
})