// pages/map.js

const app = getApp()

Page({
  data: {
    array: ['西子双语演讲俱乐部'],
    index: 0,
    markers: [{
      iconPath: "/images/location.png",
      id: 0,
      latitude: 30.2839508306,
      longitude: 120.1367318630,
      title: '西子双语演讲俱乐部',
      label: { 
        content: "点击进入导航页", 
        color: "#ff0000", 
        fontSize: 25,   
        borderRadius: "10", 
        padding: "20",       
        display:"ALWAYS" 
      }
    }],
  },

  onLoad: function (e) {
    const db = wx.cloud.database({
      env: "tmassistant-5275ad"
    })
    const clubs = db.collection('clubs').doc('westlake').get({
      success: function (res) {
        console.log(res.data.location.longitude)
        this.setData({
          longitude: res.data.location.longitude,
          latitude: res.data.location.latitude
        })
      }
    })
  },

  onReady: function (e) {
    this.mapCtx = wx.createMapContext('myMap')
  },

  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },

  copyText: function (e) {
    wx.setClipboardData({
      data: e.currentTarget.dataset.text,
      success: function (res) {
        wx.showToast({
          title: "内容已复制"
        })
      }
    })
  },
    
  intoMap: function () {
      wx.openLocation({
        latitude: 30.2839508306,
        longitude: 120.1367318630,
        name: "西子双语演讲俱乐部",
        address: "文二路188号（文二路和教工路交叉口）浙江省团校内 浙江青年创业学院教学楼202室",
        scale: 28
      })
  },

  gps: function () {
    this.mapCtx.moveToLocation()
  },

  onShareAppMessage: function (options) {
    var text = "西子双语演讲俱乐部介绍"

    return {
      title: text,
      path: "/pages/map/map"
    }
  }
})