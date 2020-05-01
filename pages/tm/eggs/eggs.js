// pages/tm/eggs/eggs.js
const app = getApp()
const db = wx.cloud.database({
  env: "tmassistant-5275ad"
})

Page({

  /**
   * 页面的初始数据
   */
  data: {
    eggs: {
      "egg1": false, 
      "egg2": false, 
      "egg3": false
    },
    top_icons: ["003-cop.png", "004-judge.png", "007-detective.png", "010-eyewitness.png", "023-gavel.png"]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    db.collection("checkin").where({
      openid: app.globalData.openId
    }).get({
      success: function (res) {
        // let eggs_new = res.data[0]["eggs"]
        //console.log(eggs_new.keySet())
        if (res.data[0]["eggs"]) {
          // if (res.data[0]["eggs"]["egg1"]) {
          //   eggs_new["egg1"] = true
          // }

          // if (res.data[0]["eggs"]["egg2"]) {
          //   eggs_new["egg2"] = true
          // }

          // if (res.data[0]["eggs"]["egg3"]) {
          //   eggs_new["egg3"] = true
          // }

          that.setData({
            eggs: res.data[0]["eggs"]
          })
        }
      }
    })
  },

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
              videoAd.onLoad(() => { })
              videoAd.onError((err) => { })
              videoAd.onClose((status) => {
                console.log(status)
                if (status && status.isEnded || status === undefined) {
                  if (!videoAd) return
                  videoAd.offClose()
                  // 正常播放结束，下发奖励
                  // continue you code

                  let new_eggs = that.data.eggs
                  
                  // if (options.currentTarget["dataset"].id == "egg1") {
                  //   new_eggs["egg1"] = true;
                  // } else if (options.currentTarget["dataset"].id == "egg2") {
                  //   new_eggs["egg2"] = true;
                  // } else if (options.currentTarget["dataset"].id == "egg3") {
                  //   new_eggs["egg3"] = true;
                  // }

                  if (options.currentTarget["dataset"].id){
                    new_eggs[options.currentTarget["dataset"].id] = true
                  }

                  that.setData({
                    eggs: new_eggs
                  })

                  console.log(new_eggs)
                  console.log("openId: " + app.globalData.openId)
                  db.collection('checkin').where({
                    openid: app.globalData.openId
                  }).update({
                    data: {
                      eggs: new_eggs
                    },
                    success: function (res) {
                      console.log(res)
                      videoAd.offClose(res => {
                        console.log("关闭")
                      })
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

      // wx.showModal({
      //   content: "观看激励广告解锁此彩蛋，一旦解锁永久有效；无论彩蛋内容如何，概不接受意见。",
      //   showCancel: true,
      //   cancelText: '不，我忍得住',
      //   confirmText: '立即解锁',
      //   confirmColor: '#ff7f50',
      //   success: function (res) {
      //     if (res.confirm) {
      //       // 在页面中定义激励视频广告
      //       let videoAd = null

      //       // 在页面onLoad回调事件中创建激励视频广告实例
      //       if (wx.createRewardedVideoAd) {
      //         videoAd = wx.createRewardedVideoAd({
      //           adUnitId: 'adunit-83fb3cf4237d8f94'
      //         })
      //         videoAd.onLoad(() => { })
      //         videoAd.onError((err) => { })
      //         videoAd.onClose((status) => {
      //           if (status && status.isEnded || status === undefined) {
      //             // 正常播放结束，下发奖励
      //             // continue you code
      //             wx.navigateTo({
      //               url: '/pages/volItem/volItem',
      //             })
      //           } else {
      //             // 播放中途退出，进行提示
      //           }
      //         })
      //       }

      //       // 用户触发广告后，显示激励视频广告
      //       if (videoAd) {
      //         videoAd.show().catch(() => {
      //           // 失败重试
      //           videoAd.load()
      //             .then(() => videoAd.show())
      //             .catch(err => {
      //               console.log('激励视频 广告显示失败')
      //             })
      //         })
      //       }
      //     }
      //   }
      // })
    }
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
  onShareAppMessage: function () {

  }
})