// index.js
// 获取应用实例
const app = getApp()
// 定义全局变量，用于接收选择的图片
var tempFilePaths
var util = require("../../../utils/util.js")
var describe
var reporter
var key
var IssueId
// var env = app.config["env"]
// var dailyUrl = app.config[env]["url"]
// var infoPath = app.config[env]["infoPath"]
// var createPath = app.config[env]["createPath"]
var ownerData = app.ownerData
var imageUrl = ""

Page({
  data: {
    dept: app.dept,
    project: app.project,
    userInfo: {},
    hasUserInfo: false,
    toast1Hidden: true,
    modalHidden: true,
    modalHidden2: true,
    show: true,
    files: [],
    tempFilePaths: [],
    resInfo: {},
    isOpen: "open",
    items: [
      { name: 'open', value: '公开', checked: 'true' },
      { name: 'private', value: '私藏' }
    ]
  },

  radioChange: function (e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value)
    this.setData({
      isOpen: e.detail.value
    })
  },

  toast1Change: function (e) {
    this.setData({ toast1Hidden: true })
  },
  modalTap: function (e) {
    console.log("进行选择")
    this.setData({
      modalHidden: false
    })
  },
  modalTap2: function (e) {
    this.setData({
      modalHidden2: false
    })
  },
  modalChange2: function (e) {
    this.setData({
      modalHidden2: true,
      tempFilePaths: []
    })
  },

  cancel_one: function (e) {
    console.log("取消")
    console.log(e)
    this.setData({
      modalHidden: true,
      toast1Hidden: false,
      notice_str: '取消成功'
    })
  },

  // 描述
  bindDesInput: function (e) {
    describe = e.detail.value
  },

  bindReportInput: function (e) {
    reporter = e.detail.value
  },

  // submitInfo: function (res) {
  //   var that = this
  //   console.log("触发上报")
  //   console.log(app.upload2)

  //   console.log("imageUrl begin: " + imageUrl)
  //   //that.upload1()
  //   //必须等到upload1完成

  //   app.upload2['image'] = imageUrl
  //   console.log("imageUrl end: " + imageUrl)

  //   wx.request({
  //     url: dailyUrl + createPath,
  //     data: app.upload2,
  //     method: "POST",
  //     success: function (res) {
  //       console.log(res.data)
  //       console.log(res.data["key"])
  //       key = res.data["key"]
  //       IssueId = res.data["id"]
  //       // that.modalTap()
  //     }
  //   })
  // },

  //选择图片附件后，按下提交按钮
  formSubmit: function (e) {
    var isSubmit = false
    var that = this
    wx.showModal({
      title: '提交',
      content: '确认提交吗？',
      success: (res) => {
        if (res.confirm) {
          console.log('已确定')

          //图片路径保存在 uploadImg 
          //that.uploadImg(0)

          console.log("describe")
          console.log(describe)
          wx.getUserInfo({
            success: function (res) {
              var userInfo = res.userInfo
              var nickName = userInfo.nickName
              var avatarUrl = userInfo.avatarUrl
              var gender = userInfo.gender //性别 0：未知、1：男、2：女
              var province = userInfo.province
              var city = userInfo.city
              var country = userInfo.country

              console.log(nickName)
              console.log(avatarUrl)

              that.setData({
                nickName: nickName,
                avatarUrl: avatarUrl
              })

              console.log(describe)
              that.uploadImg(0)
              
              console.log(imageUrl)
              isSubmit = true
            }
          })

          console.log(imageUrl)
          console.log("触发了formSubmit")
          // this.modalTap(e)
          // if (isSubmit) {
          //   wx.showToast({
          //     title: '提交成功',
          //     icon: 'none',
          //     duration: 1200
          //   })
          // } else {
          //   wx.showToast({
          //     title: '提交失败，请确认信息均已填写完整',
          //     icon: 'none',
          //     duration: 2000
          //   })
          // }
        } else {
          console.log('已取消')
        }

      }
    })

  },

  uploadImg: function (i) {
    var that = this

    const db = wx.cloud.database({
      env: "tmassistant-5275ad"
    })

    if (that.data.tempFilePaths.length != 0) {

      //路径：that.data.tempFilePaths[i],
      console.log("wx.uploadFile")

      wx.cloud.uploadFile({
      // 指定上传到的云路径
        cloudPath: 'upload/' + this.createTimeStamp() + ".jpg",
      // 指定要上传的文件的小程序临时文件路径
        filePath: that.data.tempFilePaths[0],
      // 成功回调
      success: res => {
        console.log('上传成功', res)
        console.log(res.fileID)
        this.setData({
          imageUrl: res.fileID
        })
        //插入
        db.collection('posts').add({
          // data 字段表示需新增的 JSON 数据
          data: {
            avatarUrl: that.data.avatarUrl,
            // create_time: util.formatTime(new Date()),
            create_time: new Date(),
            imageUrl: that.data.imageUrl,
            text: describe,
            nickName: that.data.nickName,
            isOpen: that.data.isOpen
          },
          success: function (res) {
            console.log("结束了" + res)
            wx.navigateBack({

            })
          }
        })
      }
      })
    } else if(describe != undefined){
      //插入
      db.collection('posts').add({
        // data 字段表示需新增的 JSON 数据
        data: {
          avatarUrl: that.data.avatarUrl,
          create_time: new Date(),
          imageUrl: that.data.imageUrl,
          text: describe,
          nickName: that.data.nickName,
          isOpen: that.data.isOpen
        },
        success: function (res) {
          console.log("结束了" + res)
          wx.navigateBack({

          })
        }
      })
    }

    // wx.uploadFile({
    //   // vip线上和日常的格式不同，此处写死线上
    //   url: 'https://media.api.weidian.com/upload/v2/direct?scope=bulbul&fileType=image',
    //   header: {
    //     "Content-Type": "multipart/form-data",
    //     "Origin": 'http://h5.weidian.com'
    //   },
    //   formData: {
    //     uploadId: new Date().getTime()
    //   },
    //   filePath: that.data.tempFilePaths[i],
    //   name: 'file', // 这里根据自己的实际情况改
    //   success: resp => {
    //     console.log(resp)
    //     console.log(i)
    //     var cdnAddress = (JSON.parse(resp.data).result.url).substring(2);
    //     console.log("cdnAddress值为：", cdnAddress)
    //     cdnAddress = "https://" + cdnAddress;
    //     if (i == 0) {
    //       imageUrl = cdnAddress;
    //     }
    //     else {
    //       //多个图片上传的时候，地址累加
    //       imageUrl = imageUrl + "," + cdnAddress;
    //     }
    //     console.log("imageUrl: " + imageUrl)
    //   },
    //   fail: res => {
    //     console.log('fail:' + i)
    //   },
    //   complete: () => {
    //     i++ // 这个图片执行完上传后，开始上传下一张

    //     console.log("多个图片: " + imageUrl)
    //     if (i == that.data.tempFilePaths.length) {
    //       console.log('执行完毕')
    //       that.submitInfo(that.data.res)
    //       // console.log('成功：' + success + ' 失败：' + fail)
    //     } else {
    //       // 若图片还没有传完，则继续调用函数
    //       console.log(i)
    //       that.uploadImg(i)
    //     }
    //   }
    // })
  },

  createTimeStamp: function () {
    return parseInt(new Date().getTime() / 1000) + ''
  },

  formReset: function () {
    console.log('form发生了reset事件')
    this.modalTap2()
  },

  // 事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },

  onLoad: function (options) {
    console.log("options: " + options.key)
    console.log("e.detail.userInfo: " + app.globalData.userInfo)

    if (app.globalData.userInfo) {
      console.log("I'm in!")
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
      console.log(this.userInfo)
      console.log(this.dict)
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },

  chooseImage: function (e) {
    var that = this;
    wx.chooseImage({
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        console.log("res.tempFilePaths: " + res.tempFilePaths)
        that.setData({
          tempFilePaths: that.data.tempFilePaths.concat(res.tempFilePaths)
        });
        for (var index in that.data.tempFilePaths) {
          console.log(that.data.tempFilePaths[index]);
        }
        console.log("choose image end")
        console.log("tempFilePaths: " + that.data.tempFilePaths)
      }
    })
    console.log("chooseImage")
    // wx.chooseImage({
    //   success: chooseResult => {
    //     // that.setData({
    //     //   tempFilePaths: that.data.tempFilePaths.concat(res.tempFilePaths)
    //     // })
    //     // 将图片上传至云存储空间
    //     wx.cloud.uploadFile({
    //       // 指定上传到的云路径
    //       cloudPath: 'my-photo1.png',
    //       // 指定要上传的文件的小程序临时文件路径
    //       filePath: chooseResult.tempFilePaths[0],
    //       // 成功回调
    //       success: res => {
    //         console.log('上传成功', res)
    //       },
    //     })
    //   },
    // })
  },

  previewImage: function (e) {
    wx.previewImage({
      current: e.currentTarget.id, // 当前显示图片的http链接
      urls: this.data.tempFilePaths // 需要预览的图片http链接列表
    })
  },
  
  getUserInfo: function (e) {
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})